# 1. 함수형 길들이기

> 함수형 프로그래밍(루이스 아텐시오 저) Chapter 1의 내용을 정리한 문서입니다.

Chapter 1의 목차
- 함수형 프로그래밍은 과연 유용한가?
- 함수형 프로그래밍이란
- 함수형 프로그래밍의 좋은 점

함수형 프로그래밍의 정의와 필요성 그리고 함수형 프로그래밍의 기반이 되는 불변성과 순수함수의 원리를 살펴봅니다. 

개발을 하면서 직면하는 문제들을 객체지향 설계 방식으로 해결할 수도 있지만, 자바스크립트는 동적인 언어라서 조금만 시간이 지나도 복잡해지면서 가독성이 떨어지고 관리하기 어려운 코드가 됩니다.

> 자바스크립트는 동적 타입(dynamic typed)언어 입니다. 컴파일 타임(complie time)에 타입을 검사하는 정적 타입 언어(static type language)와 달리 컴파일에 시간을 들이지 않고, 동적 타이핑(dynamic typing)을 수행합니다. 만약 `"3" + 5`같은 표현식을 만날 경우 정적 타입의 언어에서는 타입 에러가 일어나겠지만, 자바스크립트에서는 보다 유연하게 타입 강제 변환(type coercion, 암묵적 타입 강제 변환)이 일어나 `"35"`라는 결과를 출력할 것입니다. 자바스크립트만으로는 타입 안정성을 보장하지 않습니다. 이는 변수에 어떤 타입의 언어가 들어갈 지 예측하기 어려워지게 합니다. 코드 규모가 커질수록 이러한 혼란은 더 커지겠죠. 이러한 부분을 보완하기 위해 [Flow](https://flow.org/) 같은 정적 타입도구나 자바스크립트의 슈퍼셋이라는 [타입스크립트](https://www.typescriptlang.org/index.html)가 나왔습니다.

## 1.1. 함수형 프로그래밍은 과연 유용한가? 

함수형으로 사고하는 것은 왜 중요할까요? 함수형이 자바스크립트 프로그램의 복잡성을 해결하는 데 어떤 도움을 줄 수 있다는 걸까요?

함수형 사고방식은 자바스크립트만의 매우 표현적인 특성을 가다듬어, 깔끔하면서 모듈적인, 테스트하기 좋고, 간결한 코드를 작성하는 데 도움이 됩니다.
자바스크립트 코드를 함수형으로 작성하면, 코드가 복잡해지더라도 헤아리기 쉬운 방향으로 작성할 수 있습니다.

## 1.2. 함수형 프로그래밍이란? 

함수형 프로그래밍이란 프레임워크나 어떤 특정한 도구가 아니라, 객체지향 관점에서 해왔던 것과는 다른 사고로 코드를 작성하는 방법입니다.  
간결하게 정의하자면 함수 사용을 강조하는 소프트웨어 개발 스타일입니다.  

함수형 프로그래밍의 목표는 애플리케이션의 
- 부수효과(side effect)를 방지하고
- 상태 변이(mutation of state)를 감소하기 위해
- 데이터의 제어 흐름과 연산을 추상(abstract)하는 것입니다.

다음의 예제를 메시지를 동적으로 표현할 수 있고, 내용이나 형식을 바꾸거나, 타킷 요소를 달리하도록 표현식을 다시 작성해 봅시다.
```js
document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>';
```

다음과 같이 달라지는 부분을 매개변수로 받는 함수를 만들어 재사용성을 높일 수 있겠네요.
```js
function printMessage(elementId, format, message) {
  document.querySelector(
    `#${elementId}`
  ).innerHTML = `<${format}>${message}</${format}>`;
}

printMessage("msg", "h1", "Hello World");
```

하지만 아직 완벽하게 재사용 가능한 코드는 아닙니다.  
다음과 같이 함수를 매개변수화 하고, 여러 함수를 합성하고 평가해 더 많은 기능을 할 수 있도록 조합할 수 있게 해 봅시다.  
이를 돕기위해 `ramda`라는 함수형 자바스크립트 라이브러리에서 `compose`라는 마법의 함수를 빌려왔습니다.  
```js
import R from 'ramda';
const run = R.compose;

