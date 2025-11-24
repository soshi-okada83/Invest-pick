import Link from "next/link";

export default function NewsDetailPage() {
  const mockNews = {
    title: "米テック株が続伸、生成AI関連銘柄が市場を牽引",
    source: "Bloomberg",
    publishedAt: "2025/11/23 10:30",
    category: "マーケットニュース",
    body: `
生成AI関連銘柄が買われ、米国株式市場は主要指数がそろって上昇した。
投資家の間では、AIインフラ需要の拡大や半導体セクターの業績期待が引き続き意識されている。
一方で、今週発表予定のFOMC議事録を前に、金利動向への警戒感も残っている。
    `,
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
              <div className="ai-summary-text flex-1 rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs overflow-y-auto space-y-2">
                <p className="text-slate-300">
                  ニュースの重要ポイントをAIが要約します。
                </p>
                <p className="text-slate-400 text-[11px]">
                  ・生成AI銘柄が市場を牽引<br/>
                  ・投資家は半導体セクターに注目<br/>  
                  ・FOMC議事録の発表前で金利警戒感あり  
                </p>
              </div>
            </section>
            {/* AIチャット */}
              <section className="ai-chat flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="ai-chat-title flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">AIチャット</h2>
                </div>

                <div className="flex-1 rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs overflow-y-auto">
                  <p className="text-slate-400">
                    このニュースについてAIに質問できます
                  </p>
                </div>

                {/* 入力フォーム＋送信ボタン */}
                <form className="aichat-form mt-3">
                    <input
                      type="text"
                      placeholder="質問を入力"
                      className="aichat-input flex-1 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-xs placeholder:text-slate-600"
                    />
                    
                    <button
                      type="submit"
                      className="aichat-send-btn px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-xs font-semibold text-white"
                    >
                      送信
                    </button>
                </form>
              </section>
          </div>

          {/* 余白（3%） */}
          <div />

          {/* 右カラム：ニュース詳細（54%） */}
          <section className="news-detail rounded-xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="items-start justify-between mb-4">
              <div className="flex space-y-2">
                <span className="newsdetail-category inline-flex text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                  {mockNews.category}
                </span>
              <button className="translation-btn text-xs px-3 py-2 rounded-lg border border-emerald-500/60 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-500/30 transition">
                翻訳をする
              </button>
              </div>

              <h2 className="text-xl font-semibold">{mockNews.title}</h2>
                <div className="text-xs text-slate-400">
                  情報源：{mockNews.source} <br/> 日時：{mockNews.publishedAt}
                </div>
            </div>

            <article className="text-sm leading-relaxed whitespace-pre-line">
              {mockNews.body}
            </article>
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
