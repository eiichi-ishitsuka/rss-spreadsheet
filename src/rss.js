/**
 * RSSから値を取得し、スプレッドシートに書き込める二次元配列として返す。
 * @param {string} url - RSSのURL
 * 
 * @return {array} 二次元配列
 */
function getRssData(url) {
  // XMLデータ取得
  let xml = UrlFetchApp.fetch(url, {'ContentType': 'text/xml;charset=utf-8'}).getContentText();
  let docs = XmlService.parse(xml);
  let entries = docs.getRootElement().getChildren('channel')[0].getChildren('item');

  // RSSから取得したデータを整形
  let returnData = [];
  for(let i = 0; i < entries.length; i++) {
    let row = []
    for (let j = 0; j < RSS_ELEMENTS.length; j++){
        row[j] = entries[i].getChildText(RSS_ELEMENTS[j].element);
    }
    returnData.push(row);
  }
  return returnData;
}