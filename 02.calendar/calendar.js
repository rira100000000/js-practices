const argv = require("minimist")(process.argv.slice(2));
function print_calendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const month = argv.m ? argv.m - 1 : today.getMonth();
  const year = argv.y ? argv.y : today.getFullYear();

  const days = ["日", "月", "火", "水", "木", "金", "土"];
  console.log("     " + (month + 1) + "月 " + year + "年");
  console.log(days.join(" "));

  const first_date = new Date(year, month, 1);
  const last_date = new Date(year, month + 1, 0);
  let print_day = first_date.getDay();

  process.stdout.write("   ".repeat(print_day));

  for (let date = 1; date <= last_date.getDate(); date++) {
    print_date(year, month, date, today);
    print_day = print_space_and_new_line(print_day);
  }
  process.stdout.write("\n"); //zshがつける不要な%を消す
}

function print_date(year, month, date, today) {
  const printing_date = date < 10 ? " " + date.toString() : date.toString();
  if (today.getTime() === new Date(year, month, date).getTime()) {
    process.stdout.write("\u001b[31m" + printing_date + "\u001b[0m");
  } else {
    process.stdout.write(printing_date);
  }
}

function print_space_and_new_line(print_day) {
  if (print_day === 6) {
    process.stdout.write("\n");
    return 0;
  } else {
    process.stdout.write(" ");
    return print_day + 1;
  }
}

print_calendar();
