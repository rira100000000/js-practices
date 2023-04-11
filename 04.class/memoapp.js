const fs = require("fs");
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (buffer) {
  let str = buffer.toString().slice(0, -1);
  if (str != "") {
    let json_string = `{"content":"${str}"}`;
    write_memo(json_string);
  } else {
    console.log("何も入力されていません！処理を終了します。");
  }
});

function write_memo(json_string) {
  fs.writeFile("memo.json", json_string, function (err) {
    if (err) throw err;
    console.log("メモが保存されました");
  });
}
