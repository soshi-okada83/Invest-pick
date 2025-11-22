// app/components/SidebarNav.tsx

const navItems = [
  { label: "ホーム", active: true },
  { label: "ウォッチリスト", active: false },
  { label: "セクター", active: false },
  { label: "AIトレンド", active: false },
  { label: "マクロ・政策", active: false },
];

export function SidebarNav() {
  return (
    <aside className="flex w-48 flex-col">
      <div className="custom-aside mt-4 rounded-3xl border border-[#3c4043] bg-[#292a2d] px-4 py-4 w-full">
        <nav>
          <ul className="custom-ul flex flex-col list-none pl-0">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex w-[90%] items-center rounded-full px-3 py-2 text-sm transition ${
                    item.active
                      ? "bg-[#303134] text-[#e8eaed]"
                      : "text-[#9aa0a6] bg-[#EEEEEE] hover:bg-[#303134] hover:text-[#e8eaed]"
                  }`}
                >
                  <span className="mr-3 h-5 w-5 rounded-full bg-[#5f6368]/60" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="custom-important-points mt-4 border-t border-[#3c4043] pt-3 text-[11px] leading-relaxed text-[#9aa0a6]">
          投資は自己責任です。<br />
          情報の正確性には努めていますが、<br />
          完全性を保証するものではありません。
        </div>
      </div>
    </aside>
  );
}
