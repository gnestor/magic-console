require('../tests/console')

var i = 1;
var run = setInterval(function() {
  console.render({
    key: 'line',
    data: "line " + i
  });
  i++;
  if (i == 20) {
    stop();
  }
}, 1000);
function stop() {
  clearInterval(run);
}

// var i = 1;
// var run = setInterval(function() {
//   console.log("line " + i);
//   i++;
//   if (i == 20) {
//     stop();
//   }
// }, 1000);
// function stop() {
//   clearInterval(run);
// }
