import os
import re
import logging
import time
from dotenv import load_dotenv
from PyPDF2 import PdfReader
import chromadb
from google import genai
from google.genai import types
from chromadb import Documents, EmbeddingFunction, Embeddings

load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class GeminiEmbeddingFunction(EmbeddingFunction):

    def __call__(self, input: Documents) -> Embeddings:

        response = client.models.embed_content(
            model="gemini-embedding-2",
            contents=input,
            config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
        )
        return [embedding.values for embedding in response.embeddings]

def load_pdf(file_path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:
            text += extracted

    return text

def split_text(text, chunk_size=1800, overlap=200):

    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end].strip())
        if end >= len(text):
            break
        start += chunk_size - overlap

    return [c for c in chunks if c]


DB_PATH = "./chroma_db_v2"
COLLECTION_NAME = "nalco_rag"

chroma_client = chromadb.PersistentClient(
    path=DB_PATH
)

db = chroma_client.get_or_create_collection(
    name=COLLECTION_NAME,
    embedding_function=GeminiEmbeddingFunction()
)


def ingest_pdf(pdf_path):

    logger.info(f"Starting ingestion for: {pdf_path}")
    text = load_pdf(pdf_path)
    logger.info(f"Total extracted text length: {len(text)} characters")

    chunks = split_text(text, chunk_size=1800, overlap=200)
    logger.info(f"Total number of chunks generated: {len(chunks)}")
    
    file_name = os.path.basename(pdf_path)

    batch_size = 25
    total_batches = (len(chunks) + batch_size - 1) // batch_size
    logger.info(f"Total embedding batches: {total_batches} (batch size: {batch_size})")

    for i in range(0, len(chunks), batch_size):
        batch_num = i // batch_size + 1
        logger.info(f"Processing batch {batch_num}/{total_batches}...")
        
        batch_chunks = chunks[i:i + batch_size]
        batch_ids = [f"{file_name}_{idx}" for idx in range(i, i + len(batch_chunks))]
        
        # Check existing to avoid duplicates
        existing = db.get(ids=batch_ids)
        existing_ids = set(existing.get("ids", []))
        
        new_ids = []
        new_chunks = []
        for b_id, b_chunk in zip(batch_ids, batch_chunks):
            if b_id not in existing_ids:
                new_ids.append(b_id)
                new_chunks.append(b_chunk)
                
        if not new_ids:
            logger.info(f"Batch {batch_num} already exists in db. Skipping.")
            continue
            
        logger.info(f"Batch {batch_num}: {len(new_ids)} new chunks to ingest.")

        max_retries = 5
        base_delay = 1
        
        for attempt in range(max_retries):
            try:
                db.add(
                    ids=new_ids,
                    documents=new_chunks
                )
                logger.info(f"Batch {batch_num} successfully ingested.")
                time.sleep(3)  # Standard throttling between successful batches
                break # Success, exit retry loop
            except Exception as e:
                error_msg = str(e)
                if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg.upper() or "503" in error_msg or "UNAVAILABLE" in error_msg.upper():
                    if attempt < max_retries - 1:
                        delay = base_delay * (2 ** attempt)
                        logger.warning(f"API Rate limit/Overload on batch {batch_num}. Retrying in {delay}s (Attempt {attempt + 1}/{max_retries})...")
                        time.sleep(delay)
                    else:
                        logger.error(f"Failed batch {batch_num} after {max_retries} attempts. Skipping to next batch.")
                else:
                    logger.error(f"Batch {batch_num} failed with unexpected error: {e}")
                    break # Don't retry other errors

    logger.info(f"PDF {file_name} Ingested Successfully")


def get_relevant_passages(query, n_results=3):
    if db.count() == 0:
        return []
    
    results = db.query(
        query_texts=[query],
        n_results=n_results
    )

    if not results["documents"] or not results["documents"][0]:
        return []

    return results["documents"][0]


def make_rag_prompt(query, passages):

    context = "\n".join(passages)

    prompt_str = f"""You are a helpful assistant. Answer the following question based on the provided context.
        IMPORTANT FORMATTING RULES:
        1. Do not use markdown bullet points like '*', '-', or numbers.
        2. Put each new sentence on a completely new line.

        Context:
        {context}

        Question:
        {query}
        """
    logger.info(f"Generated prompt: Context size is {len(context)} chars, Prompt size is {len(prompt_str)} chars.")
    return prompt_str


def generate_answer(query):

    passages = get_relevant_passages(query)

    prompt = make_rag_prompt(
        query=query,    
        passages=passages
    )

    max_retries = 5
    base_delay = 1

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg.upper() or "503" in error_msg or "UNAVAILABLE" in error_msg.upper():
                if attempt < max_retries - 1:
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"Generation API Overload (429/503). Retrying in {delay}s (Attempt {attempt + 1}/{max_retries})...")
                    time.sleep(delay)
                else:
                    logger.error(f"Generation failed after {max_retries} attempts.")
                    return "I'm currently experiencing high demand and the AI servers are overloaded. Please try again in a few minutes."
            else:
                logger.error(f"Unexpected error during generation: {e}")
                return "An unexpected error occurred while generating the answer. Please try again."

    return "Service unavailable."