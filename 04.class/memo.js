class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  convertNewLine(str) {
    return str
      .replace(/(\r\n)/g, "\n")
      .replace(/(\r)/g, "\n")
      .replace(/(\n)/g, "\\n");
  }

  convertJsonString(id, input) {
    return JSON.stringify({ id: id, content: input });
  }
}

module.exports = Memo;
