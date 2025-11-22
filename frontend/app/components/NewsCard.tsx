// app/components/NewsCard.tsx
"use client";

import Link from "next/link";
import type { NewsArticle } from "../lib/newsData";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.id}`} className="custom-newscard block">
      <article className="flex gap-4 rounded-3xl p-4 shadow-md shadow-black/40 border border-[#3c4043] hover:border-[#8ab4f8] hover:shadow-lg hover:shadow-black/60 transition">
        {/* サムネ用ダミー枠 */}
        <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-[#3c4043]">
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#e8eaed]/80">
            NEWS
          </div>
        </div>

        {/* テキスト部分 */}
        <div className="custom-newscard flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between text-[11px] text-[#9aa0a6]">
            <div className="flex items-center gap-2 truncate">
              <span className="custom-source font-medium text-[#e8eaed]">
                情報源：{article.source}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#5f6368]" />
              <span className="custom-publishedAt truncate">{article.publishedAt}</span>
            </div>
          </header>

          <h2 className="mt-1 text-sm font-semibold leading-snug text-[#e8eaed]">
            {article.title}
          </h2>

          <p className="custom-summary mt-1 text-xs leading-relaxed text-[#e8eaed] opacity-90 line-clamp-2">
            {article.summary}
          </p>

          <div className="custom-tag mt-2 flex flex-wrap gap-1 text-[10px] text-[#9aa0a6]">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="custom-tagname border border-[#3c4043] bg-[#202124] px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
