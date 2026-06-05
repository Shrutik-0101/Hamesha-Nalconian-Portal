import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

input_docs = ["hello world", "test document"]
try:
    res = client.models.embed_content(
        model="gemini-embedding-2",
        contents=input_docs,
        config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT")
    )
    embeddings = [e.values for e in res.embeddings]
    print("Type of embedding:", type(embeddings))
    print("Number of embeddings:", len(embeddings))
    print("Type of first element:", type(embeddings[0]))
    if isinstance(embeddings[0], list):
        print("Length of first element:", len(embeddings[0]))
except Exception as e:
    print("Error:", e)
