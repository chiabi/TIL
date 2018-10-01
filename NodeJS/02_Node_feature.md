# 노드 기능

## 1. REPL

- **Read**: 읽고
- **Eval**: 해석하고
- **Print**: 결과물을 반환하고
- **Loop**: 종료될 때까지 반복

### 1.1. 노드 REPL 사용

```sh
$ node
> const str = "Helllo world, hello node";
undefined
> console.log(str)
Helllo world, hello node
undefined
```

### 1.2. 노드 REPL 종료 방법 2 가지

- `.exit`입력
- `Ctrl` + `C` 두번 입력

## 2. JS 파일 실행

콘솔에서 `node [자바스크립트 파일 경로]`로 파일 실행  
(확장자(.js)는 생략해도 된다.)

```js
// helloNode.js
console.log("Hello Node!!!");
```

```sh
$ node helloNode
Hello Node!!!
```

## 3. 모듈

코드의 재사용, 파일 하나가 모듈 하나가 된다. 파일별로 코드를 모듈화할 수 있다.

```js
// var.js
const odd = "홀수";
const even = "짝수";

module.exports = {
  odd,
  even
};
```

`require`는 모듈을 요청하는 노드에서 기본적으로 제공하는 내장객체이다.  
`module.exports`는 정의한 모듈을 export 하고 `require` 을 통해 사용할 수 있도록 한다. `module.exports`에는 객체뿐만 아니라 함수, 변수를 대입해도 된다.

```js
// func.js
// 아래는 ES2015+의 분해대입
const { odd, even } = require("./var");

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}
module.exports = checkOddOrEven;
```

모듈로부터 값을 불러올 때 변수 이름을 다르게 지정할 수 있다.

```js
// index.js
const { odd, even } = require("./var");
// checkOddOrEven를 checkNumber라는 이름으로 사용한다.
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
```

### ES2015 모듈([ECMAScript Modules](https://nodejs.org/api/esm.html))

자바스크립트 자체 모듈 시스템 문법이 생겼다.

```js
import { odd, even } from "./var";

function checkOddOrEven(num) {
  // ...
}

export default checkOddOrEven;
```

노드에서도 9 버전부터 ES2015 의 모듈시스템을 사용할 수 있으나  
파일 확장자를 mjs 로 지정해야 하며, 실행시 `node --experimental-modules [파일명]`처럼 특별한 옵션을 붙여줘야한다.

```sh
node --experimental-modules my-app.mjs
```

## 4. 노드 내장 객체

노드에서 브라우저의 `window` 객체와 비슷하게 기본적인 내장 객체와 내장 모듈을 제공한다.

### 4.1. global

브라우저의 `window`와 같은 노드의 전역 객체  
모든 파일에서 접근할 수 있으면, `global`의 메서드를 사용시 `global`을 생략할 수 있다.

```js
// const { odd, even } = global.require("./var");
const { odd, even } = require("./var");

// global.console.log(odd);
console.log(odd);
```

노드 버전에 따라 콘솔 내용이 다를 수 있다.

```sh
$ node
> global
{ console: [Getter],
  global: [Circular],
  process: { ... },
  Buffer: { [Function: Buffer] ... },
  clearImmediate: [Function],
  clearInterval: [Function],
  clearTimeout: [Function],
  setImmediate: { [Function: setImmediate] [Symbol(util.promisify.custom)]: [Function] },
  setInterval: [Function],
  setTimeout: { [Function: setTimeout] [Symbol(util.promisify.custom)]: [Function] },
  module: { ... },
  require: { [Function: require] ... }
```

전역객체라는 점을 이용해 간단한 데이터를 파일간 공유할 때 사용하기도 한다.  
그러나 프로그램의 규모가 커질 수록 어떤 파일에서 `global`객체에 값을 대입했는지 찾기 힘들어 유지보수가 어려워지므로  
다른 파일의 값을 모듈 형식으로 만들어 명시적으로 값을 불러와 사용하는 것이 좋다.

### 4.1. console

브라우저의 `console`과 거의 비슷하다.  
보통 디버깅을 위해 사용. 대표적으로 `console.log` 메서드가 있음

- `console.time(레이블)`: `console.timeEnd(레이블)`과 대응되어 같은 레이블을 가진 time 과 timeEnd 사이의 시간을 측정한다.
- `console.log(내용 [, 내용] )`: 평범한 로그를 콘솔에 표시, 쉼표로 여러 내용을 동시에 표시할 수 있다.
- `console.error(에러 내용)`: 에러를 콘솔에 표시
- `console.dir(객체, 옵션)`: 객체를 콘솔에 표시할 때 사용.
  - 표시할 객체
  - 옵션:
    - color - 콘솔에 색 추가
    - depth - 객체 안 몇 단계까지 보여줄 지 결정(기본값 2)
- `console.trace(레이블)`: 에러가 어디에서 발생했는지 추적할 수 있게 함. 보통은 에러 발생 시 에러 위치를 알려주므로 자주 사용하지는 않는다.

