import os
import re
from dotenv import load_dotenv
from pypdf import PdfReader
import chromadb
from google import genai
from google.genai import types
from chromadb import Documents, EmbeddingFunction, Embeddings

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class GeminiEmbeddingFunction(EmbeddingFunction):

    def __call__(self, input: Documents) -> Embeddings:

        response = client.models.embed_content(
            model="text-embedding-004",
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

def split_text(text):

    chunks = re.split(r"\n\s*\n", text)

    return [c.strip() for c in chunks if c.strip()]


DB_PATH = "./chroma_db"
COLLECTION_NAME = "nalco_rag"

client = chromadb.PersistentClient(
    path=DB_PATH
)

db = client.get_or_create_collection(
    name=COLLECTION_NAME,
    embedding_function=GeminiEmbeddingFunction()
)


def ingest_pdf(pdf_path):

    text = load_pdf(pdf_path)

    chunks = split_text(text)
    
    file_name = os.path.basename(pdf_path)

    for idx, chunk in enumerate(chunks):

        db.add(
            ids=[f"{file_name}_{idx}"],
            documents=[chunk]
        )

    print(f"PDF {file_name} Ingested Successfully")


def get_relevant_passages(query, n_results=3):

    results = db.query(
        query_texts=[query],
        n_results=n_results
    )

    return results["documents"][0]


def make_rag_prompt(query, passages):

    context = "\n".join(passages)

    return f"""You are a helpful assistant. Answer the following question based on the provided context:

Context:
{context}

Question:
{query}
"""


def generate_answer(query):

    passages = get_relevant_passages(query)

    prompt = make_rag_prompt(
        query=query,
        passages=passages
    )

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    return response.text