# Next.js

> React Applications Made Simple  
Next.js is a lightweight framework for static and server‑rendered applications.

Next.js는 리액트 애플리케이션을 간단하게 만들도록 도와주며, 정적 및 서버 렌더링 애플리케이션을 위한 가벼운 프레임워크이다.

## FAQ

Next.js를 이해하기 위해 [FAQ](https://nextjs.org/docs/#faq)를 먼저 번역해보기로 했다.(의역 / 오역 주의)

Next.js를 사용해보면서 해당 번역 중 이해되지 않았던 부분은 수정해야 겠다.

### 생산을 위해 준비된 상태인가?

Next.js는 개시 이후 https://zeit.co를 강화해왔다. 개발자의 경험과 최종 사용자 퍼포먼스에 대해 매우 만족스러워 커뮤니티와 공유하기로 결정했다. 

### 얼마나 큰가? 

클라이언트 사이드 번들의 크기는 앱 별로 측정해야 한다. 작은 Next 메인 번들은 약 65kb gzipped이다.

### `create-react-app`와 같은가?

Next.js와 `create-react-app`은 둘다 당신의 삶을 쉽게 만들어 준다는 점에서 Yes라고 할 수 있다.  
다음과 같이 Next.js가 더 진보된 것을 할 수 있도록 구조를 강제한다는 점에서는 No라고 할 수 있다.
+ 서버 사이드 렌더링(Sever side rendering)
+ 자동 코드 스플릿(Automatic code splitting)

또한 Next.js는 모든 싱글 웹사이트(single website)에 중요한 두 가지 내장된 기능을 제공한다.
+ lazy 컴포넌트 로딩을 포함한 라우팅: <Link> (by importing next/link)
+ `<head>`를 변경하는 컴포넌트 방법: <Head> (by importing next/head)

Next.js 앱이나 다른 리액트 애플리케이션에 포함할 수 있는 재사용 가능한 리액트 컴포넌트를 만들고 싶다면, `create-react-app`을 사용하는 것이 좋다. 나중에 `import`할 수 있고 코드베이스를 깨끗하게 유지할 수 있다.

### CSS-in-JS 방법을 사용하려면 어떻게 해야하나?

Next.js는 scoped css를 지원하는 styled-jsx 번들을 제공한다. 그러나 앞서 언급한 것처럼 당신이 좋아하는 라이브러리를 당신의 Next 앱에 포함시켜 다른 CSS-in-JS 방법을 사용할 수 있다.

### 어떤 구문적 특징(syntatic features)이 트랜스파일 되나? 어떻게 변경하나?

우리는 V8을 추적한다. V8은 ES6와 `async`, `await`를 광범위하게 지원하고 있기 때문에 우리는 그것들을 트랜스파일한다. V8은 class decorator를 지원하지 않으므로 우리는 그것을 트랜스파일하지 않는다.

### 왜 새로운 라우터인가?

Next.js는 다음과 같이 특별하다.
- 사전에 경로(Routes)를 알 필요가 없다.
- 경로는 항상 지연 로드할 수 있다.
- 최상위 컴포넌트는 (서버 렌더링 또는 지연로드 중일 때) 라우트의 로딩을 차단하는 `getInitialProps`를 정의할 수 있다.

결과적으로, 두 가지로 구성된 매우 단순한 라우팅 방식을 도입할 수 있었다.
- 모든 최상위 컴포넌트는 `url`객체를 받아 URL을 검사하거나 history를 수정한다.
- `<Link>` 컴포넌트는 클라이언트 측 전환을 수행하는 anchor (`<a/>`)와 같은 요소를 래핑하는데 사용된다.

우리는 몇가지 흥미로운 시나리오를 통해 라우팅의 유연성을 테스트했다. 예는 [nextgram](https://github.com/zeit/nextgram)을 확인하라

### 어떻게 사용자 지정 경로를 정의하는가?

우리는 요청 처리기(request handler)를 제공해 임의의 URL과 다른 컴포넌트 간의 매핑 기능을 [추가했다.](https://nextjs.org/docs/#custom-server-and-routing)

클라이언트 사이드에서는, 가져오는(fetches) URL과 다르게 URL을 데코레이트하는(decorates) `<Link>`위 `as`를 호출하는 매개변수가 있다.(이부분 번역...모르겠음)

### 어떻게 데이터를 fetch 하는가?

당신에게 달려있다. `getInitialProps`는 `async`함수(또는 `Promise`를 반환하는 일반 함수)이다. 어디서든 데이터를 검색할 수 있다. 

### GraphQL가 함께 사용할 수 있는가?

[Apollo 예제](https://github.com/zeit/next.js/tree/canary/examples/with-apollo)

### 리덕스와 함께 사용할 수 있는가?

[리덕스 사용 예제](https://github.com/zeit/next.js/tree/canary/examples/with-redux)

### 개발 서버에서 정적 내보내기를 위한 라우트에 접근할 수 없는 이유는 무엇인가?

이것은 Next.js의 아키텍쳐와 관련해 알려진 이슈이다. 프레임워크에 해당 이슈에 대한 솔루션이 구축 될때까지는 이 [예제 솔루션(Centralizing Routing)](https://github.com/zeit/next.js/wiki/Centralizing-Routing)을 살펴보고 라우팅을 중앙 집중화하시오.

### 내가 좋아하는 자바스크립트 라이브러리나 툴킷을 함께 사용할 수 있는가?

첫 릴리즈 이후 많은 예제 컨트리뷰션이 있었다. [exmamples](https://github.com/zeit/next.js/tree/canary/examples) 디렉토리에서 확인할 수 있다.

### Next.js는 어디에서 영감을 얻었는가?

우리가 달성하기 위해 설정한 많은 목표는 Guillermo Rauch의 [Rich Web Applications의 7가지 원칙](http://rauchg.com/2014/7-principles-of-rich-web-applications/)에 나열된 것이다.

PHP의 사용 용이성은 큰 영감이 되었다. 우리는 Next.js가 PHP를 사용해 HTML을 출력하는 많은 시나리오에 대한 적절한 대체품이라고 생각한다.

PHP와 달리 ES6 모듈 시스템의 이점을 누리며 모든 파일은 지연 평가 또는 테스팅을 위해 쉽게 import할 수 있는 컴포넌트나 함수로 내보내진다. 

우리가 많은 단계를 거치지 않은 서버 렌더링 리액트에 대한 옵션들을 연구하면서, 우리는 Next.js와 유사한 접근 방식인 React의 제작자, Jordan Walke의 [react-page(지금은 depreacted됨)](https://github.com/facebookarchive/react-page)를 만났다.

