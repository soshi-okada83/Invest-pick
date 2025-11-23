# backend/api/news.py
import os
import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/news")
def get_news():
    api_key = os.getenv("NEWSDATA_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="NEWSDATA_API_KEY is not set")

    # ★ 最小構成
    url = f"https://newsdata.io/api/1/news?apikey={api_key}"

    try:
        res = requests.get(url, timeout=10)
        print("STATUS:", res.status_code)
        print("RAW RESPONSE:", res.text)  # ★ デバッグ出力
        res.raise_for_status()
    except Exception as e:
        print("NewsData error:", e)
        raise HTTPException(status_code=502, detail="Failed to fetch news")

    data = res.json()
    results = data.get("results") or []

    normalized = []

    for i, a in enumerate(results):
        normalized.append(
            {
                "id": i,
                "title": a.get("title") or "",
                "source": a.get("source_id") or "",
                "publishedAt": a.get("pubDate") or "",
                "description": a.get("description") or "",
                "url": a.get("link") or "",
                "urlToImage": a.get("image_url") or "",
            }
        )

    return {"articles": normalized}
