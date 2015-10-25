#!/usr/local/bin/node
var commander = require('commander');
var ProgressBar = require('progress');
var player = require('play-sound')(opts = {})

var timeSum = 0;

commander
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-s, --seconds <n>', 'duration (integer value)', parseInt)
  .option('-m, --minutes <n>', 'duration (integer value)', parseInt)
  .parse(process.argv);


if (commander.minutes) {
    timeSum = commander.minutes * 60;
}
if (commander.seconds) {
  timeSum = timeSum + commander.seconds;
}
if (timeSum <= 0) {
  console.log('Wrong parameters!');
  process.exit();
}
console.log('Timer set to ' + timeSum + ' seconds.');
var bar = new ProgressBar(':bar', { total: timeSum, width: 40 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    player.play(__dirname + '/timer.mp3', function(err){
      if (err) console.log(err);
    });
    clearInterval(timer);
  }
}, 1000);
