# HTTP(HyperText Transfer Protocol)

[[학습자료 HTTP]](https://fds9.github.io/fds-nodejs-http/1-2-1-http.html)  

※ [Chrome DevTools를 이용한 리소스 로드 시간 측정](https://developers.google.com/web/tools/chrome-devtools/network-performance/resource-loading?hl=ko)  
기본적으로 네트워크 활동 기록은 새로고침하거나 다른 페이지 로드 시 폐기된다.  
**Preserve log**에 체크하여 네트워크 로그를 모두 저장하여 변화를 확인하자

+ 1.HTTP란?
  - [1.1. HTTP 역사](./HTTP.md#11-http-%EC%97%AD%EC%82%AC)
  - [1.2. HTTPS](./HTTP.md#12-https)
  - [1.3. HTTP/2](./HTTP.md#13-http2)
+ 2.HTTP 구성요소
  - [2.1. Request & response](./HTTP.md#21-request--response)
  - [2.2. Request Methods](./HTTP.md#22-request-methods)
  - [2.3. URL(Uniform Resource Locator, 통합자원식별자)](./HTTP.md#23-urluniform-resource-locator-%ED%86%B5%ED%95%A9%EC%9E%90%EC%9B%90%EC%8B%9D%EB%B3%84%EC%9E%90)
  - [2.4. Percent Encoding](./HTTP.md#24-percent-encoding)
  - [2.5. Response Status](./HTTP.md#25-response-status)
    * 2.5.1. Status Category, Status Code
  - [2.6. Header](./HTTP.md#26-header)
    * 2.6.1 내용협상(Content Negotiation)
+ 3.정리

## 1. HTTP란?

+ 웹 브라우저와 웹 서버간의 통신을 위해 개발된 통신규약  
+ 최근에 **REST API의 부상**과 함께 다른 용도로도 널리 사용됨
  - 모바일 앱 - 서버간 통신
  - 서버 - 서버간 통신
+ TCP와 UDP를 사용하며 **80번 포트**를 기본으로 사용
  - `localhost:`(자신의 컴퓨터에 대한 주소)`8080`, `5500`포트번호(통신 통로)
  - `http://www.fastcampus.co.kr`는 뒤에 `:80`이 생략된 것이다. 
+ **클라이언트의 요청(request)과 서버의 응답(response)으로 이루어진다.**
  - 브라우저에서는 주소를 치고 전송하지 않으면 아무것도 보여주지 않는다. 반면에 채팅의 통신 방식은 좀 다르다. 채팅을 할때는 굳이 요청을 하지 않아도 정보를 받게된다.  
  반면에 슬랙같은 것을 브라우저에서 사용할 때는 HTTP가 아닌 다른 실시간 통신 방식으로 받는다.

> ※ 포트 번호(port number)  
> + 인터넷상에서 통신을 위해 IP주소와 함께 해당하는 프로토콜에 의해 사용된다.  
> + 범위는 0 ~ 65535
> + 이중 0~ 1023번까지는 인터넷 환경에서 많이 사용하는 네트워크 응용 서비스의 서버 프로세스에 > 할당된 포트 번호로 **Well-known port**라고 한다.  
> FTP는 20, HTTP(웹 서비스) 80, SMTP(전자메일)은 53 등 인터넷에서 자주 사용하는 응용 서비스는 모두 고정된 포트번호를 사용한다.
> + [TCP/UDP의 포트 목록](https://goo.gl/BLBGR8)

IP주소가 애플리케이션이 동작하는 PC나 서버를 특정할 수 있게 한다면,  
포트 번호는 PC나 서버상에서 동작하는 '애플리케이션 그 자체'(웹 브라우저나 이메일 소프트웨어 같이 통신이 이루어지는 프로그램/서비스 등)를 식별하기 위한 정보이다.  

### 1.1. HTTP 역사

+ **1991 - HTTP/0.9**: 팀 버너스 리가 HTML뿐만 아니라 웹 브라우저를 만들면서, 웹서버와 웹 브라우저간의 통신방식을 만들었다.(URL, HTTP, HTML 최초 설계한 웹의 아버지)  
텍스트만 전송할 수 있는 극도로 단순한 프로토콜 이었으며 서버로부터 페이지를 요청하는 GET 메소드 하나만 있었다.  
인터넷 붐을 일으키면서 여러 인터넷 서비스가 생겨났다.(야후 등) 그리고 이들이 자체적인 HTTP를 구현했다.
+ **1996 - HTTP/1.0**: 여러 인터넷 서비스 업체들이 자체적으로 사용하던 HTTP 구현들을 모아 HTTP 1.0 발표
+ **1999 - HTTP/1.1**: HTTP 1.0의 문제를 해결하고 여러가지 기능을 추가하여 지금까지 사용되고 있는 HTTP 1.1 버전 발표
+ **2015 - HTTP/2**: 속도 개선에 중점을 둔 구글의 SPDY 프로토콜 기반의 새로운 HTTP 표준

> + [Brief History of HTTP](https://hpbn.co/brief-history-of-http/)
> + [HTTP의 진화](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

### 1.2. HTTPS

> `https://`로 시작하는 URL을 가진 웹사이트의 통신은 모두 SSL에 의해 암호화 된다.

+ HTTP over SSL(Secure Socket Layer - 통신을 암호화 하는 것, 암호화된 전송 계층), HTTP over TLS, HTTP Secure
  - SSL이나 TLS 프로토콜을 통해 세션 데이터를 암호화한다.
+ HTTP 통신을 암호화해 주고받는 내용을 중간에서 가로챌 수 없도록 함
+ **443번 포트**를 기본으로 사용(HTTP주소에 80번 포트가 생략된 것처럼)

HTTP 통신으로 제공하는 서비스는 해커가 공유기를 해킹한다면 내가 접속한 화면이나 나의 입력(패스워드 등) 모든 데이터를 볼 수 있다.

SSL은 인증서를 통해 위장되지 않은 정규 서버와의 사이에서 암호화된 안전한 통신을 제공한다. SSL에서 통신을 수행할 때 먼저 통신 상대의 인증서를 체크하여 위장 여부를 확인한다.

개인정보를 크게 다루지 않는 서비스들은 HTTP를 유지하지만 HTTPS로 모두 바꾸자는 추세이다.  
(netlify는 전부 HTTPS로 적용해준다.)

> [HTTPS와 SSL인증서 - 생활코딩](https://opentutorials.org/course/228/4894)

### 1.3. HTTP/2

웹 사이트 하나 보여주면 엄청 많은 리소스(파일, 이미지)를 다운로드 받는다.  
무거운 사이트를 빠르게 보내주기에는 HTTP 1.1의 한계가 있다.  
(예를들면 HTML 문서가 다운로드 되어야 다른 것도 다운로드 받을 수 있다는 한계가 있음)

+ **구글의 SPDY 프로토콜**을 기반으로 2015년에 확정된 새로운 HTTP 표준(국제 표준으로 확정되었다.)
+ 속도 개선에 중점을 두고 개발됨
  - HTTP 1.1은 텍스트 문서를 주고받는다. 사람이 읽기에는 편한데 기계가 이해하기에는 시간이 걸린다.
  요청
  ```HTTP
  GET /restapi/v1.0 HTTP/1.1
  Accept: application/json
  Authorization: Bearer UExBMDFUMDRQV1MwMnzpdvtYYNWMSJ7CL8h0zM6q6a9ntw
  ```
  서버응답
  ```HTTP
  HTTP/1.1 200 OK
  Date: Mon, 23 May 2005 22:38:34 GMT
  Content-Type: text/html; charset=UTF-8
  Content-Encoding: UTF-8
  Content-Length: 138
  Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
  Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
  ETag: "3f80f-1b6-3e1cb03b"
  Accept-Ranges: bytes
  Connection: close

  <html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    Hello World, this is a very simple HTML document.
  </body>
  </html>
  ```
  - HTTP2는 텍스트가 아닌 2진으로 이루어져 있어 용량도 작고 속도도 빠르다.(Header Compression, 바이너리 프로토콜) 
  - GET, POST 메소드, 상태코드 등의 개념은 바뀌지 않았다. 뒤에서 최적화가 많이 이루어짐
    * Multiplexing: 하나의 커넥션 안에서 다수의 독립적인 스트림을 동시에 처리(적은 수의 커넥션으로 다수의 요청, 응답을 동시 처리)
    * Full-duplex interleaving과 스트림 우선 순위: 한 스트림 진행 중에 다른 스트림이 끼어드는 것을 허용한다. 스트림 우선 순위 설정을 지원해 우선 순위가 높은 데이터가 끼어들어 더 빨리 전달되게 할 수 있다.
    * Server Push: 클라이언트의 요청 없이도 서버에서 콘텐츠를 직접 Push할 수 있다.
    * Stream Priority: 요청에 의존성 관계를 지정할 수 있다.
+ 반드시 HTTPS를 사용해야 한다는 제약사항이 있다.
  - HTTP/2의 기반이 되는 SPDY 프로토콜은 항상 TLS(Transport Layer Security)위에서 동작한다.
+ 현재 전체 웹사이트 중 26% 이상이 사용중
  - 트래픽 비용이 많이 줄어든다. 큰 웹 사이트를 운영하는 대기업에서는 많이 도입하고 있다.
  - 일반 개발자 입장에서도 관련된 라이브러리가 많이 나와 적용하기 쉬워졌다.

웹 브라우저와 웹 서버간의 통신 규약임. 양쪽에서 지원하면 쓸 수 있다.  
크롬 같은 브라우저는 자동으로 업데이트 되니까 이미 환경이 되어있을 것이고 서버를 다루는 개발자라면 HTTP2를 서버에 적용해야한다.

> + [SPDY는 무엇인가?](https://d2.naver.com/helloworld/140351)
> + [더 빠른 웹을 위해: HTTP/2](https://www.slideshare.net/eungjun/http2-40582114)

## 2. HTTP 구성요소

### 2.1. Request & response

+ 웹 브라우저(또는 다른 클라이언트)는 웹 서버에 요청(request)를 보낸다.
  - fetch함수 등을 사용해서...
+ 그에 따라 서버는 클라이언트에 응답(response)를 보냄
  - 서버도 컴퓨터이다. 서버에서 요청에 맞게 데이터를 만들어 웹 브라우저에 보낸다.
  - 이때 부가정보와 본문이 전달된다.
+ 웹브라우저의 경우, HTML 문서 형태의 응답이 오면 해당 문서를 분석 후, 문서에 포함된 모든 자원에 대한 요청을 각각 추가로 보낸다.(이미지, 동영상, 오디오, CSS, JS, 폰트)

> + [Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
> + [What happens when - KR](https://github.com/SantonyChoi/what-happens-when-KR)

### 2.2. Request Methods

+ 이럴때는 이런 메소드를 써라라고 **HTTP 명세에 8종류의 요청 메소드**가 등록되어 있다. 각각의 역할과 충족해야 하는 성질이 명시되어 있다.
  - `GET`: 오직 데이터를 받기만 함, 특정 리소스의 표시를 요청
  - `HEAD`: GET메소드의 요청과 동일한 응답을 요구하지만, 응답 본문을 포함하지 않는다.
  - `POST`: 특정 리소스에 엔티티를 **제출**할 때 사용한다.
  - `PUT`: 이미 존재하는 데이터를 바꾼다. (목적 리소스 모든 현재 표시를 요청 payload로 바꾼다.) 
  - `DELETE`: 특정 리소스를 삭제한다.
  - `CONNECT`: 목적 리소스로 식별되는 서버로의 터널을 맺는다.(프록시 서버와 같은 중간 서버를 경유한다.)
  - `OPTIONS`: 목적 리소스의 통신을 설정하는데 쓰인다.(웹 서버측 제공 메소드에 대한 질의, 가능한 메소드 옵션에 대한 질의)
  - `TRACE`: 목적 리소스의 경로를 따라 메시지 loop-back 테스트를 한다.(요청 리소스가 수신되는 경로를 보여준다.)
  - `PATCH`: 리소스의 부분만을 수정한다.
+ 웹 브라우저는 특정 상황에서 특정 메소드로 요청을 보내도록 만들어져 있다.
  - 자료를 요청할 때는 GET, form 엘리먼트에서 method가 POST요청이면 POST를 사용한다.
+ Ajax와 같이 요청을 보내는 코드를 직접 짤 때는 요청 메소드를 선택할 수 있음
  - 웹 브라우저는 기본적으로는 GET, POST밖에 사용하지 못하나 Ajax나 `fetch()`를 사용한다면 PUT, DELETE를 사용할 수 있다.
+ **자료의 본문을 요청하는 GET 메소드**와, **새로운 자료를 등록하는 POST 메소드**가 가장 많이 사용된다.

> + [HTTP request methods](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
> + [HTTP Method Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)

### 2.3. URL(Uniform Resource Locator, 통합자원식별자)

네크워크 상에서 자원이 어디 있는지를 알려주기 위한 규약.  
웹 사이트 주소뿐만 아니라 컴퓨터 네트워크상의 자원을 모두 나타낼 수 있다.

```
https://www.example.com:3000/path/resource?id=123#section-id
```

**HTTP URL Anatomy**
+ `https://` : Scheme. 어떤방식으로 통신할 것 인지, 자원에 접근할 방법을 정의해 둔 프로토콜 이름 (`ftp://`, `mailto://`...)
  - 프로토콜 이름 구분자 `:`
  - IP혹은 Domain name 정보가 필요한 프로토콜이라면 `//`
+ `www` : Subdomain.
+ `example` : Domain.
+ `example` : Top-level Domain. 도메인 부분은 전부 IP주소로 변환된다.
+ `:3000`: Port
+ `/path/resource`: Path. 경로. 내가 필요로하는 요청을 보내려고 하는 자원의 경로
+ `?id=123`: Query String, Query Parameter.
+ `#section-id`: Fragement Identifier, Hash. HTML 본문안의 특정 위치

※ IP(Internet Protocol)는 인터넷 커뮤니케이션에서 사용하는 프로토콜 중 하나의 형태이며, 계층 구조로 이루어진 숫자들의 묶음으로 된 컴퓨터의 고유한 주소이다.
※ DNS(Domain Name System)은 IP와 대응되어 인터넷 주소를 연결해 준다. (도메인 네임은 절대적인 주소가 아니다.)

> + [IP 주소와 DNS](https://ko.khanacademy.org/computing/computer-science/internet-intro/internet-works-intro/v/the-internet-ip-addresses-and-dns)

### 2.4. Percent Encoding

> + 인코딩(encoding): 나타내고자 하는 정보를 그대로 표현할 수 없는 곳에서 다른 방식으로 표현하는 것(정보의 형태나 형식을 변환하는 처리나 처리 방식)  
> + 디코딩(decoding): 인코딩한 것을 다시 원래로 돌리는 것

+ URL은 **ASCII 문자**(128개의 영문자 + 특수문자 + 제어문자)밖에 사용하지 못하기 때문에, non-ASCII 문자를 위한 표형방법이 필요하다.
  - 보이는 URL과 달리
    ```
    // 보이는 URL
    https://www.google.co.kr/search?q=패스트캠퍼스

    https://www.google.co.kr/search?q=%ED%8C%A8%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%8D%BC%EC%8A%A4
    ```
+ **Percent encoding은 non-ASCII 문자를 위한 웹 표준 인코딩 방법**으로, JavaScript에 관련 기능이 포함되어 있음
  - 대개 브라우저 혹은 라이브러리에서 변환해주므로 특별히 신경쓸 필요는 없지만 알아두자
  ```js
  encodeURIComponent("한글")
  // "%ED%95%9C%EA%B8%80"
  decodeURIComponent("%ED%95%9C%EA%B8%80")
  // "한글"
  ```

### 2.5. Response Status

응답 상태.   
응답의 성공, 실패 여부와 종류를 나타냄

```
200 OK
404 NOT FOUND
```
상태 코드와 상태 메시지로 이루어져 있다.

#### 2.5.1. Status Category, Status Code

+ 2xx: 성공
  - 200 OK: 성공(제일 많이 쓰임)
  - 201 Created: 자료가 성공적으로 생성됨 
  (웹 브라우저에서 쓸 일은 많지는 않은데, 새 저장소를 생성하는 API를 사용한다든지 무언가 생성하여 POST 할 때는 사용 됨)
+ 3xx: 성공이지만 추가 작업이 필요함
  - 301 Moved Permanently (Redirection, 요청을 다른 곳으로 한번 더 보냄): 자료가 완전히 다른 곳으로 이동했음
  - 302 Found (Redirection): 자료가 일시적으로 다른 곳에 있음
  - 304 Not Modified (Cache): 클라이언트가 이미지 가지고 있던 자료가 수정되지 않아 그대로 사용하면 됨
    * 브라우저가 이전에 받아놓은 자료를 저장해(캐시) 사용함
+ 4xx: 실패 - 클라이언트 책임
  - 400 Bad Request: 요청의 형태가 잘못되어 응답할 수 없음. REST API에서 많이 사용된다. 약속과 틀린 정보를 제공해 응답을 줄 수 없는경우 
  - 403 Forbidden: 요청한 자료에 접근할 권한이 없음
  - 404 Not Found: 요청한 자료가 없음, 이상한 주소, 경로로 접속했을때
+ 5xx: 실패 - 서버 책임
  - 500 Internal Server Error: 요청을 처리하던 중 예상치 못한 오류가 발생
  - 503 Service Unavailable: 서버가 일시적으로 응답을 할 수 없음(트래픽이 몰린다든지)

> + [HTTP Status Codes](https://httpstatuses.com/)

※ **리디렉션 순환오류**  
> _'이 웹페이지에 리디렉션 순환 오류가 있습니다.'_ 또는 _'ERR_TOO_MANY_REDIRECTS'_
페이지에서 리디렉션을 지나치게 여러번 시도할 경우 발생하는 오류로 리디렉션 location에 다시 리디렉션을 걸어 순환되는 경우

개발자들의 정성스런 만우절 장난
+ [Hyper Text Coffee Pot Control Protocol](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol)
+ [418 I'm a teapot](https://tools.ietf.org/html/rfc2324#section-2.3.2)

### 2.6. Header

![http header](../asset/http-header.png)

+ **요청과 응답에 대한 추가 정보를 표현**하는 데 사용된다.(요청에도 포함되고 응답에도 있다)
+ 인증, 캐싱, 쿠키, 보안, 내용협상, 프록시 등 웹 표준에 정의된 많은 기능을 제어하는 데 사용된다.
  - **Authorization**: 요청의 인증 정보
  - **User-Agent**: 요청 중인 클라이언트의 정보(어떤 브라우저인지, 어떤 기기인지)
    ```
    Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36
    ```
    이 정보를 보고 어떤 기기나 브라우저로 접속했는지에 따라 서버에서 다른 화면을 보여주도록 설정할 수도 있다.
  - **Location**: 301, 302 응답에서 자료의 위치
  - **Accept**: 요청이 어떤 형태의 자료를 원하는지 나타냄
    ```
    text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    ```
  - **Content-Type**: 요청 혹은 응답이 어떤 형태의 자료인지 나타냄 
    ```
    text/html; charset=UTF-8
    ```
    HTML문서임을 확인할 수 있다. (웹 브라우저가 파일 형식을 확신할 수 있다.)
    ```
    image/png
    ```
    이미지, png 타입인 것을 알 수 있다.  

※ Accep나 Content-Type에 사용되는 이런 문자열은 표준으로 정해져있다. ([MIME Type](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types), [MIME Type 전체 목록](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types))

#### 2.6.1 내용협상(Content Negotiation)

![Content Negotiation](../asset/content-negotiation.png)

요청의 Accept, Accept-Language 등의 헤더를 보고 서버가 그에 맞는 형태의 자료를 응답하는 절차를 내용협상이라고 한다.

## 3. 정리

HTTP는 요청(Request)이 있어야 응답(Response)이 온다.  
요청과 응답 안에는 여러가지 구성요소가 있다.  
요청에는 8종류의 요청 메소드가 있다. 응답에는 성공과 실패 여부의 종류를 나타내는 상태 코드와 상태 메시지가 있다.  
그리고 요청과 응답에 대한 추가 정보를 표현하며 인증, 캐싱, 쿠키, 보안, 내용협상, 프록시 등 웹 표준에 정의된 많은 기능을 제어하는데 사용되는 Header가 있다.  
이런 구성요소의 각각의 역할과 기능을 알아두자