from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import news
from api.ai_news import router as ai_news_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_news_router)
app.include_router(news.router)
