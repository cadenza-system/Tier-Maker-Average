function downloadData() {
  const name = prompt("MCIDを入力してください", "MCID");

  if (name) {
    const data = getJson();
    const jsonString = JSON.stringify(data);
    const fileName = `${name}.json`;
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function getJson(name) {
  const data = {
    type: "user",
    name: name,
    rankData: [],
  };

  const tierContainer = document.getElementById("tier-container");
  const rows = tierContainer.children;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const characters = row.querySelectorAll(".character");
    const characterIDs = [];

    for (const element of characters) {
      characterIDs.push(element.id);
    }
    let json = {
      rank: 7 - i,
      chatacters: characterIDs,
    };
    data.rankData.push(json);
  }
  return data;
}

function importData() {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.setAttribute("webkitdirectory", "");
  inputElement.setAttribute("directory", "");

  inputElement.addEventListener("change", async (event) => {
    const files = event.target.files;
    for (const file of files) {
      if (file.type === "application/json") {
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.addEventListener("load", (event) => {
            const jsonData = event.target.result;
            loadedData.push({
              name: getFileName(file.name),
              data: JSON.parse(jsonData),
            });
            resolve(jsonData);
          });
          reader.readAsText(file);
        });
      }
    }
    console.log("ファイルの読み込みに成功");
    console.log(loadedData);
    reloadSelectOptions();
    setData(loadedData[0].name);
  });

  inputElement.click();
}

function reloadSelectOptions() {
  const selectElement = document.getElementById("data-select");
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }
  if (loadedData.length === 0) {
    const optionElement = document.createElement("option");
    optionElement.textContent = "データがインポートされていません";
    selectElement.appendChild(optionElement);
  } else {
    loadedData.sort((a, b) => {
      if (a.name === "average") {
        return -1;
      } else if (b.name === "average") {
        return 1;
      } else {
        return 0;
      }
    });
    for (const item of loadedData) {
      const optionElement = document.createElement("option");
      optionElement.value = item.name;
      optionElement.textContent = item.name;
      selectElement.appendChild(optionElement);
    }
  }
}

function setData(name) {
  const rankDataList = getDataByName(name);
  const tierContainer = document.getElementById("tier-container");
  const rows = tierContainer.children;
  resetTier();
  console.log(rankDataList);
  for (const rankData of rankDataList) {
    const row = rows[7 - rankData.rank].children[1];
    for (const chatacterId of rankData.chatacters) {
      const characterElement = getCharactorIcon(chatacterId);
      if (characterElement) {
        row.appendChild(characterElement, row);
      }
    }
  }
}

function getCharactorIcon(id) {
  const createImageCarousel = document.getElementById("create-image-carousel");
  for (const element of createImageCarousel.children) {
    if (element.id == id) {
      return element;
    }
  }
}

function getFileName(text) {
  return text.split(".")[0];
}

function resetTier() {
  const tierContainer = document.getElementById("tier-container");
  const rows = tierContainer.children;

  for (const row of rows) {
    const characters = row.querySelectorAll(".character");
    const createImageCarousel = document.getElementById(
      "create-image-carousel"
    );
    for (const element of characters) {
      createImageCarousel.appendChild(element, createImageCarousel);
    }
  }
}
