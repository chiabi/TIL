const path = require("path");

const string = __filename;

console.log("path.sep: ", path.sep);
console.log("path.delimiter: ", path.delimiter);
console.log("--------------------------------------");
console.log("path.dirname(): ", path.dirname(string));
console.log("path.extname(): ", path.extname(string));
console.log("path.basename(): ", path.basename(string));
console.log("path.basename(): ", path.basename(string, path.extname(string)));
console.log("--------------------------------------");
console.log("path.parse(): ", path.parse(string));
console.log(
  "path.format(): ",
  path.format({
    dir: "C:\\Users\\chiabi",
    name: "path",
    ext: ".js"
  })
);
console.log("path.normalize(): ", path.normalize("C:\\Users\\chiabi\\path.js"));
console.log("--------------------------------------");
console.log("path.isAbsolute(): ", path.isAbsolute("C:\\"));
console.log("path.isAbsolute(): ", path.isAbsolute("./home"));
console.log("--------------------------------------");
console.log(
  "path.relative(): ",
  path.relative("C:\\Users\\chiabi\\path.js", "C:\\")
);
console.log(
  "path.join(): ",
  path.join(__dirname, "..", "..", "/users", ".", "/chiabi")
);
console.log(
  "path.resolve(): ",
  path.resolve(__dirname, "..", "users", ".", "/chiabi")
);