const addToDom = selector => str =>
  (document.querySelector(`#${selector}`).innerHTML = str);
const h1 = str => `<h1>${str}</h1>`;
const echo = str => str;

const printMessage = run(addToDom("msg"), h1, echo);
printMessage("Hello World");
```
`run`함수는 `addToDom`, `h1`, `echo` 세 함수를 체인처럼 연결해 한 함수의 반환값이 다른 함수의 입력값으로 전달 되도록 합니다. 
- `echo`가 문자열을 반환하면
- `h1`으로 전달되고 이 함수의 결과값이 
- `addToDom`으로 전달됩니다.

함수형 코드는 본연의 기능을 그대로 간직한 채 코드를 쉽게 변경하기 위해 코드 자체를 매개변수화 합니다. 코드를 재사용성과 믿음성(reliability)이 좋고 이해하기 쉬운, 더 작은 조각들로 나누어 더 헤아리기 쉬운 형태의 프로그램으로 다시 조합합니다. 이런 방법은 내부 로직을 수정하지 않고, 기능을 추가할 수 있습니다.

다음은 printMessage가 메시지를 2회 출력하는데 h2요소를 사용하고 DOM 대신 콘솔에 출력하게 합니다.
```js
import R from 'ramda';
const run = R.compose;

const addToDom = selector => str =>
  (document.querySelector(`#${selector}`).innerHTML = str);
const h1 = str => `<h1>${str}</h1>`;
const h2 = str => `<h2>${str}</h2>`;
const echo = str => str;
const repeat = count => str => str.repeat(count);

const printMessage = run(console.log, repeat(2), h2, echo);
printMessage("Get Functional");
```

- [예제](https://codesandbox.io/s/vmnrr9lr5y)
- [ramda - compose](https://ramdajs.com/docs/#compose)
- [교재에서 예제의 임시 함수 run](https://gist.github.com/luijar/ce6b96f13e31cb153093#file-ch01-magic-run-js)

함수형 프로그래밍을 온전히 이해하기 위해서는 그 이면에 깔린 기본 개념들을 숙지해야 합니다.
- 선언적 프로그래밍
- 순수함수
- 참조 투명성
- 불변성

위 개념들을 하나씩 살펴봅시다.

### 1.2.1. 선언적 프로그래밍

함수형 프로그래밍은 큰 틀에서 선언적(declarative) 프로그래밍 패러다임에 속합니다.  

[명령형(또는 절차적) 프로그래밍](https://ko.wikipedia.org/wiki/%EB%AA%85%EB%A0%B9%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)은 어떤 결과를 내기 위해 시스템의 상태를 변경하는 구문을 위에서 아래로 죽 늘어놓습니다.  

다음의 예제는 단순히 컴퓨터가 수행할 명령들을 순서대로 나열했습니다. for문을 이용해서 전역적인 상태까지 있네요.
```js
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 컴퓨터야 루프를 반복하면서 각 숫자의 제곱수를 계산해라
for (let i = 0; i < array.length; i++) {
  array[i] = Math.pow(array[i], 2);
}

array; // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

함수형으로 접근하여 개발자는 각 요소를 올바르게 작동시키는 일에만 전념하고 루프 제어는 시스템의 다른 파트에 일임합니다.  
루프 카운터를 관리하고 배열 인덱스에 정확하게 접근하는 일은 그 일을 추상화 한 `Array`의 `map` 메소드한테 떠넘겨 버렸습니다.  

