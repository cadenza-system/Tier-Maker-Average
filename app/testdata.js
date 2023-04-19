const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "data");

// ディレクトリが存在しない場合は、作成する
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (let i = 0; i < 100; i++) {
  const dataArr = [];

  for (let j = 1; j <= 7; j++) {
    const chatacters = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => Math.floor(Math.random() * 100) + 1
    );
    dataArr.push({ rank: j, chatacters: chatacters.map(String) });
  }

  const jsonData = JSON.stringify({ rankData: dataArr });

  // ファイル名をランダムに生成する
  const filename = Math.random().toString(36).slice(2) + ".json";
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, jsonData);
}
