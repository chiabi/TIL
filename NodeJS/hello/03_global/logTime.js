function logTime(func, label = "소요시간") {
  console.time(label);
  func();
  console.timeEnd(label);
}

module.exports = logTime;
