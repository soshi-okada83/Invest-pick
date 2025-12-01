# backend/api/ai_news.py
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI

router = APIRouter()

# .env に OPENAI_API_KEY が入っていれば、自動で拾ってくれる
client = OpenAI()

# AI要約 API

class SummaryRequest(BaseModel):
    title: str
    description: str | None = None


@router.post("/ai/news/summary")
def summarize_news(req: SummaryRequest):
    if not req.title:
        raise HTTPException(status_code=400, detail="Title is required")

    prompt = f"""
あなたは投資ニュースの要点をまとめる日本語アシスタントです。

以下の情報はニュースの「タイトル」と「概要」です。
無料プランの関係で、本文全体を取得できていない可能性があります。
利用できる情報の範囲内で要点を推定して回答してください。
事実と異なる推測を断定的に書かないよう注意してください。

---
タイトル: {req.title}
概要: {req.description or "（概要がありません）"}
---

以下を日本語で出力：
1. ニュースの短い要約（2〜3文）
2. 投資家の視点で気をつけるポイント（箇条書き 3つ）
"""

    try:
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "あなたは投資ニュースを分かりやすく要約するアシスタントです。"},
                {"role": "user", "content": prompt},
            ],
        )
        summary = res.choices[0].message.content or ""
    except Exception as e:
        print("OpenAI summary error:", e)
        raise HTTPException(status_code=502, detail="Failed to generate summary")

    return {"summary": summary}

# AIチャット API

class ChatRequest(BaseModel):
    title: str
    description: str | None = None
    question: str


@router.post("/ai/news/chat")
def chat_about_news(req: ChatRequest):
    if not req.question:
        raise HTTPException(status_code=400, detail="Question is required")

    prompt = f"""
あなたは投資ニュースを解説する日本語アシスタントです。
以下はニュースのタイトルと概要です（全文を取得できていません）。

この情報の中で分かる範囲で、ユーザーの質問に答えてください。
分からない部分は「この情報だけでは断定できませんが…」などと断りを入れてください。

---
タイトル: {req.title}
概要: {req.description or "（概要がありません）"}
---

ユーザーの質問：
{req.question}
"""

    try:
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "あなたは投資初心者にも丁寧に説明するアシスタントです。"},
                {"role": "user", "content": prompt},
            ],
        )
        answer = res.choices[0].message.content or ""
    except Exception as e:
        print("OpenAI chat error:", e)
        raise HTTPException(status_code=502, detail="Failed to answer question")

    return {"answer": answer}
