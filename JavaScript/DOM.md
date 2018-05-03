# DOM(Document Object Model, 문서객체 모델)

[강의자료](https://github.com/fds9/fds-dom-api)

자바스크립트의 일부로 구현된 명세가 아니다.  
주요 브라우저 벤더들이 구현하고 있는 별개의 규칙이다.  
(DOM의 표준은 W3C에 의해 관리된다. - HTML이나 XML같은 문서를 오브젝트로 추상화하여 언어에 관계없이 이들을 다루는 방법이 정의되어 있다.)


## 1. DOM API

> **API**(Application Programming Interface, 응용 프로그램 프로그래밍 인터페이스)  
어플리케이션을 프로그래밍 할 수 있는 접점(만들어진 속성, 함수)  
어플리케이션에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스이다. 프로그램 또는 스크립트가 서로 간에 상호작용할 수 있도록 돕는다.

※ 자바스크립트를 통해 브라우저를 다룰 때 사용할 수 있는 API는 DOM외에도 다양하다.

문서 객체 모델(DOM)은 HTML, XML 및 SVG 문서를 위한 프로그래밍 인터페이스이다.  
기본적으로 다음의 두 가지 역할을 한다.

+ 문서에 대한 모델 구성(문서의 구조화된 표현(structured representation))
  - 브라우저는 웹 페이지를 로드한 후 이 페이지에 대한 모델을 메모리에 생성한다.
  - DOM은 브라우저가 DOM트리를 이용해 모델을 구성하는 방법을 명시한다.
  - 각각의 객체는 브라우저 창에 로드된 페이지 중 각자의 영역을 표현한다.
+ 문서에 접근하고 수정하기
  - DOM 구조 그러니까 각 객체에 접근하고 내용을 수정하기 위한 속성과 메서드를 제공한다.
  - 문서를 표현하는 각 객체들은 문서가 구조화된 Nodes와 속성(property), 메소드(mothod)를 가지고 있다.

DOM은 웹페이지(일종의 문서(document))의 객체지향 표현이며, 자바스크립트와 같은 스크립팅 언어를 이용해 DOM을 수정할 수 있다.

DOM은 바라보는 관점에 따라 여러가지로 표현할 수 있는데, 인터페이스 관점에서 바라보면 DOM은 DOM Interface, HTML Interface, SVG Interface등을 포함한 **프로그래밍 인터페이스**를 의미한다. 

※ [MDN의 DOM 인터페이스](https://developer.mozilla.org/ko/docs/Gecko_DOM_Reference)문서에서 인터페이스의 목록을 볼 수 있다.  
이 문서의 인터페이스들은 DOM에서 사용하는 객체에 대한 생성자들이다.
```
                              생성자
<body>       body 객체        HTMLBodyElement
<script>     script 객체      HTMLScriptElement
<ul>         ul 객체          HTMLUListElement
```
※ 문서에서 객체의 메소드나 프로퍼티는 적절한 생성자를 찾아서 확인할 수 있다.

API의 관점에서 바라보면 DOM은 특정 플랫폼 상에서 특정 언어(C++, JAVA, Javascript등)을 통해 **프로그래밍 인터페이스(Programming Interface)를 구현한 API**를 의미하며, 구현된 API는 두 가지 형태로 나눌 수 있다.

+ 엔진 내부에 구현된 API
  - webkit 엔진은 C++ 언어를 통해 Programing Interface 를 구현한 API 를 사용한다.
  - DOM은 프로그래밍 언어와 독립적으로 디자인 되어 있어 문서의 구조적인 표현은 단일 API를 통해 이용가능며, DOM의 구현은 어떠한 언어에서도 가능하다.
+ DOM트리를 Javascript로 제어하기 위해 구현된 API(문서의 Element를 제어하기 위한 API)
  - 예를 들어 document.doumentElement객체는 HTMLHtmlElement 생성자 함수 객체로 생성된 객체이다.
  ```js
  document.documentElement;
  // <html lang=​"en">​<head>​…​</head>​<body screen_capture_injected=​"true" id=​"dummybodyid">​…​</body>​</html>​

  // 문서의 html을 가리키고 있다.

  document.documentElement.constructor;
  // ƒ HTMLHtmlElement() { [native code] }
  document.documentElement.__proto__ === HTMLHtmlElement.prototype
  // true
  ```
  - Element를 생성하기 위한 모든 생성자 함수 객체는 명시적으로 호출할 수 없으며, 프로토타입 객체의 속성에도 접근할 수 없다.
  ```js
  const divEl = new HTMLDivElement();
  // Uncaught TypeError: Illegal constructor

  HTMLHtmlElement.prototype.version;
  // Uncaught TypeError: Illegal invocation
  ```
  ※ `document.createElement`함수같이 암묵적으로 Element를 생성하는 방법을 사용해야 한다.
  ```js
  const divEl = document.createElement('div');
  divEl;
  // <div>​</div>​
  ```

### 1.1. 그 밖의 Web API들

+ [MDN - Web API 참조문서](https://developer.mozilla.org/en-US/docs/Web/API)  

브라우저가 제공하는 생성자들  
DOM API 외에도 [Geolocation](https://developer.mozilla.org/ko/docs/WebAPI/Using_geolocation), WebSocket 등 다양한 API가 있다.

## 2. DOM tree

> 브라우저는 웹 페이지를 로드할 때 해당 페이지에 대한 모델을 생성한다.  
이 모델을 DOM 트리라고 부르며, 이 모델은 브라우저의 메모리에 저장된다.

DOM 트리 생성 과정은 다음과 같다.

![바이트 → 문자 → 토큰 → 노드 → 객체모델](../asset/dom-full-process.png)
[출처: developers.google.com - 객체 모델 생성](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko)

+ 브라우저는 해당 문서의 원시 바이트 코드를 디스크나 네트워크에서 읽어와서, 해당 파일에 대해 지정된 인코딩(예: UTF-8)에 따라 원시 데이터인 문자열로 변환한다.
+ 어휘분석: 변환된 문자열을 의미 있는 문자(태그)로 분리해 지정된 [고유 토큰으로 변환한다.](http://w3c.github.io/html/syntax.html#tokenization)
+ 구문분석: 
  - 토큰을 식별한 후 노드(해당 속성 및 규칙을 정의하는 객체)로 변환한다.(토큰이 가진 tagName과 일치하는 HTMLElement를 생성 후 해당 속성을 추가시킨다.)
  - 부모 노드의 자식 노드로 생성된 HTMLElement를 추가 시켜 DOM 트리를 빌드한다

> [**트리**](https://helloworldjavascript.net/pages/282-data-structures#%ED%8A%B8%EB%A6%AC-tree)  
여러 데이터가 계층 구조 안에서 서로 연결된 형태를 나타낼 때 사용
> + 노드: 트리 안에 들어있는 각 항목
> + 뿌리노드(root node): 트리의 가장 상층부에 있는 노드
> + 잎노드: 자식 노드가 없는 노드
> + 부모노드: 바로 위의 노드(하나밖에 없다)
> + 조상노드: 부모 노드의 부모노드까지 모두
> + 자식노드: 바로 아래의 노드
> + 자손노드: 자식 노드의 자식노드까지 모두
> + 형제노드: 같은 부모를 갖는 다른 노드
>
> 계층 구조를 나타내기 위해, 또한 계층 구조를 통해 알고리즘의 효율을 높이고자 할 때 널리 사용된다.

### 2.1. 노드 유형과 인터페이스 상속관계

`<body>` 요소는 element(요소) 노드이자 HTMLBodyElement 인터페이스의 인스턴스이다.

| 인터페이스/생성자 | NodeType 상수 (값) | 예 |
| ------ | ------- | --- |
| Element, HTML Element | ELEMENT_NODE (1) | `<body>`,`<div>` |
| Text | TEXT_NODE (3) | 줄바꿈 공백을 포함한 문서 내 텍스트 문자 | 
| Comment | COMMENT_NODE (8) | `<!-- -->` |
| Document | DOCUMENT_NODE (9) | `window.document` |
| DocumentType | DOCUMENT_TYPE_NODE (10) | `<!DOCTYPE html>` |
| DocumentFragment | DOCUMENT_FRAGMENT_NODE (11) | `document.createDocumentFragment()` |

```js
document.nodeType;
// 9
document.body.nodeType
// 1
```

인터페이스 상속 관계
```
Object < EventTarget < Node < Document
Object < EventTarget < Node < Elemnet 
Object < EventTarget < Node < Elemnet < HTMElement < HTMLUListElement
Object < EventTarget < Node < Elemnet < SVGElement
Object < EventTarget < Node < CharacterData < Text, Comment, CDATASection
```

예를 들어 `HTML FORM element`가 `HTMLFormElement` interface로부터 `name` property 를 얻고, `className` property 는  `HTMLElement` interface 로부터 얻는다.  
즉, 두 property는 form object 안에 있다.
```js
const formEl = document.createElement('form');
formEl.setAttribute('class', 'form-el');
formEl.setAttribute('name', 'test-form');

formEl.name // "test-form"
formEl.className // "form-el"
```

많은 객체가 여러 개의 다른 인터페이스와 연관되어 있다.  
table 객체를 참조하게 되면, 기본적으로 3가지 interfaces를 사용할 수 있게 된다.
+ `HTMLTableElement` interface를 구현한 것이다. 
+ HTML Element이기도 하므로  `Element` interface도 구현하고 있다. 
+ HTML Element는 노드 트리에서 하나의 노드이다. 즉, `Node` interface도 구현하고 있다.

※ document 역시도 객체이다.  
HTMLDocument 생성자는(Document로부터 상속받은) DOM내에 DOCUMENT_NODE(예: window.document)를 생성한다. 
```js
document.__proto__
// HTMLDocument {constructor: ƒ, Symbol(Symbol.toStringTag): "HTMLDocument"}
```
보통 Document 및 HTMLDocument 생성자의 인스턴스는 HTML 문서를 로드 시 브라우저에 의해 만들어진다.

> `Document` 인터페이스는 모든 종류의 문서에 대한 공통 속성 및 메서드를 정의한다.  
문서 유형 (예 : HTML, XML, SVG, ...)에 따라 더 큰 API를 사용할 수 있다.  
"text / html"콘텐츠 유형으로 제공되는 HTML 문서는 `HTMLDocument` 인터페이스를 구현하지만 XML 및 SVG 문서는 `XMLDocument` 인터페이스를 구현한다.

## 3. 요소에 접근

### 3.1. DOM 쿼리(DOM Query)

DOM 트리에서 요소를 찾아내는 메소드들을 말한다.
(객체를 반환하는 메소드는 해당 객체가 없으면 `null`을 반환한다.)

#### 3.1.1. 개별 요소를 리턴하는 메소드

+ [`document.querySelector()`](https://devdocs.io/dom/document/queryselector): DOM 객체를 처음 만나는 하나만 가져오고 싶을때 사용한다.
+ `document.getElementById()`: id 특성 값이 하나인 요소에 대한 요소 노드를 리턴

#### 3.1.2. NodeList 객체를 리턴하는 메소드

사용하는 메소드가 하나 이상의 노드를 리턴할 수 있다면 해당 메소드는 탐색 조건에 일치하는 노드가 하나뿐이더라도 항상 노드의 컬렉션인 NodeList 객체를 리턴한다.

+ [`document.querySelectorAll()`](https://devdocs.io/dom/document/queryselectorall): 해당하는 모든 객체의 리스트를 가져오고 싶을 때
+ `document.getElementsByTagName()`: 태그의 이름만 인자로 전달해 문서 내에 해당하는 모든 요소를 찾는다.
+ `document.getElementsByClassName()`: 클래스 이름을 인자로 받아 문서 내에 해당하는 모든 요소를 찾는다.

##### [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList) 

NodeList 객체는 노드의 컬렉션이다(노드의 모음).  
유사배열이며 배열처럼 요소에 번호를 부여한다.

NodeList 객체에서 요소를 선택하는 방법은 두가지가 있다.
+ `item()`메소드
+ 배열과 같은 대괄호 표기법으로 인덱스 번호를 지정한다. 이쪽이 더 보편화된 방법이다.
```js
const list = document.querySelectorAll('li');

list.length; // 5
list.item(0); // <li>...</li>
list[0]; // <li>...</li>
```

NodeList 객체를 순회할 때는 `for ... of`루프나 `forEach()` 메소드를 사용할 수 있다.
```js
const list = document.querySelectorAll('input[type=checkbox]');
for (const item of list) {
  item.cheked = true;
}
```

##### 라이브 & 정적 컬렉션

+ 라이브 컬렉션은 DOM의 변경 사항을 실시간으로 컬렉션에 반환한다.
  - `getElementsBy~`로 시작하는 메소드나 `element.childNodes`등은 라이브 NodeList를 반환한다.
  - ttk
+ 정적 컬렉션은 DOM을 변경해도 컬렉션 내용에는 영향을 주지 않는다.
  - `document.querySelectorAll()`은 정적 NodeList를 반환한다.

```js
const ulEl = document.querySelector('ul');
const list1 = ulEl.querySelectorAll('li'); // NodeList(5)...
const list2 = ulEl.getElementsByTagName('li'); // NodeList(5)...

ulEl.appendChild(document.createElement('li'));
list1.length; // 5
list2.length; // 6
```

※ [HTMLCollection](https://developer.mozilla.org/ko/docs/Web/API/HTMLCollection)

##### 캐싱(Chaching)

DOM 트리를 여러번 조회하는 것을 방지하기 위해 변수에 저장하는 것.  
변수에 요소를 저장되는 것은 실제로는 DOM 트리 내에 요소(들)의 위치이다.  
이는 노드의 위치(location)이며 객체에 대한 참조(reference)라고 한다.

```js
const list = document.querySelectorAll('li');
```

접근하려는 노드를 발견하기까지 탐색할 노드의 수를 최소화하는 것이 좋다.  
`document`객체를 통해 호출된 메소드는 페이지 내의 모든 요소를 대상으로 탐색하게 된다.  
특정 노드의 자손 노드에서 탐색하기 위해 특정 요소를 통해 메소드를 호출할 수도 있다. (`elements.queryselector()`)
```js
const ulEl = document.querySelector('.menu-list');

ulEl.queryselectorall('li');
```

### 3.2. DOM 탐색(Traversing)

한 요소로부터 연관된 다른 요소로 이동한다.

+ `el.childNodes`: 자식 노드의 모음, NodeList 객체를 반환한다.
+ `el.firstChild`: 첫번째 자식 노드를 찾는다.
+ `el.lastChild`: 마지막 자식 노드를 찾는다
+ `el.previousSibling`: 이전 형제 노드를 찾는다.
+ `el.nextSibling`: 다음 형제 노드를 찾는다.
+ `el.parentNode`: 부모 노드를 찾는다.(텍스트 노드는 부모노드가 될 수 없으므로 요소 노드가 반환된다.)
+ `el.offsetParent`: (어떤 부모를 기준으로 잡았는가)static이 아닌 부모 노드를 찾는다.

요소 사이의 공백문자(빈 문자, 줄바꿈)를 텍스트 노드로 취급하기 때문에, 
자식 노드 또는 형제 노드는 브라우저에 따라 위 속성들이 리턴하는 값이 달라질 수 있다.  
즉, 텍스트 노드가 반환될 수도 있다.

### 3.3. 추가된 메소드

+ [`el.closets(selector)`](https://devdocs.io/dom/element/closest): 셀렉터가 일치하는 엘리먼트 객체의 가장 가까운 조상 노드를 반환한다. 
+ [`el.matches(selector)`](https://devdocs.io/dom/element/matches): 엘리턴트 객체가 주어진 셀렉터 문자열로 선택이 가능하면 `true`를 반환하는데, 아니면 `false`를 반환한다.

## 4. 텍스트에 접근/변경

+ [`el.textContent`](https://devdocs.io/dom/node/textcontent): 자식 요소의 텍스트까지 포함한 텍스트를 가져오거나 요소의 내용(텍스트)을 변경할 수 있다.
```html
<div>Hello World</div>
<div class="main">Main</div>
```
```js
const divEl = document.querySelector('div');
divEl.textContent = '안녕 세상아';

const mainEl = document.querySelector('.main');
mainEl.textContent; // Main
mainEl.textContent = '메인';
```
결과
```html
<div>안녕 세상아</div>
<div class="main">메인</div>
```

## 5. HTML 콘텐츠 추가/제거

### 5.1. innerHTML 속성과 XSS

+ [`el.innerHTML`](https://devdocs.io/dom/element/innerhtml): innerHTML은 HTML 콘텐츠를 추가/제거한다.
```js
const html = '<a href="https://google.com">구글</a>';

const divEl = document.querySelector('div');
divEl.textContent = html;

const mainEl = document.querySelector('.main');
mainEl.innerHTML = html;
```
```html
<div>&lt;a href="https://google.com">구글&gt;&lt;/a&gt;</div>
<div class="main"><a href="https://google.com">구글</a></div>
```

`innerHTML`은 다음과 같은 이유로 쓰지 않는 것이 좋다.
```js
const html = '<script>// 악성코드...</script>';

const mainEl = document.querySelector('.main');
mainEl.innerHTML = html;
```
사용자로부터 입력받은 텍스트(콘텐츠)를 innerHTML로 대입하는 것은 자살행위이다.  
(※ 사용자로부터 입력받은 텍스트를 넣는 경우는 반드시 `el.textContent`를 사용하자.)

#### 5.1.1. [Cross-site Scripting(XSS)](https://www.estsecurity.com/securityCenter/commonSense/view/27)

> 취약한 동적 웹페이지에 악의적인 코드를 게시하여 다른 사용자의 PC에서 악성코드가 실행되게 하는 공격 수법을 크로스 사이트 스크립팅(XSS: Cross Site Scripting)이라고 한다.

웹사이트는 사용자로부터 다양한 콘텐츠를 제공받는다. 이때 제공받는 완전히 통제할 수 없는 데이터들(신뢰할 수 없는 데이터(untructed data))을 다룰 때는 최대한 주의를 기울여야한다.

+ 여러 사람이 게시판에 글을 올릴 수 있다.
+ 페이스북, 트위터, 뉴스 알림이나 기타 다른 피드 등 서드파티 서비스를 통해 데이터가 전달될 수 있다.
+ 이미지, 비디오 같은 파일의 업로드가 가능하다.

##### 발생할 수 있는 공격

+ DOM트리, 폼 데이터에 접근
+ 웹사이트의 쿠키에 접근
+ 사이트에 로그인시 사용자를 식별하기 위해 만들어지는 세션 토큰에 접근

이러한 접근을 통해 악의적인 글을 게시하거나, 개인 정보를 빼돌리거나, 의도치 않은 사이트로 리다이렉트 시키거나, 사용자 권한을 탈취한다든지, 악성 코드를 퍼뜨리는 등의 일을 할 수 있다.

##### XXS 방지하기

+ 서버로 전달되는 모든 입력 데이터에 대한 유효성 검사(Validation)를 실시한다. 이때 유효성 검사는 반드시 브라우저 내에서 뿐만이 아니라 서버측에서도 실행되어야 한다.(사용자가 자바스크립트를 비활성화 할 수도 있기 때문)
+ 사용자 입력을 필터링 한다. (<,>,&,괄호)등의 불필요한 문자가 필요없는 곳은 입력하지 못하게 한다. 
+ 신뢰할 수 없는 곳에서 생성된 콘텐츠는 이스케이프 처리하여 코드가 아닌 문자로 표시되도록 한다.

> CMS(Content Management System, 콘텐츠 관리 시스템)들은 HTML 편집기를 통해 제한적으로 코드의 사용을 허용하며, 악의적으로 보이는 마크업은 자동으로 수정하기도 한다.

### 5.2 DOM 조작하기

DOM 노드를 생성한 뒤 DOM 트리에 추가하거나 제거할 요소를 참조하여 DOM 트리로부터 제거하는 방식

#### 5.2.1. DOM 노드 생성하기

+ `document.createElement()`: 새로운 요소 노드를 생성한다.
+ `document.createTextNode()`: 새로운 텍스트 노드를 생성한다.
+ `el.cloneNode()`: 메소드를 호출한 요소의 복제된 노드를 반환한다.
  - 선택적으로 인수로 deep 여부를 boolean 값으로 넣을 수 있다. true를 넣으면 해당 노드의 children 까지 복제한다. (기본값은 true이다.)

만약 복제하거나 해당 메소드들로 새로 생성한 요소가 아니라 DOM 접근 메소드를 이용해 참조한 요소라면 DOM 트리 조작 메소드를 사용시 해당 요소가 추가되는 것이 아니라 위치가 이동한다.

#### 5.2.2. DOM 트리 조작하기

+ `el.appendChild()`: 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 추가한다.
  - `parentNode.appendChild(newNode)`
  -  만약 주어진 노드가 이미 문서에 존재하는 노드를 참조하고 있다면, 노드를 현재 위치에서 새로운 위치로 이동시킨다.
+ `el.insertBefore()`: 지정된 부모 노드의 자식 노드로 참조 노드 앞에 노드를 추가한다. 
  - `parentNode.insertBefore(newNode, referenceNode)`
  - 만약 참조노드가 null인 경우 새로운 노드는 자식 노드 리스트의 끝에 추가된다.
+ `el.replaceChild()`: 지정된 노드의 하나의 자식노드를 다른 노드와 바꾼다.
  - `parentNode.replaceChild(newChild, oldChild)`
  - 반환되는 노드는 replacedNode. 즉 oldChild이다.
+ `el.removeChild()`: DOM에서 해당 자식 노드를 제거하고 제거된 노드를 반환한다.
  - `node.removeChild(child)` 
  - 변수에 저장하면 제거된 노드에 대한 참조를 보유할 수 있다.

## 6. 엘리먼트 어트리뷰트 조작하기

+ `el.hasAttribute(name)`
+ `el.getAttribute(name)`
+ `el.setAttribute(name, value)`
+ `el.removeAttribute(name)`

## 7. 엘리먼트 클래스 조작하기

+ `el.classList`: 요소의 클래스 속성에 대한 라이브 [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) 컬렉션을 반환하며, read-only이다.
+ `el.classList.add(String[, String ...])`: 지정된 클래스 값을 추가한다. 이미 요소의 속성에 존재한다면 무시된다.
+ `el.classList.remove(String[, String ...])`: 지정된 클래스 값을 제거한다.
+ `el.toggle(String)`: 
  - 인수가 하나뿐일 때: 클래스 값을 토글하여 제거하면 false, 없으면 false반환 후 추가한 다음 true반환
  - 두번째 인수가 있을 때: 두번째 인수가 true로 평가되면 지정된 클래스 값을 추가, false로 평가되면 제거한다.
+ `el.classList.contains(String)`: 요소의 클래스 속성에 지정된 클래스 값이 있는지 확인한다.
+ `el.replace(oldClass, newClass)`

## 8. 인라인 스타일 조작하기

+ `el.style`

```js
const divEl = document.querySelector('div');

// style이라는 특별한 객체가 있고 
// 이 객체의 color 속성에 컬러를 대입하는 것으로 
// 스타일을 수정할 수 있다.
divEl.style.color = 'red';
// ※ style 객체의 속성은 하이픈이 아닌 카멜케이스로 써야한다.
divEl.style.backgroundColor = 'blue';

// 이렇게 작성할 수도 있다.
divEl.setAttribute('style', 'color: red; background-color: blue');
```
```html
<div style="color:red; background-color: blue">Hello World</div>
```
단, 스타일 관련 코드가 자바스크립트에 있는 것은 썩 좋은 방법이 아님, 스타일은 CSS에 있는 것이 좋다.
보통 이렇게 하기 보단 클래스 추가/제거하는 식으로 코딩한다.

## 9. 이벤트 리스너

+ `EventTarget.addEventListener(type, listener[, options | useCapture])`: 특정 사용자의 행동, 브라우저 동작 시에 함수를 실행하게 할 수 있다.
이벤트가 발생할 때 특정 함수(이벤트 리스너)를 실행하게 한다.
+ `EventTarget.removeEventListener(type, listener[, options | useCapture])`: 등록한 이벤트를 해제할 때 사용한다.
(해제할 일은 잘 없다, 간혹 쓰이긴 한다.)

```js
const divEl = document.querySelector('div');

function listener() {
  alert('마우스가 클릭되었습니다.');
}

// 등록 버튼을 누르면 이벤트를 등록하고
document.querySelector('.register').addEventListener('click', ()=> {
  divEl.addEventListener('click', listener);
});

// 해제 버튼을 누르면 이벤트를 해제한다.
document.querySelector('.unregister').addEventListener('click', () => {
  divEl.removeEventListener('click', listener);
});
```

## 10. dataset

+ `el.dataset`: HTML이나 DOM 요소의 커스텀 데이터 속성(data-*)에 대한 읽기와 쓰기 접근을 허용한다. dataset 속성은 읽을 수는 있지만 직접 쓸 수는 없다.

```
string = element.dataset.camelCasedName;
element.dataset.camelCasedName = string;

string = element.dataset[camelCasedName];
element.dataset[camelCasedName] = string;
```
```html
<div data-index="0" data-name="chichi" name="chichi"></div>
<!-- 데이터를 저장해놓고 쓰고 싶을때 -->
```
```js
const divEl = document.querySelector('div');

divEl.dataset.index; // 0
divEl.dataset.name; // chichi
divEl.getAttribute('data-name'); // chichi
```

name같은 속성은 특별한 기능이 있는데, data-*속성은 이런 html의 원래 기능은 우회하면서 데이터를 저장하고 싶을 때 사용한다. 라이브러리 만들 때 잘 사용한다.

## 11. 엘리먼트 크기 및 위치

+ [`el.getBoundingClientRect()`](https://devdocs.io/dom/element/getboundingclientrect): 어떤 엘리먼트의 크기, 포지션(화면에 대한 상대적인)을 반환한다.
+ `el.offsetHeight` / `el.offsetWidth`: 패딩, 보더를 포함한 높이, 넓이
+ `el.clientHeight` / `el.clientWidth`: 패딩 포함(보더 x)한 높이, 넓이
+ `el.scrollHeight` / `el.scrollWidth`: 스크롤 되는 전체 콘텐츠 크기
+ `el.offsetTop` / `el.offsetLeft`: 읽기 전용 속성. offsetParent 노드로부터 상대적인 거리를 반환
+ `el.scrollTop` / `el.scrollLeft`: 가져오거나 지정하는 속성. 스크롤된 콘텐츠의 픽셀 값(얼마나 스크롤 되었는지)을 반환
+ `el.clientTop` / `el.clientLeft`

```js
const aEl = document.querySelector('a[data-pjax="#js-repo-pjax-container"]')

aEl.getBoundingClientRect();
// DOMRect {x: 87.5625, y: 77, width: 101.75, height: 24, top: 77, …}

// bottom: 101
// height: 24
// left: 87.5625
// right: 189.3125
// top: 77
// width: 101.75
// x: 87.5625 
// y: 77
// x, y는 왼쪽 위 꼭지점 좌표임
```
※ 문서(document) 기준이 아니라 화면(view) 기준이기 때문에 스크롤될 경우 바뀌는 값이 생긴다.

---

사실 HTML 페이지에 접근하고 수정하는 것은 어떤 API를 사용하면 되는지 숙지하면 되는 것이지만 DOM 트리가 어떻게 생성되는 것이며 인터페이스가 어떤 것인지 좀 더 알고싶어서 정리해봤다. 
정리하면서 모두 이해한 것이 아니기 때문에 잘못된 정보가 있지 않을까 걱정이 된다.  
노드 유형이나, 인터페이스 관계를 보고 나니 더 머리 속이 복잡해져서 강사님이 왜 수업시간에 따로 설명하지 않으셨는지 알 것 같다.  

예를 들어 `document.querySelector('div')`로 접근해서 참조하는 객체는 HTML의 엘리먼트이면서 엘리먼트이고, 노드니까 그 인터페이스들의 속성과 메소드를 사용할 수 있다 정도로 알고 있어야할 것 같다.

---

# 관련 글

+ [MDN - DOM 소개](https://goo.gl/j5FHMA) 
+ [DOM(Document Object Model) 참고 글](http://mohwa.github.io/blog/architecture/2015/12/10/dom/)
+ [[WebKit] Parse a HTML document](http://haejung.egloos.com/v/1250745)
+ [객체모델생성](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko)
+ [W3C DOM Compatibility: DOM methods and properties specific to HTML elements](https://quirksmode.org/dom/html/)