### 4.2. 타이머

타이머 함수: 아이디를 반환한다.

- `setTimeout(콜백 함수, 밀리초)`: 주어진 밀리초 이후 콜백 함수 실행
- `setInterval(콜백 함수, 밀리초)`: 주어진 밀리초마다 콜백 함수 반복 실행
- `setImmediate(콜백 함수)`: 콜백 함수 즉시 실행

※ 밀리초: 1000 분의 1 초

타이머 취소

- `clearTimeout(아이디)`: `setTimeout` 취소
- `clearInterval(아이디)`: `setInterval` 취소
- `clearImmediate(아이디)`: `setImmediate` 취소

※ `setImmediate()`과 `setTimeout(콜백, 0)`에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행된다. 파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 것과 같은 특수한 경우 `setImmediate()`이 보다 먼저 실행되지만 항상 그런 것은 아니므로 혼동되지 않게, `setTimeout(콜백, 0)`은 사용하지 않는 것이 좋다.

### 4.3. `__filename`, `__dirname`

`__filename`, `__dirname` 키워드는 경로에 대한 정보를 제공한다.  
현재 파일의 경로나 파일명을 알아야할 때 사용

```js
// filename.js
console.log(__filename); // 현재 파일 명
console.log(__dirname); // 현재 파일 경로
```

```
$ node filename.js
C:\Users\chiabi\Documents\study\TIL\NodeJS\hello\03_global\filename.js
C:\Users\chiabi\Documents\study\TIL\NodeJS\hello\03_global
```

경로가 문자열로 반환되기도 하고, `/`, `\`같은 경로 구분자 문제도 있어 보통은 이를 해결하는 `path`모듈과 함께 사용한다.

### 4.4. module, exports

`module` 객체의 `module.exports` 로 한번에 대입하는 대신 각각의 변수를 `exports` 객체에 넣는 방법으로 모듈을 만들 수 있다.  
`module.exports` 와 `exports` 가 같은 객체를 참조하므로 동일하게 동작한다.  
(`module.exports === exports` -> true)

```js
// var.js
exports.odd = "홀수입니다.";
exports.even = "짝수입니다.";
```

`exports`가 `module.exports`를 참조하므로 `exports`에는 반드시 객체처럼 속성명과 속성값을 대입해야 한다.  
`exports`에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더 이상 모듈로 기능하지 않는다. 또한, 한 모듈에 `exports`객체와 `module.exports`를 동시에 사용하지 않는 것이 좋다.

### 4.5. process

현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다.

```sh
$ node
> process.version
# 설치된 노드 버전
'v8.11.1'

> process.arch
# 프로세서 아키텍처 정보
'x64'

> process.platform
# 운영체제 플랫폼 정보
'win32'

> process.pid
# 현재 프로세스의 아이디
21548

> process.uptime()
# 프로세스가 시작된 후 흐른 시간(단위-초)
36.19

> process.execPath
# 노드 경로
'C:\\Program Files\\nodejs\\node.exe'

> process.cwd()
# 현재 프로세스가 실행되는 위치
'C:\\Users\\chiabi\\Documents\\study\\TIL\\NodeJS\\hello\\03_global'

