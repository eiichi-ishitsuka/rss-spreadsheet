/**
 * シート名からsheetオブジェクトを取得。
 * シートが存在しなければ新規作成する。
 * 
 * @return {object} sheetオブジェクト
 */
function getTargetRssList() {
  let sheet = SPLEADSHEET.getSheetByName(TARGET_RSS_SHEET_NAME);
  if (sheet == null){
    throw new Error(TARGET_RSS_SHEET_NAME + 'シートを作成し、A列にRSS出力先シート名、B列にURLを記載してください。1行目はスキップされます。');
  }
  return sheet.getDataRange().getValues();
}


/**
 * シート名からsheetオブジェクトを取得。
 * シートが存在しなければ新規作成する。
 * @param {string} name - シート名
 * 
 * @return {object} sheetオブジェクト
 */
function getSheet(name) {
  let sheet = SPLEADSHEET.getSheetByName(name);
  if (sheet == null){
    sheet = SPLEADSHEET.insertSheet()
    sheet.setName(name);
  }
  return sheet;
}

/**
 * シートに値を書き込み
 * @param {string} name - シート名
 * @param {array} data - RSSから取得したデータ
 */
function writeSheet(sheetName, data) {
  // シートを取得
  let sheet = getSheet(sheetName);

  // シート上の書き出しrow,column値を取得
  let startRow = getStartRow(sheet);

  let startColumn = getStartColumn(sheet);
  if (startRow <= 2) {
    // RSS要素名をヘッダとして出力
    let header = ['check'];
    for (let i = 0; i < RSS_ELEMENTS.length; i++){
      header.push(RSS_ELEMENTS[i].name);
    }
    sheet.getRange(1,1,1,header.length).setValues([header]);
    startRow = 2;
    startColumn = 2;
  } else {
    // すでに連携済みのlinkと重複する場合は追記しない
    data = distinct(sheet, data);
  }
  if (data.length == 0) {
    return;
  }
  // RSSで取得した値を追記
  sheet.getRange(startRow, startColumn,data.length,data[0].length).setValues(data);

  // チェックボックス追加
  sheet.getRange(startRow, 1,data.length,1).insertCheckboxes();
}

/**
 * シート上の書き出し行を取得
 * @param {object} sheet - sheetオブジェクト
 * 
 * @return {int} row
 */
function getStartRow(sheet){
  let range = sheet.getDataRange();
  return range.getLastRow() + range.getRow();
}

/**
 * シート上の書き出し列を取得
 * @param {object} sheet - sheetオブジェクト
 * 
 * @return {int} column
 */
function getStartColumn(sheet){
  let sheetHeader = sheet.getDataRange().getValues()[0];
  let column = 1
  for ( let i = 0; i < sheetHeader.length; i++){
    if(sheetHeader[i] == RSS_ELEMENTS[0].name){
      column = i + 1;
      break;
    }
  }
  return column;
}

/**
 * RSSで取得したデータと、シート上のデータのlinkを比較し、
 * シート状に存在しないデータのみを返す
 * @param {object} sheet - sheetオブジェクト
 * @param {array} data - RSSから取得したデータ
 * 
 * @return {array} data - 重複削除済みのRSSから取得したデータ
 */
function distinct(sheet, data) {
  let returnData = []
  let existLinkList = getLinkList(sheet);
  // link要素の列番号をヘッダ名から取得
  let linkColumnNum = getColumnbyElement('link');
  for (let i = 0; i < data.length; i++){
    if (!existLinkList.includes(data[i][linkColumnNum])){
      returnData.push(data[i]);
    }
  }
  return returnData;
}

/**
 * シート上のlink要素の列の値をすべて取得
 * @param {object} sheet - sheetオブジェクト
 * 
 * @return {array} シート上のlink一覧
 */
function getLinkList(sheet){
  let data = sheet.getDataRange().getValues();
  let linkColumnNum = getColumnbyElement('link');
  let linkList = []
  for (let i = 1; i < data.length; i++) {
    linkList.push(data[i][linkColumnNum + 1]);
  }
  return linkList;
}

/**
 * RSS_ELEMENTS定数の要素名を指定し、列番号、名称を取得
 * @param {name} element - 要素
 * 
 * @return {int} 要素数
 */
function getColumnbyElement(element){
  let linkColumnNum = -1;
  for (let i = 0; i < RSS_ELEMENTS.length; i++) {
    if (RSS_ELEMENTS[i].element == element){
      linkColumnNum = i;
      break;
    }
  }
  if (linkColumnNum == -1) {
    throw new Error(element + '要素がRSS_ELEMENTSに存在しません。');
  }
  return linkColumnNum;
}
