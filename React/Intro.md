# React

+ 사용자 인터페이스를 설계할 때 사용하는 라이브러리
+ MVC의 V를 담당
+ 시간이 지남에 따라 변하는 데이터를 기반으로 하는 대규모 애플리케이션을 만들때 발생하는 여러 문제를 해결하기 위해 탄생

--- 

## Why did we build React?

(June 05, 2013 by Pete Hunt)

※ 의역 / 오역 주의. 오픈소스로 제작되기 시작한 2013년에 작성된 굉장히 초창기의 문서이므로 현재 리액트의 핵심 기능과 설명이 다를 수 있음

+ [원문: Why did we build React?](https://reactjs.org/blog/2013/06/05/why-react.html)

자바스크립트 MVC 프레임워크는 많다. 왜 우리는 React룰 만들었고, React를 사용하려 할까?

### React는 MVC 프레임워크가 아니다.

React는 합성 가능한 사용자 인터페이스를 구축하기위한 라이브러리이다. 시간이 지남에 따라 변경되는 데이터를 표시하는 재사용가능한 UI 컴포넌트를 만들 것을 권장한다.

### React는 템플릿을 사용하지 않는다.

일반적으로 웹 애플리케이션 UI는 템플릿 또는 HTML 지시문을 사용해 작성된다. 이러한 템플릿에는 UI를 작성하는데 사용할 수 있는 추상화 집합이 지정되어 있다.

React는 사용자 인터페이스를 구성요소로 분해하여 다르게 구축하는 방식으로 접근한다. 이는 React가 실제로 완전한 기능을 갖춘 프로그래밍 언어를 사용해 view를 렌더링하며, 몇가지 이유로 템플릿보다 유리해보임을 의미한다.

+ 자바스크립트는 추상화 기능을 갖춘 유연하고 강력한 프로그래밍 언어이다. 이것은 대규모 애플리케이션에서 매우 중요하다.
+ 마크업을 해당 뷰 로직에 통합함으로써 React는 실제로 뷰를 확장하고 유지보수하기 쉽게 만든다.
+ 자바스크립트로 마크업과 콘텐츠를 분해해 이해하므로, 문자열을 연결하는 조작이 없어, 표면적으로 XSS 취약점이 줄어든다.

우리는 날것의 자바스크립트보다 읽기 쉬운 HTML을 사용할 수 있도록 선택적 구문 확장인 [JSX](https://reactjs.org/docs/jsx-in-depth.html)도 만들었다. 

### 리액티브 업데이트가 간단하다.

React는 시간이 지남에 따라 데이터가 변할 때 실제로 빛을 발한다.

전통적인 자바스크립트 애플리케이션에서는 어떤 데이터가 변경되었는지 알아야하고, 최신 상태로 유지하기 위해 필수적으로 DOM을 변경해야 한다. 디렉티브와 데이터 바인딩을 통해 선언적 인터페이스를 제공하는 AngularJS(초기버전)조차도 [수동으로 DOM 노드를 업데이트 하는 연결 기능이 필요하다.](https://code.angularjs.org/1.0.8/docs/guide/directive#reasonsbehindthecompilelinkseparation)(초기버전인 AngularJS에 대한 설명이므로 현재 상용되는 버전 내용과 다를 수 있음)

React는 다른 접근 방식을 취한다.

컴포넌트가 처음 초기화되면, `render` 메서드가 호출되어, 간단한 view를 표현을 생성한다. 이 표현에서 마크업 문자열이 생성되어 문서에 삽입된다. 데이터가 변경될 때, `render` 메서드는 다시 호출된다. 최대한 효율적으로 업데이트를 수행하기 위해, 이전 `render` 호출에서 반환한 값과 새로운 값을 비교해, DOM에 적용할 최소한의 변경 집합을 생성한다.

`render`에서 반환 된 데이터는 문자열도 DOM 노드도 아니다. DOM의 모양을 나타내는 간단한 설명이다.

우리는 이러한 과정을 조정(reconciliation)이라고 부른다. ~~이 [jsFiddle](http://jsfiddle.net/2h6th4ju/)에서 실제 조정 액션의 예를 확인하라.~~

이 재 렌더링은 매우 빠르기 때문에(TodoMVC의 경우 약 1ms) 개발자는 명시적으로 데이터 바인딩을 지정할 필요가 없다. 이 접근법으로 앱을 더 쉽게 ​​만들 수 있다.

### HTML은 시작에 불과하다. 

React는 문서의 가벼운 표현을 가지고 있기 때문에, 그걸로 멋진 것들을 할 수 있다.

+ 페이스북은 HTML 대신 `<canvas>`로 렌더링 되는 동적 차트가 있다.
+ 인스타그램은 전체적으로 React와 `Backbone.Router`로 만들어진 single page 웹 앱이다. 디자이너는 종종 JSX로 React 코드에 기여할 수 있다.
+ 우리는 web worker에서 React 앱을 실행하고 React를 사용해 Objective-C 브릿지를 통해 네이티브 IOS 뷰를 구동하는 내부 프로토 타입을 만들었다.
+ SEO, 퍼포먼스, 코드 공유 및 전반적인 유연성을 위해 서버에서 React를 실행할 수 있다.([react-server-rendering-example](https://github.com/petehunt/react-server-rendering-example)로 링크가 걸려있는데 5년 전을 마지막으로 관리되지는 않음)
+ 이벤트는 모든 브라우저(IE8 포함)에서 일관되고 표준을 준수한 방식으로 동작하며, 자동으로 [이벤트 위임(event delegation)](http://davidwalsh.name/event-delegate)을 사용한다.

우리가 만든 것을 확인하려면 [https://reactjs.org](https://reactjs.org)로  넘어가라. 우리의 문서는 프레임워크를 사용해 앱을 구축하는 쪽으로 되어있지만, 너트와 볼트에 관심이 있다면 [우리에게 연락하라!(: Where To Get Support)](https://reactjs.org/community/support.html)(React에 대해 더 궁금하다면 이라는 의미인듯)