for문이 사라지니 변화하는 전역 상태도 없어졌네요.
```js
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => Math.pow(num, 2));

// [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

선언적 프로그래밍은 제어흐름이나 상태 변화를 특정하지 않고도 프로그램 로직이 무엇인지 표현식으로 나타냅니다.  
컴퓨터에게 원하는 작업을 **어떻게** 하는지 상세히 이르는 명령형 프로그래밍과 달리, 내부 매커니즘을 추상화한 함수를 이용해 **무엇을** 할 것인가(결과가 무엇이 나와야 하는가)에 중점을 둡니다. 내부에서 어떻게 코드가 구현되었는지는 고려하지 않아도 됩니다.

`map`, `reduce`, `filter`같은 일급 고계함수를 이용해 재상용성 확장성이 우수한 선언적 코드로 대체합니다. for문 같은 루프는 재사용하기 어렵고 다른 연산에 끼워 넣기도 어려운 명령형 제어 구조물입니다. 그리고 반복할 때마다 값이나 상태가 계속 바뀝니다.  

함수형은 **무상태성**과 **불변성**을 지향합니다. 전역 상태를 바꾸는 식의 혼선을 일으킬 가능성이 없습니다. 이렇게 변경될 가능성이 있는 상태를 두지 않으려면 **순수함수**를 사용해야 합니다.

- [람다, 익명 함수, 클로저](https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/)

### 1.2.2. 순수함수(pure function)와 부수효과(side effect)

함수형 프로그래밍은 순수함수로 구성된 불면 프로그램 구척을 전제로 합니다.

**순수함수의 특성**
- 주어진 입력에만 의존합니다.
  - 평가 도중 또는 호출 간 변경될 수 있는 숨겨진 값이나 외부 상태와 무관하게 작동합니다.
- 함수 스코프 밖에서 어떠한 변경도 일으키지 않습니다.
  - 전역 객체나 레퍼런스로 전달된 매개변수를 수정하지 않습니다.

명령형 프로그래밍에서는 변수가 한 구문에서 다른 구문으로 옮겨지면 그 값이 변합니다.
   
외부 자원을 상대로 데이터를 읽고 쓰는 다음과 같은 함수는 부수효과를 동반합니다.
```js
let counter = 0;
function increment() {
  // 스코프 밖의 전역 변수 counter를 읽고 수정합니다.
  return ++couter;
}
```

**부수효과를 발생하는 상황**
- 전역 범위에서 변수, 속성, 자료구조를 변경
- 함수의 원래 인수 값을 변경
- 사용자 입력을 처리
- 예외를 일으킨 해당 함수가 붙잡지 않고(catch) 그대로 예외를 던짐(throw)
- 화면 또는 로그 파일에 출력
- HTML 문서, 브라우저 쿠키, DB에 질의

```js
const numbers = [1, 20, 10, 100, 80, 30];
const orderByAsc = (arr) => arr.sort((a, b) => a - b);
orderByAsc(numbers); // 인수로 넘긴 numbers도 변경되어버렸네요.
```

함수형 프로그래밍은 위와 같은 모든 불순한 상황(상태 변이)를 근절하자는 것은 아닙니다. 상태 변이를 줄이고 관리할 수 있는 프레임워크를 제공해 순수/불순 함수를 구분하자는 겁니다.

다음은 부수효과를 일으키는 명령형 showStudent 함수입니다.
- [예제](https://codesandbox.io/s/vmnrr9lr5y)
```js
function showStudent(ssn) {
  let student = db.find(ssn);
  if(student !== null) {
    document.querySelector(`#${elementId}`).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
  } else {
    throw new Error('학생을 찾을 수 없습니다!');
  }
}

showStudent('444-44-4444');
```
### 1.2.3. 참조 투명성과 치환성
### 1.2.4. 불변 데이터 유지하기

## 1.3. 함수형 프로그래밍의 좋은 점


- [[번역] 두려움, 믿음, 그리고 자바스크립트 - 언제 타입 시스템과 함수형 프로그래밍이 먹히지 않는가](https://adhrinae.github.io/posts/fear-trust-and-javascript-kr)
- [[번역] 반응형 프로그래밍과 RxJS 이해하기](https://hyunseob.github.io/2016/10/09/understanding-reactive-programming-and-rxjs/)