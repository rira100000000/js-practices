function print_calendar(year, month) {
  let first_date = new Date(year, month, 1);
  let last_date = new Date(year, month + 1, 0);
  let days = ["日", "月", "火", "水", "木", "金", "土"];
  console.log("     " + month + "月 " + year + "年");
  console.log(days.join(" "));

  let print_day = first_date.getDay();
  process.stdout.write("   ".repeat(print_day));
  for (let date = 1; date <= last_date.getDate(); date++) {
    process.stdout.write(to_print_date(date));
    if (print_day == 6) {
      process.stdout.write("\n");
      print_day = 0;
    } else {
      process.stdout.write(" ");
      print_day++;
    }
  }
  process.stdout.write("\n"); //zshがつける不要な%を消す
}

function to_print_date(date) {
  if (date < 10) {
    return " " + date.toString();
  } else {
    return date.toString();
  }
}

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

print_calendar(year, month);
