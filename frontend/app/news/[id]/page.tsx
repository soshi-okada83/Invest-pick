// import Link from "next/link";

// type NewsDetail = {
//   id: string;
//   title: string;
//   source: string;
//   publishedAt: string;
//   category: string;
//   description?: string;
//   body: string;
//   url?: string;
// };

// // ニュース詳細をバックエンドから取得する関数
// async function getNewsDetail(id: string): Promise<NewsDetail | null> {
//   try {
//     const baseUrl =
//       process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//     const res = await fetch(`${baseUrl}/news/${id}`, {
//       // 詳細画面は毎回最新を見たい想定
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.error("ニュース詳細の取得に失敗しました:", res.status, res.statusText);
//       return null;
//     }

//     const data = await res.json();

//     return {
//       id: data.id,
//       title: data.title,
//       source: data.source,
//       publishedAt: data.publishedAt,
//       category: data.category,
//       description: data.description ?? "",
//       body: data.body,
//       url: data.url ?? "",
//     };
//   } catch (error) {
//     console.error("ニュース詳細の取得でエラー:", error);
//     return null;
//   }
// }

// // /news/[id] の動的ルート
// export default async function NewsDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const news = await getNewsDetail(id);

//   return (
//     <main className="min-h-dvh bg-slate-950 text-slate-50 px-6 py-8">
//       <div className="max-w-7xl mx-auto">
//         {/* ヘッダ */}
//         <header className="custom-newsdetail-header mb-6 border-b border-[#3c4043]">
//           <h1 className="text-2xl font-bold">ニュース詳細</h1>
//         </header>

//         {/* グリッド：左43% / 3%余白 / 右54% */}
//         <div className="grid grid-cols-[43%_3%_54%] gap-4 min-h-[70vh]">
//           {/* 左カラム：AIチャット＋AI要約（縦積み） */}
//           <div className="left-column flex flex-col gap-4">
//             {/* AI要約BOX */}
//             <section className="ai-summary flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
//               <div className="ai-summary-title flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold">AI要約</h2>
//               </div>
//               <div className="ai-summary-text flex-1 rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs overflow-y-auto space-y-2">
//                 <p className="text-slate-300">
//                   ニュースの重要ポイントをAIが要約します。
//                 </p>
//                 <p className="text-slate-400 text-[11px]">
//                   ・生成AI銘柄が市場を牽引
//                   <br />
//                   ・投資家は半導体セクターに注目
//                   <br />
//                   ・FOMC議事録の発表前で金利警戒感あり
//                 </p>
//               </div>
//             </section>

//             {/* AIチャット */}
//             <section className="ai-chat flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
//               <div className="ai-chat-title flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold">AIチャット</h2>
//               </div>

//               <div className="flex-1 rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs overflow-y-auto">
//                 <p className="text-slate-400">
//                   このニュースについてAIに質問できます
//                 </p>
//               </div>

//               {/* 入力フォーム＋送信ボタン */}
//               <form className="aichat-form mt-3">
//                 <input
//                   type="text"
//                   placeholder="質問を入力"
//                   className="aichat-input flex-1 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-xs placeholder:text-slate-600"
//                 />

//                 <button
//                   type="submit"
//                   className="aichat-send-btn px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-xs font-semibold text-white"
//                 >
//                   送信
//                 </button>
//               </form>
//             </section>
//           </div>

//           {/* 余白（3%） */}
//           <div />

//           {/* 右カラム：ニュース詳細（54%） */}
//           <section className="news-detail rounded-xl border border-slate-800 bg-slate-900/80 p-6">
//             {news ? (
//               <>
//                 <div className="items-start justify-between mb-4">
//                   <div className="flex space-y-2">
//                     <span className="newsdetail-category inline-flex text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
//                       {news.category}
//                     </span>
//                     <button className="translation-btn text-xs px-3 py-2 rounded-lg border border-emerald-500/60 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-500/30 transition">
//                       翻訳をする
//                     </button>
//                   </div>

//                   <h2 className="text-xl font-semibold">{news.title}</h2>
//                   <div className="text-xs text-slate-400">
//                     情報源：{news.source} <br /> 日時：{news.publishedAt}
//                   </div>
//                 </div>

//                 <article className="text-sm leading-relaxed whitespace-pre-line">
//                 {/* 上：リード文（要約） */}
//                 {news.description && (
//                   <p className="mb-4 text-slate-200 font-medium">
//                     {news.description}
//                   </p>
//                 )}

