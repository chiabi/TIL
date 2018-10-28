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
(서술부(description)와 평가부(evaluation)를 분리합니다.)  
컴퓨터에게 원하는 작업을 **어떻게** 하는지 상세히 이르는 명령형 프로그래밍과 달리, 내부 매커니즘을 추상화한 함수를 이용해 **무엇을** 할 것인가(결과가 무엇이 나와야 하는가)에 중점을 둡니다. 내부에서 어떻게 코드가 구현되었는지는 고려하지 않아도 됩니다.

`map`, `reduce`, `filter`같은 일급 고계함수를 이용해 재상용성 확장성이 우수한 선언적 코드로 대체합니다. for문 같은 루프는 재사용하기 어렵고 다른 연산에 끼워 넣기도 어려운 명령형 제어 구조물입니다. 그리고 반복할 때마다 값이나 상태가 계속 바뀝니다.  

함수형은 **무상태성**과 **불변성**을 지향합니다. 전역 상태를 바꾸는 식의 혼선을 일으킬 가능성이 없습니다. 이렇게 변경될 가능성이 있는 상태를 두지 않으려면 **순수함수**를 사용해야 합니다.

- [람다, 익명 함수, 클로저](https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/)

### 1.2.2. 순수함수(pure function)와 부수효과(side effect)

함수형 프로그래밍은 순수함수로 구성된 불변 프로그램 구축을 전제로 합니다.

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

함수형 프로그래밍은 위와 같은 모든 불순한 상황(상태 변이)를 근절하자는 것은 아닙니다. 상태 변이를 줄이고 관리할 수 있는 프레임워크를 제공해 순수/불순 함수를 구분하자는 겁니다.

다음은 외부 자원에 의존하며, 예외를 바로 던져버리는 부수효과를 일으키는 명령형 showStudent 함수입니다.
- [예제](https://codesandbox.io/s/m71xzl79m9)
```js
function showStudent(ssn) {
  // 변수 db를 통해 데이터에 접근하는데, 매개변수로 받지 않는 외부 변수입니다.
  // 이 변수가 실행 중 언제라도 null을 참조하거나 호출 단계마다 다른 값을 가리키면 결과값이 달라집니다.
  let student = db.find(ssn);
  if(student !== null) {
    // elementId 역시 언제라도 바뀔 수 있는 외부변수(이며 전역변수)입니다.
    // HTML 요소를 직접 수정합니다. HTML(DOM)은 그 자체로 가변적인, 전역 공유 자원입니다.
    document.querySelector(`#${elementId}`).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
  } else {
    // 학생 레코드를 찾지 못해 예외를 던지면 전체 프로그램의 스택이 풀리면서 종료되어 버립니다.
    throw new Error('학생을 찾을 수 없습니다!');
  }
}

showStudent('444-44-4444');
```

함수형으로 구현부를 개선해 봅시다.
- 긴 함수를 하나의 목적을 가진 짧은 함수로 각각 분리합니다.
- 함수가 해야 할 작업에 필요한 인수를 모두 명시해 부수효과 개수를 줄입시다.

다음은 `ramda`의 `curry` 함수를 빌려왔습니다. `curry`는 함수형 프로그래밍 기법인 **커링**을 구현한 함수입니다.  
커링이란 함수의 여러 인수를 부분적으로 나누어 세팅합니다.  
다음 예제에서 `find`와 `append` 두 함수는 커링을 통해 쉽게 조합해 실행 가능한 단항 함수로 나누어 집니다.  
```js
import { compose, curry } from "ramda";

const find = curry((db, id) => {
  let obj = db.find(id);
  if (obj === null) {
    throw new Error("객체를 찾을 수 없습니다.");
  }
  return obj;
});

const csv = student =>
  `${student.ssn}, ${student.firstname}, ${student.lastname}`;

const append = curry((selector, info) => {
  document.querySelector(selector).innerHTML = info;
});

const showStudent = compose(
  append("#app"),
  csv,
  find(db)
);

showStudent("444-44-4444");
```
개선 후에는 다음과 같은 장점이 있습니다.
- 재사용 가능한 컴포넌트가 3개로 나뉘어 코드가 유연해짐
- 잘게 나뉜 함수를 재사용하면 신경 써서 관리할 코드 크기가 줄어 생산성이 높아짐
- 프로그램이 해야 할 일들을 고수준에서 단계별로 명확하게 보여주는 선언적 스타일을 따라 코드 가독성이 향상됨
- HTML객체와 상호작용하는 부분을 자체 함수로 빼내어 순수하지 않은 로직을 순수함수에서 배제함

`find`함수가 일관된 반환값을 보장하도록 하여 전체 함수 결과를 예측 가능한 방향으로 유도했습니다.(참조 투명성(referentinal transparency)

`curry`가 어떤 함수인지 이해가 잘 되지 않는다면, [해당 문서의 사용 예](https://ramdajs.com/docs/#curry)를 본다면 보다 이해하기 쉬울 겁니다.
```js
// 원래 4개의 인수를 받는 함수를
var addFourNumbers = (a, b, c, d) => a + b + c + d;

