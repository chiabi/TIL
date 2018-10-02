const { URL } = require("url");

const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
console.log("searchParams: ", myURL.searchParams);
console.log("searchParams.getAll(): ", myURL.searchParams.getAll("category"));
console.log("searchParams.get(): ", myURL.searchParams.get("limit"));
console.log("searchParams.has(): ", myURL.searchParams.has("page"));

console.log("searchParams.keys(): ", myURL.searchParams.keys());
console.log("searchParams.values(): ", myURL.searchParams.values());

console.log("---------------------------------");
myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

console.log("---------------------------------");
myURL.searchParams.set("filter", "es6");
console.log(myURL.searchParams.getAll("filter"));

console.log("---------------------------------");
myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter"));

console.log("---------------------------------");
console.log("seatchParams.toString(): ", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();

console.log(myURL.search);
console.log(myURL.searchParams);
