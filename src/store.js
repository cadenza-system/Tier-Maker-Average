let loadedData = [];

function getDataByName(name) {
  for (const data of loadedData) {
    if (data.name == name) {
      return data.data.rankData;
    }
  }
}
