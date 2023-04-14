const MEMOFILE = "memo.json";
const fs = require("fs");

class MemoFile {
  constructor() {
    this.createMemoFile();
    this.setMemoData();
  }

  setMemoData() {
    this.memoData = JSON.parse(fs.readFileSync(MEMOFILE, "utf8"));
  }

  createId() {
    let memoLength = this.memoData.length;
    if (memoLength == 0) {
      return 1;
    } else {
      let maxId = this.memoData[this.memoData.length - 1].id;
      return parseInt(maxId) + 1;
    }
  }

  createMemoFile() {
    if (!fs.existsSync(MEMOFILE)) {
      fs.writeFileSync(MEMOFILE, "[]", function (err) {
        if (err) throw err;
      });
    }
  }

  appendMemo(jsonString) {
    this.memoData.push(JSON.parse(jsonString));
    let newData = JSON.stringify(this.memoData);

    fs.writeFile(MEMOFILE, newData, function (err) {
      if (err) throw err;
      console.log("メモが保存されました");
    });
  }

  deleteMemo(id) {
    let newData = [];
    for (const memo of this.memoData) {
      if (memo.id != id) {
        newData.push(memo);
      }
    }
    newData = JSON.stringify(newData);
    fs.writeFile(MEMOFILE, newData, function (err) {
      if (err) throw err;
      console.log("メモが保存されました");
    });
  }
}

module.exports = MemoFile;
