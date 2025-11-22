// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "InvestPick",
  description: "ニュース × GPT の投資インサイトアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-[#202124] text-[#e8eaed]">{children}</body>
    </html>
  );
}
