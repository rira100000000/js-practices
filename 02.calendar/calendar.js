const argv = require("minimist")(process.argv.slice(2));
const Saturday = 6;
const Sunday = 0;

function printCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const month = argv.m ? argv.m - 1 : today.getMonth();
  const year = argv.y ? argv.y : today.getFullYear();

  const days = ["日", "月", "火", "水", "木", "金", "土"];
  console.log("     " + (month + 1) + "月 " + year + "年");
  console.log(days.join(" "));

  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  let printDay = firstDate.getDay();

  process.stdout.write("   ".repeat(printDay));

  for (let date = 1; date <= lastDate.getDate(); date++) {
    printDate(year, month, date, today);
    printSpaceOrNewLine(printDay);
    printDay = nextDay(printDay);
  }
  process.stdout.write("\n"); //zshがつける不要な%を消す
}

function printDate(year, month, date, today) {
  const printing_date = date.toString().padStart(2, " ");
  if (today.getTime() === new Date(year, month, date).getTime()) {
    process.stdout.write("\u001b[31m" + printing_date + "\u001b[0m");
  } else {
    process.stdout.write(printing_date);
  }
}

function printSpaceOrNewLine(print_day) {
  if (print_day === Saturday) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}

function nextDay(print_day) {
  if (print_day === Saturday) {
    return Sunday;
  } else {
    return print_day + 1;
  }
}
printCalendar();
