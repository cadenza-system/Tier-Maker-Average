const fs = require("fs");
const path = require("path");

const dirPath = "./data";
const dataArr = [];

// ディレクトリ内のファイルを読み込む
fs.readdir(dirPath, (err, files) => {
  if (err) throw err;

  // 各ファイルの内容を読み込む
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonObj = JSON.parse(fileContent);
    dataArr.push(jsonObj);
  });

  // 配列をフラット化し、キャラクターのIDとランクを取得
  const flatCharacters = dataArr.flatMap((obj) => {
    return obj.rankData.flatMap((rankObj) => {
      return rankObj.chatacters.map((characterId) => ({
        id: characterId,
        rank: rankObj.rank,
      }));
    });
  });

  // 各キャラクターのランクの合計とカウントを計算
  const rankSums = {};
  const rankCounts = {};

  flatCharacters.forEach((character) => {
    const { id, rank } = character;
    rankSums[id] = (rankSums[id] || 0) + rank;
    rankCounts[id] = (rankCounts[id] || 0) + 1;
  });

  // 各キャラクターの平均ランクを計算
  const averageRanks = [];

  for (const id in rankSums) {
    averageRanks.push({
      chatacters: id,
      averageRank: Math.round(rankSums[id] / rankCounts[id]),
    });
  }

  // 平均ランクに基づいてランクデータを整理
  const rankData = {};

  averageRanks.forEach(({ chatacters, averageRank }) => {
    if (!rankData[averageRank]) {
      rankData[averageRank] = { rank: averageRank, chatacters: [] };
    }
    rankData[averageRank].chatacters.push(chatacters);
  });

  // 出力オブジェクトを作成
  const output = {
    type: "average",
    rankData: Object.values(rankData).sort((a, b) => b.rank - a.rank),
  };

  // JSON形式に変換
  const outputJSON = JSON.stringify(output, null, 2);

  // JSONファイルとして保存
  fs.writeFile("average.json", outputJSON, "utf8", (err) => {
    if (err) {
      console.error("An error occurred:", err);
    } else {
      console.log("JSON file saved: average.json");
    }
  });
});
