const fs = require("fs");
const MEMO_FILE = "memo.json";

let argv = require("minimist")(process.argv.slice(2));

create_memo_file();

let data = fs.readFileSync("memo.json", "utf8");
let memos = JSON.parse(data);

if (argv.l) {
  for (const memo of memos) {
    console.log(memo.content.split("\n")[0]);
  }
} else if (argv.r) {
  let menu = [];
  for (const memo of memos) {
    menu.push({
      value: "\n" + memo.content,
      message: memo.content.split("\n")[0],
    });
  }

  const { prompt } = require("enquirer");
  const questions = [
    {
      type: "select",
      name: "memo",
      message: "参照するメモを選択してください",
      choices: menu,
      initial: 0,
      footer() {
        return "\n" + this.focused.value;
      },
    },
  ];

  (async () => {
    await prompt(questions);
  })();
} else {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", function (buffer) {
    let str = convert_new_line(buffer.toString().slice(0, -1));
    if (str != "") {
      let json_string = `{"id":"${create_id()}","content":"${str}"}`;
      append_memo(json_string);
    } else {
      console.log("何も入力されていません！処理を終了します。");
    }
  });
}

function append_memo(json_string) {
  let data = fs.readFileSync("memo.json", "utf8");
  let json_data = JSON.parse(data);
  json_data.push(JSON.parse(json_string));
  let new_data = JSON.stringify(json_data);

  fs.writeFile(MEMO_FILE, new_data, function (err) {
    if (err) throw err;
    console.log("メモが保存されました");
  });
}

function convert_new_line(str) {
  return str
    .replace(/(\r\n)/g, "\n")
    .replace(/(\r)/g, "\n")
    .replace(/(\n)/g, "\\n");
}

function create_id() {
  let memos = JSON.parse(data);
  let memo_length = memos.length;
  if (memo_length == 0) {
    return 1;
  } else {
    let max_id = memos[memos.length - 1].id;
    return parseInt(max_id) + 1;
  }
}

function create_memo_file() {
  if (!fs.existsSync(MEMO_FILE)) {
    fs.writeFileSync(MEMO_FILE, "[]", function (err) {
      if (err) throw err;
    });
  }
}
