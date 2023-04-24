const memoClass = require("./memo");
const memoFileClass = require("./memoFile");
const menuClass = require("./menu");
const argv = require("minimist")(process.argv.slice(2));

const memo = new memoClass();
const memoFile = new memoFileClass();
const menu = new menuClass(memoFile.memoData);

if (argv.l) {
  for (const memo of memoFile.memoData) {
    console.log(memo.content.split("\n")[0]);
  }
} else if (argv.r) {
  menu.display();
} else if (argv.d) {
  (async () => {
    const id = await menu.delete();
    memoFile.deleteMemo(id);
  })();
} else {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", function (buffer) {
    const input = memo.convertNewLine(buffer.toString().slice(0, -1));
    if (input != "") {
      const id = memoFile.createId();
      memoFile.appendMemo(memo.convertJsonString(id, input));
    } else {
      console.log("何も入力されていません！処理を終了します。");
    }
  });
}
