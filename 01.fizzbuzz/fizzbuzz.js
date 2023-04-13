for (let count = 1; count <= 20; count++) {
  if (count % 15 === 0) {
    console.log("FizzBuzz");
  } else if (count % 5 === 0) {
    console.log("Buzz");
  } else if (count % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(count);
  }
}
