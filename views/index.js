/**
 * index.html描画用
 */
function doGet() {
  return HtmlService.createTemplateFromFile('public/index').evaluate();
}

function getDataForHtml() {
  let returnData = [];
  let list = getTargetRssList();
  for (let i = 1; i < list.length; i++){
    let name = list[i][0];
    let data = getSheet(name).getDataRange().getValues();
    let row = [];
    let col1 = getColumnbyElement('title').num;
    let col2 = getColumnbyElement('link').num;
    for (let j = 1; j < data.length; j++){
      row.push({title: data[j][col1],url: data[j][col2],});
    }
    returnData.push({name: name,data: row,});
  }
  return returnData;
}


