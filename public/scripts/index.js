// Update counter
var count = JSON.parse(localStorage.getItem("counter"));
count.visits++;
localStorage.setItem("counter", JSON.stringify(count));

console.log(count);