// app/components/GptPanel.tsx

type GptChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Recommendation = {
  id: string;
  title: string;
  reason: string;
  horizon: string;
};

const dummyChats: GptChatItem[] = [
  {
    id: "c1",
    role: "user",
    content: "このニュースが半導体セクターに与える影響を教えて。",
  },
  {
    id: "c2",
    role: "assistant",
    content:
      "今回のニュースは、データセンター向け投資の継続が確認された点で半導体需要にはポジティブです。一方で短期的なボラティリティには注意が必要です。",
  },
];

const dummyRecommendations: Recommendation[] = [
  {
    id: "r1",
    title: "セクター全体の押し目を検討",
    reason:
      "調整局面でも中長期の需要は堅調との見方が多く、指数連動ETFなどで分散しながらポジションを検討する余地があります。",
    horizon: "中期",
  },
];

export function GptPanel() {
  return (
    <aside className="rounded-3xl border border-[#3c4043] bg-[#292a2d] p-4 shadow-md shadow-black/40">
      <h2 className="text-sm font-semibold text-[#e8eaed]">
        AIチャット（試作）
      </h2>
      <p className="mt-1 text-[11px] text-[#9aa0a6]">
        ニュースや銘柄について自由に質問できます（現在はダミー応答）。
      </p>

      {/* チャット表示 */}
      <div className="mt-3 h-48 space-y-2 overflow-y-auto rounded-2xl bg-[#18191a] p-3 text-xs">
        {dummyChats.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                item.role === "user"
                  ? "bg-[#1a73e8] text-white"
                  : "bg-[#303134] text-[#e8eaed]"
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>

      {/* 入力エリア（M0なので無効） */}
      <div className="mt-3 flex items-center gap-2 rounded-full border border-[#3c4043] bg-[#202124] px-3 py-2 text-xs text-[#e8eaed]">
        <input
          type="text"
          placeholder="例：『このニュースのポイントを3つにまとめて』"
          className="flex-1 bg-transparent text-xs text-[#e8eaed] outline-none placeholder:text-[#9aa0a6]"
          disabled
        />
        <button
          disabled
          className="rounded-full bg-[#303134] px-3 py-1 text-[11px] text-[#e8eaed] opacity-70"
        >
          送信（M0）
        </button>
      </div>

      {/* インサイト */}
      <div className="mt-4 border-t border-[#3c4043] pt-3">
        <h3 className="text-xs font-semibold text-[#e8eaed]">
          このニュースからのインサイト
        </h3>
        <div className="mt-2 space-y-3 text-xs">
          {dummyRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl bg-[#18191a] p-3 border border-[#3c4043]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-[#e8eaed]">
                  {rec.title}
                </p>
                <span className="text-[10px] text-[#9aa0a6]">
                  {rec.horizon}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#e8eaed] opacity-90">
                {rec.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
