process.stdin.resume();

process.stdin.on("data", function (buffer) {
  // bufferはBufferオブジェクト
  // toStringメソッドで文字列に変換する
  var str = buffer.toString();
  // console.logメソッドで出力する
  console.log(str);
});

process.stdin.on("end", function () {
  // 「エラー」と表示する
  console.error("エラー");
  // process.exitメソッドで処理を終了する
  process.exit(1);
});
