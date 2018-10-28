import R from "ramda";

const run = R.compose;
// 1.
// document.querySelector("#msg").innerHTML = "<h1>Hello World</h1>";

// 2.
// function printMessage(elementId, format, message) {
//   document.querySelector(
//     `#${elementId}`
//   ).innerHTML = `<${format}>${message}</${format}>`;
// }

// printMessage("msg", "h1", "Hello World");

const addToDom = selector => str =>
  (document.querySelector(`#${selector}`).innerHTML = str);
const h1 = str => `<h1>${str}</h1>`;
const h2 = str => `<h2>${str}</h2>`;
const echo = str => str;

const repeat = count => str => str.repeat(count);

// 3. 
// const printMessage = run(addToDom("msg"), h1, echo);
// printMessage("Hello World");

// 4.
const printMessage = run(console.log, repeat(2), h2, echo);
printMessage('Get Functional');