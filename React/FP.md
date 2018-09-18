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

## 3. 함수형 프로그래밍 개념

- 불변성
- 순수성
- 데이터 변환
- 고차 함수
- 재귀

### 3.1. 불변성(immutable)

함수형 프로그래밍에서는 데이터가 변할 수 없다.  
원본 데이터 구조를 변경하는 대신 그 데이터 구조의 복사본을 만들고 그중 일부를 변경하거나 필요한 작업을 진행하는 방식으로 해결한다.

색을 표현하는 객체에 평점을 매기는 함수를 작성하자
```js
let color_lawn = {
  title: "잔디",
  color: "#00ff00",
  rating: 0
}
```
- 원본 데이터가 변경되는 경우  
  ```js
  function rateColor(color, rating) {
    color.rating = rating
    return color
  }

  // 함수의 인자는 실제 데이터에 대한 참조다.
  console.log(rateColor(color_lawn, 5).rating) // 5

  // 원본 color_lawn 객체의 rating도 변경되었다.
  console.log(color_lawn.rating) // 5
  ```
- 원본 데이터를 그대로 남긴 채 복사본의 rating 값을 rating 파라미터 값으로 변경하는 경우
  ```js
  const rateColor = (color, rating) => {
    return Object.assign({}, color, {rating})
  }

  console.log(rateColor(color_lawn, 5).rating) // 5
  console.log(color_lawn.rating) // 0
  ```
  ```js
  // ES7의 스프레드 연산자를 사용해 다음과 같이 작성할 수도 있다.
  const rateColor = (color, rating) => ({
    ...color,
    rating
  })
  ```

색의 이름으로 이루어진 배열에 색의 이름을 추가하는 함수를 작성하자.
```js
let colorArray = [
  { title: '오렌지 라이언'},
  { title: '핑크 어피치'},
  { title: '옐로우 무지'}
]
```
- `Array.prototype.push()`는 불변성 함수가 아니므로 다음의 경우에 원본 배열이 변경된다.
  ```js
  const addColor = (title, colors) => {
    colors.push({title});
    return colors;
  }

  console.log(addColor('초록색 튜브', colorArray).length) // 4
  console.log(colorArray.length) // 4
  ```
- `Array.prototype.concat()`을 사용해 원본 배열을 유지하고, 복사된 배열에 새로운 색 이름을 추가한다.
  ```js
  const addColor = (title, colors) => colors.concat({title})

  console.log(addColor('초록색 튜브', colorArray).length) // 4
  console.log(colorArray.length) // 3
  ```
  ```js
  // ES6의 배열 스프레드 연산자를 사용해 다음과 같이 작성 할 수도 있다.
  const addColor = (title, colors) => [...colors, {title}]
  ```

### 3.2. 순수 함수(pure function)

- 파라미터에 의해서만 반환값이 결정되는 함수. 
- 최소 하나 이상의 인자를 받는다.(인자를 받지 않는다면 항상 같으므로 상수와 같아진다.)
- 인자가 같으면 항상 같은 값이나 함수를 반환한다.
- 부수 효과(side effect)가 없다.
  - 부수효과: 전역 변수를 설정하거나, 함수 내부나 애플리케이션에 있는 다른 상태를 변경하는 것
- 인자를 변경 불가능한 데이터로 취급한다.

다음은 순수하지 않은 함수이다.
```js
const chiabi = {
  name: 'Chihye Park',
  canRead: false,
  canWrite: false,
}

const selfEducate = () => {
  chiabi.canRead = true
  chiabi.canWrite = true
  return chiabi
}

selfEducate()
console.log(chiabi) 

// { name: 'Chihye Park', canRead: true, canWrite: true }
```
`selfEducate`함수는 호출에 따른 부수효과가 발생하므로 순수하지 않다.
- 인자를 취하지 않았다.
- 값을 반환하거나 함수를 반환하지 않는다.
- 영역 밖의 `chiabi`라는 변수를 바꾸었다.

다음은 전달받은 인자 `person`으로부터 새로운 값을 계산해 새로 만든 객체를 반환하는 순수 함수이다.
```js
const chiabi = {
  name: 'Chihye Park',
  canRead: false,
  canWrite: false,
}

const selfEducate = (person) => ({
  ...person,
  canRead: true,
  canWrite: true
});

console.log(selfEducate(chiabi)) 
// { name: 'Chihye Park', canRead: true, canWrite: true }
console.log(chiabi)
// { name: 'Chihye Park', canRead: false, canWrite: false }
```

DOM을 변경하는 순수하지 않은 함수
```js
const Header = text => {
  let h1 = document.createElement('h1')
  h1.innerText = text;
  document.body.appendChild(h1);
}

Header("Header() caused side effects");
```
`Header`함수는 인자로 받은 텍스트를 머리글에 넣는다.  
- 함수나 값을 반환하지 않는다.
- DOM을 변경하는 부수 효과를 발생시킨다.

리액트에서는 UI를 다음과 같이 순수 함수로 표현한다.
```jsx
const Header = (props) => <h1>{props.title}</h1>
```
- DOM을 변경하는 부수 효과 없이 엘리먼트를 반환한다.
- DOM을 변경하는 책임은 애플리케이션의 다른 부분이 담당한다.

#### 순수 함수를 만드는 3가지 규칙

1. 파라미터를 최소 하나 이상 받아야 한다.
2. 값이나 다른 함수를 반환해야 한다.
3. 인자나 함수 밖에 있는 다른 변수를 변경하거나 입출력을 수행해서는 안된다.

#### 순수 함수는 테스트하기 쉽다.

자신의 환경 또는 어떤 것도 변화시키지 않으므로 복잡한 테스트 준비과정이나 정리과정이 필요치 않다.  
함수에 전달되는 인자만 제어하면 되며, 인자에 따른 결과값을 예상할 수 있다.

#### 순수 함수에서는 로그/출력도 허용해선 안된다.

(특히 병렬/동시성 프로그래밍에서) 콘솔에 로그나, 파일 출력등 디버깅을 위한 행위에 의해 함수와 외부 환경과의 상호작용이 바뀔 수도 있다.  
- [하이젠버그](https://ko.wikipedia.org/wiki/%ED%95%98%EC%9D%B4%EC%A0%A0%EB%B2%84%EA%B7%B8): 디버깅을 위해 추가한 코드로 인해 프로그램의 동작이 바뀌는 형태의 버그

### 3.3. 데이터 변환

한 유형의 데이터를 다른 유형으로 변형

### 3.4. 고차 함수

### 3.5. 재귀