// 다음과 같이 n항 또는 단항으로 찢어서 입맛대로 사용할 수 있다고 이해하면 쉬울 것 같네요.
var curriedAddFourNumbers = R.curry(addFourNumbers);
var f = curriedAddFourNumbers(1, 2);
var g = f(3);
g(4); //=> 10
```

### 1.2.3. 참조 투명성과 치환성

참조 투명성(등식 정합성)은 순수함수를 정의하는 좀 더 공식적인 방법입니다.
- 순수성(purity): 함수의 인수와 결과값 사이의 순수한 매핑 관계

**어떤 함수가 동일한 입력을 받았을 때 동일한 결과를 내면 이를 참조 투명한 함수라고 합니다.**

참조 투명한 함수를 만들기 위해서는 함수가 의존하는 상태(외부 변수)를 제거하고 함수 서명에 정규 매개변수로 명시해야 합니다.
```js
// 위에서 봤던 counter 함수가 이제는 같은 입력에 같은 결과(입력 값에 + 1)를 반환하는 안전한 함수가 되었네요.
const increment = counter => counter + 1;
```

**참조 투명한 함수는 코드를 테스트하기 쉽고 전체 로직을 파악하는 것도 쉽습니다.**
```js
import { compose } from 'ramda';

const run = compose;
const increment = counter => counter + 1;
const plus2 = run(increment, increment);
console.log(plus2(0)); // 항상 초기값을 2만큼 증가시킵니다.
```
이런 식으로 구축한 프로그램은 시스템의 상태를 머릿속으로 그려볼 수 있고 코드를 재작성하거나 치환하더라도 원하는 결과를 얻을 수 있어 헤아리기 쉽습니다.

참조 투명성 덕분에 체계적인, 거의 수학적인 형태로 프로그램을 헤아릴 수 있습니다.
```js
const input = [80, 90, 100];

const sum = (total, current) => total + current;
const total = arr => arr.reduce(sum);

const size = arr => arr.length;

const divide = (a, b) => a / b;
const average = arr => divide(total(arr), size(arr));
average(input) // 90
```

### 1.2.4. 불변 데이터 유지하기

불변 데이터는 한번 생성된 후에는 절대 바뀌지 않습니다.  
자바스크립트의 기본형(원시 자료형)은 원래 불변입니다. 그러나 배열 등의 객체는 불변이 아니어서 함수의 인수로 전달해도 원래 내용이 변경되어 부수효과가 발생될 수도 있습니다.

```js
const numbers = [1, 20, 10, 100, 80, 30];

const orderByAsc = (arr) => arr.sort((a, b) => a - b);
orderByAsc(numbers); // [1, 10, 20, 30, 80, 100]

