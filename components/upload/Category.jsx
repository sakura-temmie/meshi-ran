
const Category = ({ action })  => {
    const categories = [
      { value: "", label: "▼ ジャンルを選択してください" },
      {
        value: "1",
        label: "焼肉",
      },
      {
        value: "2",
        label: "寿司",
      },
      {
        value: "3",
        label: "和食",
      },
      {
        value: "4",
        label: "イタリアン",
      },
      {
        value: "5",
        label: "焼き鳥",
      },
      {
        value: "6",
        label: "中華",
      },
      {
        value: "7",
        label: "ラーメン",
      },
      {
        value: "8",
        label: "B級",
      },
      {
        value: "9",
        label: "韓国料理",
      },
      {
        value: "10",
        label: "フレンチ",
      },
      {
        value: "11",
        label: "エスニック",
      },
      {
        value: "12",
        label: "カレー",
      },
      {
        value: "13",
        label: "ハンバーガー",
      },
      {
        value: "14",
        label: "海鮮系",
      },
      {
        value: "15",
        label: "メキシカン",
      },
      {
        value: "16",
        label: "スペイン",
      },
      {
        value: "17",
        label: "ステーキ",
      },
      {
        value: "18",
        label: "アフリカ",
      },
      {
        value: "19",
        label: "ビーガン",
      },
      {
        value: "20",
        label: "肉料理",
      },
      {
        value: "21",
        label: "鍋",
      },
      {
        value: "22",
        label: "おでん",
      },
      {
        value: "23",
        label: "洋食",
      },
      {
        value: "24",
        label: "麺類",
      },
      {
        value: "25",
        label: "天ぷら",
      },
      {
        value: "26",
        label: "日本酒",
      },
      {
        value: "27",
        label: "ワイン",
      },
      {
        value: "28",
        label: "ピザ",
      },
      {
        value: "29",
        label: "カフェ",
      },
      {
        value: "30",
        label: "BAR",
      },
      {
        value: "31",
        label: "パン",
      },
      {
        value: "32",
        label: "スイーツ",
      },
      {
        value: "33",
        label: "その他",
      },
    ];

  return (
    <>
      <div
        className="mb-2 w-3/4 py-2 flex"
        style={{ borderBottom: "solid #f00a00 1px" }}
      >
        <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
          ジャンル
        </p>
        <select
          className="appearance-none border-none mr-3 py-1 px-2 focus:outline-none bg-white"
          onChange={(e) => action(e.target.value)}
        >
          {categories.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Category
