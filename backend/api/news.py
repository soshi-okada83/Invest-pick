# backend/api/news.py
import os
import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()


def fetch_news_from_newsdata():
    """NewsData API からニュース一覧を取得して正規化した配列を返す"""
    api_key = os.getenv("NEWSDATA_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="NEWSDATA_API_KEY is not set")

    url = f"https://newsdata.io/api/1/news?apikey={api_key}"

    try:
        res = requests.get(url, timeout=10)
        print("STATUS:", res.status_code)
        print("RAW RESPONSE:", res.text[:500])
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
                "body": (
                    a.get("content")
                    or a.get("full_content")
                    or a.get("full_description")
                    or a.get("description")
                    or ""
                ),
                "url": a.get("link") or "",
                "urlToImage": a.get("image_url") or "",
            }
        )

    return normalized


@router.get("/news")
def get_news():
    """ニュース一覧"""
    articles = fetch_news_from_newsdata()
    return {"articles": articles}


@router.get("/news/{news_id}")
def get_news_detail(news_id: int):
    """ニュース詳細（id で1件取得）"""
    articles = fetch_news_from_newsdata()

    for a in articles:
        if a["id"] == news_id:
            return {
                "id": a["id"],
                "title": a["title"],
                "source": a["source"],
                "publishedAt": a["publishedAt"],
                "category": "マーケットニュース",
                "body": a["body"],
                "url": a["url"],
            }

    raise HTTPException(status_code=404, detail="News not found")
