class Menu {
  constructor(memoData) {
    this.list = this.createMenu(memoData);
  }

  createMenu(memoData) {
    let menu = [];
    for (const memo of memoData) {
      menu.push({
        value: memo,
        message: memo.content.split("\n")[0],
      });
    }
    return menu;
  }

  display() {
    const { prompt } = require("enquirer");
    const questions = [
      {
        type: "select",
        name: "memo",
        message: "参照するメモを選択してください",
        choices: this.list,
        initial: 0,
        format() {
          return ""; // 選択した内容を空文字にする
        },
        footer() {
          return this.focused.value.content;
        },
      },
    ];

    (async () => {
      const answer = await prompt(questions);
      console.log(answer.memo.content);
    })();
  }

  async delete() {
    const { prompt } = require("enquirer");
    const questions = [
      {
        type: "select",
        name: "memo",
        message: "削除するメモを選択してください",
        choices: this.list,
        initial: 0,
        format() {
          return "";
        },
        footer() {
          return this.focused.value.content;
        },
      },
    ];

    const answer = await prompt(questions);
    return answer.memo.id;
  }
}
module.exports = Menu;
