// app/lib/newsData.ts

export type NewsArticle = {
  id: string;
  source: string;
  publishedAt: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    source: "Bloomberg",
    publishedAt: "15分前",
    title: "日経平均、生成AI関連銘柄主導で続伸　半導体需要への期待広がる",
    summary:
      "東京株式市場で日経平均は反発。特に生成AI向けGPUやデータセンター関連の銘柄が買われ、指数を押し上げた。",
    content:
      "東京株式市場で日経平均は反発し、生成AI関連銘柄が相場を牽引した。特にデータセンター向けGPUやクラウドインフラ関連企業への買いが目立ち、半導体需要拡大への期待が広がっている。一方で、内需ディフェンシブ銘柄には利益確定売りも出ており、物色はやや二極化している。",
    tags: ["日本株", "半導体", "生成AI"],
  },
  {
    id: "2",
    source: "日経電子版",
    publishedAt: "1時間前",
    title: "米CPI、市場予想を下回る　利下げ観測強まり長期金利が低下",
    summary:
      "米労働省が発表した10月の消費者物価指数（CPI）は市場予想を下回り、インフレ鈍化が確認された。",
    content:
      "CPIの伸び鈍化を受けて利下げ観測が強まり、米長期金利は低下した。これによりハイテク株を中心に株価指数は上昇している。一方で、金融セクターなど金利上昇の恩恵を受けてきた銘柄には調整売りも出ており、セクター間で明暗が分かれる展開となった。",
    tags: ["米国株", "マクロ", "インフレ"],
  },
  {
    id: "3",
    source: "Reuters",
    publishedAt: "3時間前",
    title: "ビットコイン、一時7万ドル割れ　ETF資金流入が鈍化",
    summary:
      "ビットコイン価格は一時7万ドルを割り込んだ。現物ETFへの資金流入ペースが鈍化していることが嫌気された。",
    content:
      "暗号資産市場では、ビットコイン価格が一時7万ドルを割り込んだ。現物ETFへの資金流入ペース鈍化が重しとなる一方で、長期的な強気トレンドは維持されているとの見方も根強い。短期的なボラティリティの高まりには注意が必要だが、中長期目線では分散投資の一部としての活用余地も指摘されている。",
    tags: ["仮想通貨", "ETF"],
  },
];

export function getArticleById(id: string) {
  return newsArticles.find((a) => a.id === id);
}
