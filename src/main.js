/**
 * 定期実行する
 */
function main() {
  let list = getTargetRssList();
  for (let i = 1; i < list.length; i++){
    let name = list[i][0]
    let url = list[i][1]
    console.log("[START] " + name + "(" + url + ")");
    let data = getRssData(url);
    writeSheet(name, data)
    console.log("[END] " + name + "(" + url + ")");
  }
}
