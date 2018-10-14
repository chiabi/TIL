const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http
  .createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // message.url: <string>
    // String.prototypes.startsWith() : 어떤 문자열이 특정 문자로 시작하는 지 확인하여 boolean 반환
    if (req.url.startsWith('/login')) {
      // url.parse(urlString[, parseQueryString[, slashesDenoteHost])
      // return URL object
      const { query } = url.parse(req.url);
      // queryString.parse(str[,sep[,eq[,options]]])
      // parse a URL query string (str)
      // return javascript object
      const { name } = qs.parse(query);
      const expires = new Date();
      // dateObj.getMinutes(): return 현지 시간에 따라 지정된 날짜의 분을 나타내는 0 ~ 59 사이 정수
      // dateObj.setMinutes(minutesValue): return 1970 년 1 월 1 일 00:00:00 UTC와 업데이트 된 날짜 사이의 밀리 초 숫자
      expires.setMinutes(expires.getMinutes() + 5);

      // 쿠키에 이름을 담아 보내는 대신
      // randomInt라는 임의의 숫자를 보내고
      // 사용자 이름과 만료시간은 session 객체에 저장한다.
      const randomInt = +new Date();
      console.log('randomInt ', randomInt);
      session[randomInt] = {
        name,
        expires,
      };
      res.writeHead(302, {
        // 헤더에는 한글을 쓸 수 없으므로 encodeURIComponent() 메서드로 인코딩한다.
        Location: '/',
        'Set-Cookie': `session=${randomInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
      });
      res.end();
    } else if (
      cookies.session &&
      session[cookies.session].expires > new Date()
    ) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
      fs.readFile('./server4.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    }
  })
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중');
  });
