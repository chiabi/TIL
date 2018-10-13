# http 모듈로 웹 서버 만들기

## 1. 요청과 응답

서버에는 요청을 받는 부분과 응답을 보내는 부분이 있어야 한다.  
클라이언트로부터 요청이 들어왔을 때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해두어야 한다.

### 1.1 [HTTP 모듈](https://nodejs.org/api/http.html#http_http)

http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있다.  
Node.js 의 HTTP 인터페이스는 전통적으로 사용하기 어려운 프로토콜의 많은 기능을 지원하도록 설계되었다.

인터페이스는 전체 요청이나 응답을 절대 버퍼링하지 않도록 주의해야한다. 사용자는 데이터를 스트리밍할 수 있다.(the user is able to stream data)

- `http.createServer([options][, requestlistener])`: 인자로 요청에 대한 콜백함수를 넣을 수 있다.
  - Returns: `<http.Server>`

```js
// HTTP 서버와 클라이언트를 사용한다.
const http = require("http");

// 요청이 들어올 때마다 콜백 함수가 실행된다.
// req, request: 요청에 대한 정보들을 담고 있다.
// res, response: 응답에 대한 정보들을 담고 있다.
http
  .createServer((req, res) => {
    // 어떻게 응답할지 적는 곳
  })
  .listen(8080, () => {
    // 8080번 포트에서 서버에서 요청이 오기를 대기한다.
  });
```

- `server.listen()`: 연결을 수신하는 HTTP 서버를 시작한다. 이 메서드는 `net.Server` 의 [`server.listen()`](https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback)과 동일하다.

#### `net.Server`: TCP, IPC 서버를 만드는 데 사용된다.

- `server.listen()`: 이 함수는 비동기이다. 서버가 수신 대기하기 시작하면 `listening`이벤트가 발생한다. 마지막 매개 변수 콜백이 `listening` 이벤트에 대한 리스너로 추가된다.
- `server.listen([port[, host[, backlog]]][, callback])`: 클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행 될 콜백 함수를 넣는다.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("<h1>Hello Node!</h1>");
  res.end("<p>Hello Server!</p>");
});

server.listen(8080);
// listen 메서드에 콜백함수를 넣는 대신,
// 서버에 listening 이벤트 리스너를 붙인다.
server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다.");
});

// error 이벤트 리스너
server.on("error", () => {
  console.log(error);
});
```

- `response.write(chunk[, encoding][, callback])`: 여러번 호출 해 데이터를 여러 개 보내도 된다.
  - `chunk(<string> | <Buffer>)`: 클라이언트로 보낼 데이터 (응답 본문(response body))
- `response.end([data][, encoding][, callback])`: 응답을 종료하는 메서드, 모든 응답 헤더와 본문이 전송되었음을 서버에 알린다. 인자가 있을 경우 그 데이터도 클라이언트에 보내고 응답이 종료된다.(data 가 있으면 `response.write(data, encoding)`를 호출 한 다음 `response.end(callback)`를 호출한 것과 같다.)

### 1.2 localhost 와 포트

#### [localhost](https://ko.wikipedia.org/wiki/Localhost)

현재 컴퓨터 내부 주소. 외부에서 접근할 수 없다. 서버 개발 시 테스트용으로 많이 사용된다.  
`127.0.0.1`을 주소로 사용해도 같다. 이러한 숫자 주소를 IP 라고 함

#### [포트(port)](<https://ko.wikipedia.org/wiki/%ED%8F%AC%ED%8A%B8_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9)>)

서버 내에서 프로세스를 구분하는 번호.  
서버는 HTTP 요청을 대기하고, 데이터베이스와 통신하고, FTP 요청을 처리하는 등 많은 일을 한다. 이에 **서버는 프로세스에 포트를 다르게 할당해 들어오는 요청을 구분한다.**  
IP 주소 뒤에 콜론(:)과 함께 붙여 사용한다.

```
21   - FTP
23   - Telnet
80   - HTTP
443  - HTTPS
3306 - MYSQL
```

`https://www.naver.com/` 같은 사이트들은 포트번호를 따로 표시하지 않음, http 의 경우 80 번, https 의 경우 443 번 포트 번호를 생략할 수 있다. `https://www.naver.com:443`으로 요청해도 사이트에 접속된다.