console.log(numbers); // [1, 10, 20, 30, 80, 100]
// 인수로 넘긴 numbers도 변경되어버렸네요.
```
얼핏 보기에는 부수효과와 무관한 코드 같지만, Array.sort는 원본 레퍼런스가 가리키는 배열의 원소를 정렬하는 부수효과를 일으키는 메소드입니다.

**함수형 프로그래밍은, 외부에서 관찰 가능한 부수효과가 제거된 불변 프로그램을 작성하기 위해 순수함수를 선언적으로 평가하는 것입니다.**  

- 문제: 뚜렷한 체계 없는 분기 처리, 외부 공유 변수에 의존하는 덩치 큰 함수 과용
  - 추적/디버깅이 어려운 가변/전역 데이터를 공유하고 있습니다.
- 해결: 함수를 순수 연산의 관점에서 데이터를 절대 변경하지 않는 고정된 작업 단위(unit work)로 바라본다면 잠재적인 버그를 줄일 수 있습니다.

## 1.3. 함수형 프로그래밍의 좋은 점

함수형 프로그래밍은 지금까지 맞닥뜨린 여러 프로그래밍 난제를 전혀 다른 방식으로 접근/도전하게 유도하는 일대 패러다임의 전환입니다. 객체지향형 아키텍처와도 병용할 수 있습니다.

- 순수함수를 사용한 코드는 테스트, 유지보수가 더 쉬운 코드를 개발하는데 도움이 됩니다.
- 선언적으로 작성한 코드는 헤아리기 쉬워 전체 애플리케이션의 가독성 역시 향상됩니다. 
  - 함수와 람다 표현식을 조합해 깔끔하게 코딩할 수 있습니다.
- 여러 원소로 구성된 컬렉션 데이터는 `map`, `reduce`같은 연산을 함수 체인으로 연결해 물 흐르듯 매끄럽게 처리할 수 있습니다.
- 일급/고계함수 개념에 기반을 두어 함수를 기본적인 구성 요소로 취급합니다. 코드의 모듈성, 재사용성을 높입니다.
- 리액티브/함수형 프로그래밍을 융합하면 이벤트 기반 프로그램 특유의 복잡성을 줄일 수 있습니다.

이해를 위해 몇가지 함수형 핵심 기법을 소개합니다.

### 1.3.1. 복잡한 작업을 간단한 함수들로 분해하고 합성한다.(compose)

함수형 프로그래밍은 고수준에서 보면, 사실상 분해와 합성간의 상호작용입니다.  
프로그램을 잘게 쪼개고, 다시 이 조각들을 여러 쓰임에 따라 조합하는 방식이랄 수 있습니다.  
이러한 양면성 덕분에 함수형 프로그램은 모듈적으로 효율적으로 동작합니다.  

#### 분해

모듈성의 단위(작업 단위)는 바로 함수 자신입니다.  
대개 함수형 사고는 어떤 작업을 논리적 하위 작업(함수)으로 분할하는 행위로부터 시작합니다.  

잘게 나눈 하위 작업은 더 단순한 순수함수로 분해해 독립적인 작업 단위로 나타낼 수 있습니다.  
함수형 프로그래밍에서 모듈화는 단일성의 원리와 밀접한 관련이 있습니다.

> 단일성(singularity): 함수는 저마다 한 가지 목표만 바라봐야 한다.

순수성과 참조 투명성은 입력과 출력 형식을 서로 맞추도록 안내하여 단순 함수를 엮어 붙일 수 있도록 돕습니다.  
함수의 복잡도는 함수가 받는 인수의 개수와 직접적으로 연관되는 경우가 많습니다. 

#### 합성

예제에서 쓰인 (`run`으로도 쓰인) `compose`함수는 이름 그대로 **합성(composition)** 이라는 기법을 구현한 함수입니다.  
두 함수를 합성하면서 첫번째 함수의 결과를 다음 함수에 밀어넣는 새로운 함수를 만들어냅니다.  
이렇게 함수를 섞어 쓰려면 인수 개수와 형식이 서로 맞아야 합니다.

> [showStudent 예제](https://codesandbox.io/s/m71xzl79m9)를 다시 봅시다.

함수형으로 합성한 코드는 전체 표현식의 의미를 개별 조각의 의미에서 추론할 수 있습니다.  
함수 합성은 고수준의 추상화를 통해 내부 구현을 밝히지 않아도 코드가 수행하는 전 단계를 일목요연하게 나타냅니다.  

`compose`와 같이 다른 함수를 인수로 받는 함수를 고계함수(higher-order function)이라고 합니다.

### 1.3.2. 흐름 체인(fluent chain)으로 데이터를 처리한다.

> 데이터를 매끄럽게 체이닝하여 처리

[제이쿼리](https://jquery.com/)를 써봤다면 체인(체이닝)은 낯선 용어가 아닐 것입니다.  
체인은 (`$`, `jQuery` 처럼) 같은 객체를 반환하는 순차적인 함수 호출입니다.  
```js
$('#app').addClass('hello').click(function() { // ... })
```
체인도 합성처럼 코드를 간결 명료하게 작성하게 합니다. 

복수 과목을 수강한 학생들의 평균 점수를 계산하는 프로그램을 명령형으로 작성해보았습니다.
- [예제](https://codesandbox.io/s/kmypx6nkoo)
```js
const enrollment = [
  { enrolled: 2, grade: 100 },
  { enrolled: 2, grade: 80 },
  { enrolled: 1, grade: 89 }
];

let totalGrades = 0;
let totalStudentsFound = 0;
for (let i = 0; i < enrollment.length; i++) {
  let student = enrollment[i];
  if (student !== null) {
    if (student.enrolled > 1) {
      totalGrades += student.grade;
      totalStudentsFound++;
    }
  }
}

const average = totalGrades / totalStudentsFound;

console.log(average); // 90
```

함수형으로 이 문제를 분해하면
- (수강 과목이 2개 이상인) 자료 집합을 선택
- 학생의 점수를 얻는다
- 평균 점수를 계산한다

```js
import { chain, property } from "lodash";

const enrollment = [
  { enrolled: 2, grade: 100 },
  { enrolled: 2, grade: 80 },
  { enrolled: 1, grade: 89 }
];

const average = chain(enrollment)
  .filter(student => student.enrolled > 1)
  .map(property("grade"))
  .mean()
  .value(); // value를 호출해야 체인에 연결된 모든 연산들이 실행됩니다.

console.log(average);
```
※ 책에서는 예제에 `pluck`, `average`등의 함수를 사용습니다. 이는 lodash `v3.10.1`에서는 있었는데, 현재 `v4.17.10`에서는 `map`, `mean`등이 그 역할을 대체합니다.

각 단계에 해당하는 함수를 `lodash`의 `chain`으로 묶으면 함수 체인이 형성됩니다.  
함수 체인은 필요한 시점까지 실행을 미루는 **느긋한 평가(lazy evaluation)** 를 수행합니다. 다른 데에선 전혀 쓸 일이 없는 일련의 코드를 전부 실행하지 않아도 되어 CPU 부하가 줄어들어 성능이 좋아집니다.

다른 함수형 언어에 기본 탑재된 필요 시 호출(call-by-need) 동작을 효과적으로 모방할 수 있습니다.  

명령형 프로그래밍에서 변수를 선언하고, 그 값을 바꾸고, 루프를 반복하고, if-else 구문으로 분기했던 일들을 더 이상 할 필요가 없습니다.  

### 1.3.3. 리액티브 패러다임을 실현하여 이벤트 중심 코드의 복잡성을 줄인다.

> 복잡한 비동기 애플리케이션에서도 신속하게 반응

사용자 입력, 원격 웹 요청, 파일 시스템, 영구 저장소 등에서 비동기/이벤트 기반 데이터가 수시로 발생하는 환경에서 FP를 어떻게 활용할 수 있을까요?  

리액티브 프로그래밍은 함수형 프로그래밍 중에서 가장 흥미진진한 응용 분야입니다. 비동기 코드, 이벤트 중심 코드의 복잡도를 현저하게 줄이는 데 큰 도움이 됩니다. 리액티브 패러다임의 가장 큰 장점은, 더 높은 수준으로 코드를 추상하여 비동기, 이벤트 기반을 프로그램을 설정하느라 반복되는 똑같은 코드들은 잊고 비즈니스 로직에만 전념할 수 있게 해줍니다. 

**이벤트 발생 원**
- 마우스 클릭
- 텍스트 필드 값 변경
- 포커스 변경
- 새로운 HTTP 요청 처리
- DB 쿼리
- 파일 쓰기

리액티브 패러다임은 옵저버블(observable, 관찰 가능)이라는 아주 중요한 장치를 매개로 움직입니다. 이를 이용하면 데이터 스트림을 구독해 원하는 연산을 우아하게 합성 및 체이닝하여 처리할 수 있습니다.(뭔 소리야...)

학생의 SSN을 읽고 올바른지 검증하는 프로그램을 만들어 비교해보겠습니다.
- [예제](https://codesandbox.io/s/7zw72ym09q)

```js
var valid = false;
var elem = document.querySelector("#student-ssn");
elem.onkeyup = function(event) {
  var val = elem.value;
  if (val !== null && val.length !== 0) {
    val = val.replace(/^\s*|\s*$|\-/g, "");
    if (val.length === 9) {
      console.log(`Valid SSN: ${val}!`);
      valid = true;
    }
  } else {
    console.log(`Invalid SSN: ${val}!`);
  }
};
```
비즈니스 로직이 모두 한 곳에 집중되어 있어 모듈성이 결여되어 있고, 외부 상태에 의존하고 있습니다.  
이를 함수형 프로그래밍에 기반을 둔 리액티브 프로그램으로 순수함수를 이용해 map, reduce처러 많이 쓰는 연산으로 데이터를 처리할 수 있습니다.  
또 람다 표현식의 간결함을 누릴 수 있다는 이점이 있습니다.

```js
import Rx from "rxjs"; // v5

// 입력 필드를 구독합니다.
Rx.Observable.fromEvent(document.querySelector("#student-ssn"), "keyup")
  .pluck("srcElement", "value")
  .map(ssn => ssn.replace(/^\s*|\s*$|\-/g, ""))
  .filter(ssn => ssn !== null && ssn.length === 9)
  .subscribe(validSsn => {
    console.log(`Valid SSN ${validSsn}`);
  });
```
체인으로 연결 된 수행하는 모든 연산이 완전한 불변이고, 비즈니스 로직은 모두 개별 함수로 나뉘었습니다.

---

추가적으로 읽어볼만한 글들

- [[번역] 두려움, 믿음, 그리고 자바스크립트 - 언제 타입 시스템과 함수형 프로그래밍이 먹히지 않는가](https://adhrinae.github.io/posts/fear-trust-and-javascript-kr)
- [[번역] 반응형 프로그래밍과 RxJS 이해하기](https://hyunseob.github.io/2016/10/09/understanding-reactive-programming-and-rxjs/)