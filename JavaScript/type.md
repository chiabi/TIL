# 1. 타입

자바스크립트의 내장 타입(Built-in types)
- primitive value(원시 값)
  - string
  - number
  - boolean
  - undefined
  - null
  - symbol
- object

## 'typeof'로 체크할 때 주의할 점

null은 'falsy'이며, `typeof`체크에서 `'object'`가 나오는 유일한 원시 값이다.
```js
typeof null;
// 'object'

// 값이 null인지 확인하기 위해서 다음과 같이 쓸 수 있다.
const a = null;
!a && (typeof a === 'object') // true
```

함수는 `typeof` 체크시 `'function'`이 나오지만 실제로는 Object의 하위 타입이기 때문에, `length`나 `name`같은 프로퍼티를 가지고 있다. 
```js
function a(b, c) {}
a.length;  // 2
```

자바스크립트는 '타입을 강제'(Type Enforcement)하지 않으며, 변수는 어떤 형태의 값이라도 가질 수 있다.(`const`로 선언하지 않았다면 언제든 변수에 다른 타입의 값을 할당할 수 있다.)  
`typeof 변수`는 '변수의 타입'이 아니라 '변수에 들어있는 값의 타입'을 묻는 것과 같다. 

`typeof`연산자의 **반환값은 언제나 문자열**이다.

자바스크립트에서 'undefined(값이 없음)'와 'undefined(선언되지 않음(undeclared))'은 완전히 다른 개념이다.
```js
let a;

a; // undefined
c; 
// ReferenceError: c is not defined
// 이 에러의 의미는 값이 undefined가 아니라 
// c is not found, c is not declared라는 의미이다.
```

`typeof`는 'undefined(값이 없음)'와 'undefined(선언되지 않음(undeclared))' 둘 다 에러없이 `'undefined'`로 반환한다. 일종의 safety guard이다.
```js
let a; 

typeof a; // 'undefined'
typeof b; // 'undefined'
```

### 선언되지 않은 변수와 `typeof`의 safety guard 활용

이런 `typeof`의 safety guard는 여러 스크립트 파일의 변수들이 전역 네임스페이스를 공유할 때 유용하다.

내장 API 기능을 체크할 때
```js
console.log(feature) 
// Uncaught ReferenceError: feature is not defined
if (typeof feature === 'undefined') {
  feature = function() {}
}
```
단, 이때 `feature` 선언문에 `var`키워드를 사용하지 않는다.  
`var`키워드로 선언하면 호이스팅이 일어난다.
```js
// 여기서 선언된 것과 같다. var feature;
console.log(feature) // 'undefined'
// feature가 최상위로 호이스팅된다. 
if (typeof feature === 'undefined') {
  var feature = function() {}
}
```

※ `typeof`를 사용하지 않고 전역변수를 체크하는 방법으로 전역변수가 모두 전역객체의 프로퍼티라는 점을 이용해 `window`같은 전역객체를 사용하는 방법이 있지만, `global`을 전역객체로 가지고 있는 node.js같이 `window`가 전역객체가 아닌 자바스크립트 런타임도 있기 때문에 사용하지 않는 것이 좋다.
```js
if(!window.feature) {
  feature = function() {}
}
// ReferenceError가 발생하지 않는다. 
// 이 방법은 사용하지 않는 것이 좋다.

// node.js 실행환경에서는 
// 'ReferenceError: window is not defined'라는 에러가 발생한다.
```

`typeof`의 safety guard는 다른 사람이 내가 만든 프로그램이나 모듈을 가져다 쓸 때, 특정 변수를 변수가 선언되어 있는지 아닌지 여부를 체크한다고 가정했을 때, 다음과 같이 사용할 수 있다.
```js
(function(){
  const feature = () => {
    // ...
  }

  const doSomething = () => {
    const helper = (typeof feature !== 'undefined') ? 
      feature : 
      function() { /* ... */ };
    const val = helper();
  }
}());
```

위와 같은 사용법보다 '의존성 주입'(Dependency Injection) 설계 패턴을 더 선호하는 개발자도 있다.
```js
// 의존성이 명시적으로 전달된다.
const doSomething = (feature) => {
  const helper = feature || function() {/* ... */}
  const val = helper();
}
```

---

※ 네임스페이스는 전역변수를 하나로 최소화해서 변수가 겹칠 우려를 최소화하는 방법이다.
+ 싱글턴 패턴
  ```js
  const namespace = {
    x: 'local',
    y: function() {
      console.log(this.x);
    }
  }
  // 변수 x와 함수 y의 접근은 namespace를 통해서만 가능하다.
  namespace.y(); // 'local'

  // 단, x의 값은 다음과 같은 방법으로 의도적으로 접근해 수정할 수 있다.
  namespace.x = 'modified';
  namespace.y(); // 'modified'
  ```
+ IIFE(즉시 호출 함수 표현식)을 이용해 비공개 변수를 만드는 방법
  ```js
  const namespace = (function(){
    const x = 'local';
    const y = () => {
      console.log(x);
    }
    // y 함수만 공개하고 x는 비공개 변수가 된다.
    return {y} // {y: y}와 같다.
  }());

  namespace.y() // 'local'
  namespace.x = 'modified';
  namespace.y(); // 'local'
  ```