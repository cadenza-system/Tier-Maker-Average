// GetDataボタン生成
const previewButton = document.getElementById("preview");
const parentElement = previewButton.parentElement;

const getDataButton = document.createElement("button");
getDataButton.textContent = "Get Data";
getDataButton.classList.add("button-json");
getDataButton.classList.add("buttons-item");
getDataButton.addEventListener("click", downloadData);

parentElement.appendChild(getDataButton);

// セレクトボックス生成
const selectContainer = document.createElement("div");
selectContainer.classList.add("data-select-container");

const selectHeader = document.createElement("p");
selectHeader.textContent = "Data Import";
selectHeader.classList.add("select-header");
selectHeader.setAttribute("id", "select-header");

const selectElement = document.createElement("select");
selectElement.classList.add("data-select");
selectElement.setAttribute("id", "data-select");

if (loadedData.length === 0) {
  const optionElement = document.createElement("option");
  optionElement.textContent = "データがインポートされていません";
  selectElement.appendChild(optionElement);
} else {
  for (const item of loadedData) {
    const optionElement = document.createElement("option");
    optionElement.value = item.name;
    optionElement.textContent = item.name;
    selectElement.appendChild(optionElement);
  }
}
selectContainer.appendChild(selectHeader);
selectContainer.appendChild(selectElement);

selectElement.addEventListener("change", function () {
  const selectedValue = selectElement.value;
  setData(selectedValue);
});

const tierContainer = document.getElementById("tier-container");
tierContainer.parentNode.insertBefore(selectContainer, tierContainer);

// importボタン生成
const importButton = document.createElement("button");
importButton.textContent = "Import";
importButton.classList.add("button-import");
importButton.classList.add("buttons-item");
importButton.addEventListener("click", importData);

selectContainer.appendChild(importButton);

// 整形
previewButton.style.maxWidth = "200px";
previewButton.classList.add("buttons-item");
parentElement.classList.add("buttons");