> process.cpuUsage()
# 현재 cpu 사용량
{ user: 140000, system: 62000 }
```

### 4.5. [process.env](https://nodejs.org/api/process.html#process_process_env)

사용자 환경(시스템의 환경 변수 정보)을 포함하는 객체를 반환한다.

서비스의 중요한 키를 저장하는 공간으로도 사용된다.  
서버, 데이터베이스의 비밀번호와 각종 API 키를 유출될 수 있는 코드에 직접 입력하는 대신 `process.env` 속성으로 대체하는 것이 좋다.

모든 운영체제에 다음과 같이 동일하게 사용하기 위해 [dotenv](https://github.com/motdotla/dotenv)를 사용한다.

```js
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
```

### 4.6. [process.nextTick(callback)](https://nodejs.org/api/process.html#process_process_nexttick_callback_args)

이벤트 루프가 다른 콜백 함수들보다 `nextTick`의 콜백 함수를 우선으로 처리하도록 한다.  
`setImmediate`나 `setTimeout`보다 먼저 실행된다.

resolve 된 `Promise`도 `nextTick`처럼 다른 콜백들보다 우선시 되므로, `process.nextTick`과 `Promise`를 마이크로 태스크(microtask)라고 따로 구분지어 부른다.

단, 마이크로태스크를 재귀 호출할 경우, 이벤트 루프틑 다른 콜백함수보다 마이크로태스크를 우선하여 처리하기 때문에 콜백함수들이 실행되지 않을 수 있다.

![태스크와 마이크로 태스크](../asset/the-Node-js-event-loop.png)  
<sub>(이미지 출처: https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop//)<sub>

### 4.7. [process.exit([code])](https://nodejs.org/api/process.html#process_process_exit_code)

실행 중인 노드 프로세스를 종료한다.  
서버에서 사용하면 서버가 멈추기 때문에 서버에서는 거의 사용하지 않고, 서버 외의 독립적인 프로그램에서 수동으로 노드를 멈추게 할 때 사용한다.

인자로 코드 번호를 줄 수 있다.

- 없거나 0: 정상 종료
- 1: 비정상 종료

## 5. 노드 내장 모듈

노드에서 제공하는 모듈을 사용하면 다음과 같은 기능들을 사용할 수 있다.

- 운영체제 정보에 접근
- 클라이언트가 요청한 주소에 대한 정보 가져오기

※ 노드 모듈은 버전마다 차이가 있다.

## os

노드는 os 모듈에 정보가 담겨 있어 운영체제의 정보를 가져올 수 있다.  
주로 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용된다.  
일반적인 웹 서비스를 제작할 때는 사용 빈도가 높지 않지만 운영체제 별로 다른 서비스를 제공하고 싶을때 유용하다.

- 운영체제 정보
  - `os.arch()` : `process.arch`와 동일, 프로세서 아키텍처 정보
  - `os.platform()` : `process.platform`과 동일, 운영체제 플랫폼 정보
  - `os.type()` : 운영제체 종류
  - `os.uptime()` : 운영체제 부팅 이후 흐른 시간(초)
  - `os.hostname()` : 컴퓨터 이름
  - `os.release()` : 운영체제 버전
- 경로 정보
  - `os.homedir()` : 홈 디렉터리 경로
  - `os.tmpdir()` : 임시 파일 저장 경로
- cpu 정보
  - `os.cpus()` : 컴퓨터의 코어 정보
  - `os.cpus().length`로 코어의 개수를 알 수 있다. 단, 노드는 싱글 스레드라 코어가 몇 개이든 대부분의 경우 코어 하나밖에 사용하지 않는다.
- 메모리(RAM) 정보
  - `os.freemem()` : 사용 가능한 메모리(RAM)
  - `os.totalmem()` : 전체 메모리 용량
- 에러와 신호에 대한 정보
  - `os.constants`: 에러 발생 시 `EADDRINUSE`나 `ECONNRESET`같은 에러 코드를 함께 보여주는데, 이러한 코드들이 `os.constants`객체 안에 들어있다.

```sh
> console.dir(os.constants);
{ UV_UDP_REUSEADDR: 4,
  errno:
   { E2BIG: 7,
     EACCES: 13,
     EADDRINUSE: 100,
     # ...중략
     WSA_E_CANCELLED: 10111,
     WSAEREFUSED: 10112 },
  signals:
   { SIGHUP: 1,
     SIGINT: 2,
     # ...중략
     SIGBREAK: 21,
     SIGWINCH: 28 } }
```

## path

폴더와 파일 경로를 쉽게 조작하도록 도와주는 모듈.  
운영체제별로 경로 구분자가 다르기 때문에 필요한 모듈이다.  
파일 경로에서 파일명이나 확장자만 따로 떼어주는 기능도 구현되어있다.

- Windows: `\` 로 구분 - `C:\Users\chiabi\Documents`
- POSIX: `/`로 구분 `/home/chiabi`

※ POSIX: 유닉스 기반 운영체제들(maxOS, 리눅스)

- `path.sep`: 경로의 구분자. Windows(`\`), POSIX(`/`)
- `path.delimiter`: 환경변수의 구분자. `process.env.PATH`를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있다. Windows(`;`), POSIX(`:`)
- `path.dirname(path)`: 파일이 위치한 폴더 경로
- `path.extname(path)`: 파일 확장자
- `path.basename(path[, ext])`: 파일의 이름(확장자 포함), 파일 이름만 표시하고 싶을 때 두번째 인자에 확장자를 넣어주면 됨
- `path.parse(path)`: 파일 경로를 `root`, `dir`, `base`, `ext`, `name`으로 분리해서 객체를 반환
- `path.format(pathObject)`: `path.parse()`한 객체를 파일 경로로 합친다.
- `path.normalize(path)`: `\`나 `/` 혼용/여러번 사용 시 정상적인 경로로 변환
- `path.isAbsolute(path)`: 파일 경로가 절대경로인지 상대경로인지 `true`, `false`반환
- `path.relative(from, to)`: 경로를 두 개 넣으면 첫번째 경로에서 두번째 경로로 가는 방법을 알려줌
- `path.join([...paths])`: 여러 인자를 넣으면 하나의 경로로 합침. 상대경로(`..`)와 현 위치(`.`)도 알아서 처리
- `path.resolve([...paths])`: `path.join`과 비슷하지만 동작 방식이 다르다. `/`를 만나면 절대경로로 인식해서 앞의 경로를 무시한다.(`path.join`은 상대 경로로 처리한다.)

```js
path.join("/a", "/b", "c");
// '\\a\\b\\c'
path.resolve("/a", "/b", "c");
// 'C:\\b\\c'
```
