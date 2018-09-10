# 함수형 프로그래밍

> [러닝리액트](http://www.hanbit.co.kr/store/books/look.php?p_code=B3942115529) 책을 보면서 정리한 내용입니다.

- 1930년대 알론조 처치가 람다 계산법(lambda calculus, λ-calculus) 발견, 고차함수를 활용한 여러 연구 진행
- 고차함수: 다른 함수를 조작하고, 함수를 인자로 받거나 반환하는 것이 가능한 복잡한 함수
- 1950년대 존 맥카시의 리스트(Lisp) - 고차함수 개념, 함수가 1급 시민 혹은 1급 멤버라는 개념 구현

> **1급 시민(First class citizen)**
> - 변수나 데이터에 할당할 수 있어야 한다.
> - 함수를 다른 함수의 인자로 넘길 수 있어야 한다.
> - 함수의 리턴값으로 함수를 반환할 수 있어야 한다.

## 1. 함수형

자바스크립트는 함수가 1급 시민이기 때문에 함수형 프로그래밍을 지원한다고 할 수 있다. 함수가 1급 시민이라는 말은 함수를 일반적인 데이터와 마찬가지로 취급한다는 의미이다.

### 1.1. 함수가 애플리케이션의 데이터를 표현할 수 있다.

함수를 변수에 할당할 수 있다.
```js
const sum = function(x, y) {
  return x + y
}

sum(2, 3)
// 5
```
ES6의 화살표 함수로 다음과 같이 정의할 수 있다.
```js
const sum = (x, y) => x + y
```

함수를 객체에 넣을 수도 있다.
```js
const obj = {
  x: 2,
  y: 3,
  sum(x, y) {
    return x + y
  }
}
obj.sum(obj.x, obj.y)
// 5
```

함수를 배열에 넣을 수도 있다.
```js
const operation = [
  (x, y) => x + y,
  (x, y) => x - y,
  (x, y) => x * y,
  (x, y) => x / y,
]
operation[0](2, 3) // 5 
operation[1](2, 3) // -1 
operation[2](2, 3) // 6
```

### 1.2. 함수를 다른 함수에 인자로 넘기거나 함수를 반환할 수 있다.

이런식으로 함수를 인자로 받거나 함수를 반환하는 함수를 고차함수라고 부른다.
```js
const createIceCream = option => flavor => option(flavor)

const icecream = createIceCream(flavor => console.log(`토핑을 더한 ${flavor}맛 아이스크림`));
icecream('딸기') // '토핑을 더한 딸기맛 아이스크림'
icecream('초코') // '토핑을 더한 딸기맛 아이스크림'

const meltedIcecream = createIceCream(flavor => console.log(`녹아버린 ${flavor}맛 아이스크림`));
meltedIcecream('바닐라') // '녹아버린 바닐라맛 아이스크림'
```

## 2. 명령형 프로그래밍 vs 선언적 프로그래밍

| 명령형 프로그래밍(imperative programming) | 선언적 프로그래밍(declarative programming) |
| --- | --- |
| 필요한 것(결과)를 달성하는 과정에 관심을 두고 하나하나 기술하는 프로그래밍 스타일 | 필요한 것이 어떤 것인지 기술하는 데 방점을 두고 애플리케이션의 구조를 세워나가는 프로그래밍 스타일 |

함수형 프로그래밍은 선언적 프로그래밍이라는 더 넓은 프로그래밍 패러다임의 한 가지다.

문자열을 URL 친화적으로 만들기 위해 다음과 같이 만들 수 있다.

### 2.1. 명령형 프로그래밍

```js
const str = 'React state management patterns';
let urlFriendly = '';

for (let i = 0; i < str.length; i++) {
  if (str[i] == " ") {
    urlFriendly += '-';
  } else {
    urlFriendly += str[i];
  }
}
console.log(urlFriendly);
// React-state-management-patterns
```  
for 루프, if 문, 대입 연산자(+=) 등을 사용해 값을 설정한 이런 코드 자체는 잠깐 보는 것만으로 무엇을 하려했는지 즉시 이해하기 어렵다.  
코드 안에 주석을 많이 달아 읽는 사람이 잘 이해하도록 도움을 주어야한다.

### 2.2. 선언적 프로그래밍

```js
const str = 'React state management patterns';

const urlFriendly = str.replace(/\s/g, '-');
console.log(urlFriendly);
// React-state-management-patterns
```
구체적 절차 대신 replace라는 함수를 사용해 추상적인 개념을 표현한다.  

선언적 접근 방식이 더 읽기 쉽고, 더 추론하기 쉽다. 함수가 어떻게 구현되었는지는 함수라는 추상화 아래에 감춰진다.  
물론 각 함수는 구체적으로 구현해야 한다. 다만, 선언형 프로그래밍에서는 언어 자체가 선언적인 코드를 작성하는데 알맞은 여러 기본 라이브러리를 풍부하게 제공하며, 라이브러리 조합에 루프와 대입 보단 함수 합성이나, 고차 함수, 패턴 매칭, 대수적 데이터 타입을 사용한 문제 분해, 재귀 등 선언적 프로그래밍 기법을 더 많이 활용한다.

선언적 프로그래밍은 추론하기 쉬운 애플리케이션을 만들며, 규모를 확장하는 것을 쉽게 한다.

### 문서객체 모델(DOM)을 만드는 방식에서 접근법

명령형 접근 방식은 DOM을 구축하는 절차와 관련 있다.  
엘리먼트를 만들고, 설정하고, 문서에 추가한다.
```js
const app = document.getElementById('app');
const vendingMachine = document.createElement("div");
const drinkItem = document.createElement("div");

vendingMachine.classList.add("vendging-machine");
drinkItem.classList.add("drink-item");
drinkItem.textContent = "coca-cola";

vendingMachine.appendChild(drinkItem);
app.appendChild(drinkItem);
```

리액트는 선언적이다. VendingMachine 컴포넌트는 렌더링할 DOM을 기술한다.  
render 함수는 컴포넌트에 있는 지시에 따라 DOM을 만든다.  
실제 DOM이 어떻게 렌더링 되는지에 대한 내용은 추상화로 사라진다.

```js
import { render } from "react-dom";

function VendingMachine() {
  return (
    <div className="vending-machine">
      <div className="drink-item">coca-cola</div>;
    </div>
  )
}

render(
  <VendingMachine />, 
  document.getElementById("App")
);
```