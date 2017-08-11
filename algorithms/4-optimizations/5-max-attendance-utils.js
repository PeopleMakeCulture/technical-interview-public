const repl = require('repl');

function leftZeroPad (str, size) {
  str = `${str}`;
  if (str.length >= size) return str;
  return '0'.repeat(size - str.length) + str;
}

function msToTime (ms) {
  const hrs = Math.floor(ms / 3600000);
  ms -= hrs * 3600000;
  const mins = Math.floor(ms / 60000);
  ms -= mins * 60000;
  const secs = Math.floor(ms / 1000);
  ms -= secs * 1000;
  return [hrs, mins, secs].map(n => leftZeroPad(n, 2))
  .join(':') + '.' + leftZeroPad(ms, 3);
}

const colonOrPeriod = /[:.]/g;
function timeToMs (time) {
  const [hrs, mins, secs, mills] = time.split(colonOrPeriod).map(Number);
  return ((hrs * 60 + mins) * 60 + secs) * 1000 + mills;
}

function perturb (value, multRange) {
  const perturbance = 1 + (Math.random() * multRange * 2) - multRange;
  return Math.floor(value * perturbance);
}

function examplesSlashTests () {
  const ms1 = 7837432;
  const time1 = msToTime(ms1);
  console.log('ms1', ms1);
  console.log('time1', time1);
  console.log('time1 back to ms', timeToMs(time1));
  console.log('----');

  const time2 = '03:45:58.123';
  const ms2 = timeToMs(time2);
  console.log('time2', time2);
  console.log('ms2', ms2);
  console.log('ms2 back to time', msToTime(ms2));
  console.log('----');

  const time3 = '13:00:00.000';
  const ms3 = timeToMs(time3);
  console.log('time3', time3);
  console.log('time3 perturbed', msToTime(perturb(ms3, 0.1)));
  console.log('----');
}

const replInstance = repl.start('> ');

Object.assign(replInstance.context, {
  leftZeroPad,
  timeToMs,
  msToTime,
  perturb,
  examplesSlashTests
});
