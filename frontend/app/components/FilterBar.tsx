// app/components/FilterBar.tsx

const filters = [
  "すべて",
  "日本株",
  "米国株",
  "ETF",
  "仮想通貨",
  "マクロ",
  "AI & テック",
];

export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
            index === 0
              ? "border-[#8ab4f8] bg-[#1a73e8]/20 text-[#e8f0fe]"
              : "border-[#3c4043] bg-[#202124] text-[#e8eaed] hover:border-[#5f6368] hover:bg-[#303134]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
