const SPLEADSHEET = SpreadsheetApp.getActiveSpreadsheet();

/**
 * RSSの出力先シート名、URLを下記シートに記載してください。
 * A列にシート名、B列にURLを書くと読み込まれます。
 * 1行目はスキップされます。
 */
const TARGET_RSS_SHEET_NAME = 'target'

/**
 * 出力するRSS要素。
 * 出力不要な要素はコメントアウトしてください。
 * name: ヘッダとして出力する値。変更可。
 * element: XMLの要素名
 */
const RSS_ELEMENTS = [
  {name: 'タイトル', element: 'title'},
  {name: 'URL', element: 'link'},
  {name: '説明', element: 'description'},
  // {name: 'language', element: 'language'},
  // {name: 'copyright', element: 'copyright'},
  // {name: 'managingEditor', element: 'managingEditor'},
  // {name: 'webMaster', element: 'webMaster'},
  {name: '公開日', element: 'pubDate'},
  // {name: 'lastBuildDate', element: 'lastBuildDate'},
  {name: 'カテゴリ', element: 'category'},
  // {name: 'generator', element: 'generator'},
  // {name: 'docs', element: 'docs'},
  // {name: 'cloud', element: 'cloud'},
  // {name: 'ttl', element: 'ttl'},
  // {name: 'image', element: 'image'},
  // {name: 'rating', element: 'rating'},
  // {name: 'textInput', element: 'textInput'},
  // {name: 'skipHours', element: 'skipHours'},
  // {name: 'skipDays', element: 'skipDays'},
]
