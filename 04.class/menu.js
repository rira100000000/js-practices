class Menu {
  constructor(memoData) {
    this.list = this.createMenu(memoData);
  }

  createMenu(memoData) {
    let menu = [];
    for (const memo of memoData) {
      menu.push({
        value: "\n" + memo.content,
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
        footer() {
          return this.focused.value;
        },
      },
    ];

    (async () => {
      await prompt(questions);
    })();
  }
}

module.exports = Menu;
