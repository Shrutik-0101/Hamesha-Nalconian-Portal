from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import generate_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


@app.get("/")
def home():

    return {
        "message": "Backend Running"
    }


@app.post("/chat")
def chat(req: ChatRequest):

    answer = generate_answer(
        req.question
    )

    return {
        "answer": answer
    }