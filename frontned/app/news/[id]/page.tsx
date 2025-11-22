// app/news/[id]/page.tsx
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GptPanel } from "../../components/GptPanel";
import { getArticleById } from "../../lib/newsData";

type Props = {
  params: { id: string };
};

export default function NewsDetailPage({ params }: Props) {
  const router = useRouter();
  const article = useMemo(
    () => getArticleById(params.id),
    [params.id]
  );

  if (!article) {
    return (
      <main className="min-h-screen bg-[#202124] text-[#e8eaed] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p>記事が見つかりませんでした。</p>
          <Link
            href="/"
            className="text-[#8ab4f8] hover:underline text-sm"
          >
            一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#202124] text-[#e8eaed]">
      {/* ヘッダー（簡易版） */}
      <header className="border-b border-[#3c4043] bg-[#202124]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-[#303134] px-3 py-1 text-xs text-[#e8eaed] hover:bg-[#3c4043]"
          >
            ← 一覧に戻る
          </button>
          <span className="text-sm text-[#9aa0a6]">
            InvestPick News Detail
          </span>
        </div>
      </header>

      {/* 本文：左 AI / 右 記事詳細 */}
      <div className="flex justify-center px-6 py-8">
        <div className="flex w-full max-w-5xl gap-6">
          {/* 左：AI チャット */}
          <div className="w-[40%]">
            <GptPanel />
          </div>

          {/* 右：記事詳細 */}
          <article className="w-[60%] rounded-3xl border border-[#3c4043] bg-[#292a2d] px-6 py-5 shadow-md shadow-black/40">
            <header className="text-xs text-[#9aa0a6]">
              <span className="font-medium text-[#e8eaed]">
                {article.source}
              </span>
              <span className="mx-2">・</span>
              <span>{article.publishedAt}</span>
            </header>

            <h1 className="mt-2 text-2xl font-semibold leading-snug">
              {article.title}
            </h1>

            <p className="mt-3 text-sm text-[#e8eaed] opacity-90">
              {article.summary}
            </p>

            <hr className="my-4 border-[#3c4043]" />

            <section className="space-y-3 text-sm leading-relaxed">
              <p>{article.content}</p>
              {/* 必要なら複数段落に増やしてもOK */}
            </section>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-[#9aa0a6]">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#3c4043] bg-[#202124] px-3 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