//                 {/* 下：本文 */}
//                 <p className="text-slate-300">
//                   {news.body || "本文がありません。"}
//                 </p>

//                 {/* 元記事へのリンクもあると「詳細感」出る */}
//                 {news.url && (
//                   <p className="mt-4 text-xs">
//                     <a
//                       href={news.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-sky-400 hover:underline"
//                     >
//                       元の記事を読む（外部サイト）
//                     </a>
//                   </p>
//                 )}
//               </article>
//               </>
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400">
//                 <p>ニュース詳細を取得できませんでした。</p>
//                 <p className="mt-1 text-xs opacity-70">
//                   API の URL やバックエンドが起動しているかを確認してください。
//                 </p>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>

//       {/* 戻るボタン */}
//       <div className="mt-6">
//         <Link
//           href="/"
//           className="back-btn inline-block text-sm px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition"
//         >
//           一覧ページに戻る
//         </Link>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type NewsDetail = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  category: string;
  description?: string;
  body: string;
  url?: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// ニュース詳細をバックエンドから取得する関数
async function fetchNewsDetail(id: string): Promise<NewsDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "ニュース詳細の取得に失敗しました:",
        res.status,
        res.statusText
      );
      return null;
    }

    const data = await res.json();

    return {
      id: String(data.id),
      title: data.title,
      source: data.source,
      publishedAt: data.publishedAt,
      category: data.category,
      description: data.description ?? "",
      body: data.body,
      url: data.url ?? "",
    };
  } catch (error) {
    console.error("ニュース詳細の取得でエラー:", error);
    return null;
  }
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = (params?.id ?? "") as string;

  const [news, setNews] = useState<NewsDetail | null>(null);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // ニュース詳細の取得
  useEffect(() => {
    if (!id) return;

    const loadNews = async () => {
      setNewsLoading(true);
      setNewsError(null);
      const result = await fetchNewsDetail(id);
      if (!result) {
        setNewsError("ニュース詳細を取得できませんでした。");
      }
      setNews(result);
      setNewsLoading(false);
    };

    loadNews();
  }, [id]);

  // ニュース取得後に AI 要約を生成
  useEffect(() => {
    if (!news) return;

    const generateSummary = async () => {
      try {
        setSummaryLoading(true);
        setSummaryError(null);

        const res = await fetch(`${API_BASE_URL}/ai/news/summary`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: news.title,
            description: news.description ?? "",
          }),
        });

        if (!res.ok) {
          console.error("AI要約の取得に失敗:", res.status, res.statusText);
          setSummaryError("AI要約の取得に失敗しました。");
          setSummaryLoading(false);
          return;
        }

        const data = await res.json();
        setSummary(data.summary ?? "");
        setSummaryLoading(false);
      } catch (e) {
        console.error("AI要約の取得エラー:", e);
        setSummaryError("AI要約の取得に失敗しました。");
        setSummaryLoading(false);
      }
    };

    generateSummary();
  }, [news]);

  // AIチャット送信処理
  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!news || !chatInput.trim() || chatLoading) return;

    const question = chatInput.trim();

    // 先にユーザーメッセージを表示
    setChatMessages((prev) => [...prev, { role: "user", content: question }]);
    setChatInput("");
    setChatLoading(true);
    setChatError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/ai/news/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: news.title,
          description: news.description ?? "",
          question,
        }),
      });

      if (!res.ok) {
        console.error("AIチャットの取得に失敗:", res.status, res.statusText);
        setChatError("AIからの回答取得に失敗しました。");
        setChatLoading(false);
        return;
      }

      const data = await res.json();
      const answer = data.answer ?? "";

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer },
      ]);
      setChatLoading(false);
    } catch (e) {
      console.error("AIチャットの取得エラー:", e);
      setChatError("AIからの回答取得に失敗しました。");
      setChatLoading(false);
    }
  };

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダ */}
        <header className="custom-newsdetail-header mb-6 border-b border-[#3c4043]">
          <h1 className="text-2xl font-bold">ニュース詳細</h1>
        </header>

        {/* グリッド：左43% / 3%余白 / 右54% */}
        <div className="grid grid-cols-[43%_3%_54%] gap-4 min-h-[70vh]">
          {/* 左カラム：AIチャット＋AI要約（縦積み） */}
          <div className="left-column flex flex-col gap-4">
            {/* AI要約BOX */}
            <section className="ai-summary flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="ai-summary-title flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">AI要約</h2>
              </div>
              <div className="ai-summary-text flex-1 rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs overflow-y-auto space-y-2 whitespace-pre-wrap">
                {newsLoading && (
                  <p className="text-slate-400">ニュースを読み込んでいます…</p>
                )}

                {!newsLoading && !news && (
                  <p className="text-slate-400">
                    ニュース情報を取得できなかったため、要約を生成できません。
                  </p>
                )}

                {news && summaryLoading && (
                  <p className="text-slate-400">
                    AIがニュースの要点を要約しています…
                  </p>
                )}

                {summaryError && (
                  <p className="text-red-400">{summaryError}</p>
                )}

                {!summaryLoading && !summaryError && summary && (
                  <p className="text-slate-200">{summary}</p>
                )}

                {!summaryLoading && !summaryError && !summary && news && (
                  <p className="text-slate-400">
                    要約が取得できませんでした。
                  </p>
                )}

                <p className="mt-2 text-[10px] text-slate-500">
                  ※ NewsData 無料プランでは本文全体を取得できない場合があります。
                  タイトルと概要に基づき、AI が推定要約を生成しています。
                </p>
              </div>
            </section>

            {/* AIチャット */}
            <section className="ai-chat flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="ai-chat-title flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">AIチャット</h2>
              </div>

              {/* メッセージ一覧 */}
              <div className="ai-chat-box flex-1 rounded-lg bg-slate-950/60 border border-slate-800 px-4 py-4 text-xs overflow-y-auto space-y-4">

                {chatMessages.length === 0 && (
                  <p className="text-slate-400">
                    このニュースについてAIに質問できます。
                    <br />
                    例：「このニュースで投資家が気をつけるポイントは？」など
                  </p>
                )}

                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={
                        "chat-bubble " +
                        (m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai")
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatError && <p className="text-red-400">{chatError}</p>}
              </div>

              {/* 入力フォーム＋送信ボタン */}
              <form
                className="aichat-form mt-3 flex gap-2"
                onSubmit={handleChatSubmit}
              >
                <input
                  type="text"
                  placeholder={
                    news
                      ? "このニュースについて質問を入力"
                      : "ニュース読み込み中..."
                  }
                  className="aichat-input flex-1 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-xs placeholder:text-slate-600 disabled:opacity-50"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={!news || chatLoading}
                />

                <button
                  type="submit"
                  className="aichat-send-btn px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!news || chatLoading || !chatInput.trim()}
                >
                  {chatLoading ? "送信中…" : "送信"}
                </button>
              </form>
            </section>
          </div>

          {/* 余白（3%） */}
          <div />

          {/* 右カラム：ニュース詳細（54%） */}
          <section className="news-detail rounded-xl border border-slate-800 bg-slate-900/80 p-6">
            {newsLoading && (
              <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400">
                <p>ニュース詳細を読み込んでいます…</p>
              </div>
            )}

            {!newsLoading && !news && (
              <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400">
                <p>ニュース詳細を取得できませんでした。</p>
                {newsError && (
                  <p className="mt-1 text-xs opacity-70">{newsError}</p>
                )}
              </div>
            )}

            {!newsLoading && news && (
              <>
                <div className="items-start justify-between mb-4">
                  <div className="flex space-y-2 gap-2">
                    <span className="newsdetail-category inline-flex text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                      {news.category}
                    </span>
                    <button className="translation-btn text-xs px-3 py-2 rounded-lg border border-emerald-500/60 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-500/30 transition">
                      翻訳をする
                    </button>
                  </div>

                  <h2 className="mt-2 text-xl font-semibold">
                    {news.title}
                  </h2>
                  <div className="mt-1 text-xs text-slate-400">
                    情報源：{news.source} <br /> 日時：{news.publishedAt}
                  </div>
                </div>

                <article className="text-sm leading-relaxed whitespace-pre-line">
                  {/* 上：リード文（要約） */}
                  {news.description && (
                    <p className="mb-4 text-slate-200 font-medium">
                      {news.description}
                    </p>
                  )}

                  {/* 下：本文 */}
                  <p className="text-slate-300">
                    {news.body || "本文がありません。"}
                  </p>

                  {/* 元記事へのリンク */}
                  {news.url && (
                    <p className="mt-4 text-xs">
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="site-url text-sky-400 hover:underline"
                      >
                        元の記事を読む（外部サイト）
                      </a>
                    </p>
                  )}
                </article>
              </>
            )}
          </section>
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="mt-6">
        <Link
          href="/"
          className="back-btn inline-block text-sm px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition"
        >
          一覧ページに戻る
        </Link>
      </div>
    </main>
  );
}
