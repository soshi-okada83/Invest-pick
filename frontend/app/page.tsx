"use client";

import { useEffect, useState } from "react";
import { SidebarNav } from "./components/SidebarNav";
import { NewsCard } from "./components/NewsCard";
import type { NewsArticle } from "./lib/newsData";

export default function Page() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/news`);
        if (!res.ok) {
          console.error("ニュース取得に失敗しました");
          return;
        }
        const data = await res.json();
        console.log("APIレスポンス", data);

        const normalized: NewsArticle[] = (data.articles ?? []).map(
          (a: any, i: number): NewsArticle => ({
            id: Number(i),
            title: a.title ?? "",
            source: a.source ?? "",
            publishedAt: a.publishedAt ?? "",
            summary: a.description ?? "",
            content: a.description ?? "",
            tags: [],
          })
        );

        console.log("整形後の記事", normalized);

        setArticles(normalized);
      } catch (e) {
        console.error("ニュース取得エラー:", e);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-[#202124] text-[#e8eaed]">
     <header className="custom-header border-b border-[#3c4043] bg-[#202124] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">
        {/* 左：ロゴ */}
        <div className="custom-logo flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#1a73e8] flex items-center justify-center text-base font-bold text-white shadow-md">
            IP
          </div>
          <span className="text-xl font-semibold tracking-tight">
            InvestPick
          </span>
        </div>

        {/* 中央：検索バー */}
        <div className="custom-searchbar mx-6 flex flex-1 max-w-2xl">
          <input
            type="search"
            placeholder="トピック、銘柄、ニュースを検索"
            className="w-full px-5 py-3 text-sm text-[#e8eaed] placeholder:text-[#9aa0a6]
                      focus:outline-none focus:ring-2 focus:ring-[#8ab4f8] border border-[#5f6368]/50 shadow-inner"
          />
        </div>
      </div>
    </header>

      {/* コンテンツ：左ナビ 13% / 右ニュース 85% */}
      <div className="flex justify-center px-6 py-8">
        <div className="flex w-full max-w-6xl gap-6">
          {/* ナビバー */}
          <div className="w-[15%]">
            <SidebarNav />
          </div>

          <div className="w-[3%]" />

          {/* ニュース一覧 */}
          <div className="w-[82%] space-y-4">
            <section className="custom-news rounded-3xl border border-[#3c4043] bg-[#292a2d] px-6 py-5 shadow-md shadow-black/40">
              <h1 className="mt-1 text-3xl font-semibold">今日のニュース</h1>
              <p className="mt-1 text-[12px] text-[#9aa0a6]">
                気になるニュースを選ぶと、詳細画面で「AI」に深掘り質問できます。
              </p>
            </section>

            <section className="space-y-4">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
