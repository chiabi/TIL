# 스코프 

> [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/tree/master/scope%20%26%20closures) 책과 원문을 보면서 정리한 내용입니다.

## 스코프란? 

변수가 어디에 저장되어 있는지 프로그램은 변수를 어떻게 찾는지, 이러한 변수를 찾기 위한 규칙

### 컴파일러 이론

자바스크립트는 '동적' 또는, 인터프리터 언어'라고 구분하지만 사실은 '컴파일러 언어'이다.  
단, 전통적인 컴파일러 언어처럼 코드를 미리 컴파일, 컴파일한 결과를 분산 시스템에서 이용할 수 있는 것은 아니다.  
자바스크립트 엔진은 전통적인 컴파일러 언어에서 상당 부분을 세련된 방식으로 처리한다.

#### 전통적인 컴파일러 언어의 처리과정 

프로그램을 이루는 소스 코드 실 행 전에 보통 거치게 되는 3단계를 **컴파일레이션**(compliation)이라 한다.

1. 토크나이징(tokenizing) / 렉싱(lexing)
  - 문자열을 토큰(token, 해당 언어의 의미있는 조각)으로 만드는 과정
  ```
  var a = 2;

  ---[tokenizing / lexing]---

  ┌─────┬─────┬─────┬─────┬─────┐
  │ var |  a  |  =  |  2  |  ;  |
  └─────┴─────┴─────┴─────┴─────┘
  [
    {type: 'keyword', value: 'var'}, 
    {type: 'indentifier', value: 'a'},
    ...
  ]
  ```  
2. 파싱(parsing)
  - 토큰 배열을 프로그램의 문법 구조를 반영해 중첩 원소를 갖는 트리 형태로 바꾸는 과정
  - 이 트리는 추상구문트리(Astract Syntax Tree)라고 한다.
  ```
  [
    {type: 'keyword', value: 'var'}, 
    {type: 'indentifier', value: 'a'},
    ...
  ]
  
  ---[parsing]---

  {
    "type": "VariableDeclaration",
    "declarations": [{
      "type": "VariableDeclarator",
      "kind": "var",
      "id: {
        "type: "Identifier",
        "name": "a",
      },
      "init": {
        "type": "NumericLiteral",
        "value": 2
      }
    }]
  }
  ```
3. 코드생성(code-generation)
  - AST를 컴퓨터에서 실행 코드로 바꾸는 과정

자바스크립트 엔진은 다른 컴파일러와 다르게 자바스크립트 컴파일레이션을 미리 수행하지 않아서 최적화할 시간이 많지 않다. 
코드가 실행되기 수백만 분의 일초 전 수행한다. 이에 빠른 성능을 위해 여러 종류의 트릭을 사용한다. (레이지 컴파일(Lazy Compile), 핫 리컴파일(Hot Recompile), JITs)

어떤 자바스크립트 조각이라도 실행되려면 바로 직전에 컴파일 되어야 한다.

#### ※ 컴파일러 vs 인터프리터


> + **컴파일러**는 프로그램에서 수행 할 모든 작업을 파악하고 "머신 코드"(컴퓨터가 실제로 빠르게 실행할 수있는 형식)로 변환 한 다음 나중에 실행되도록 저장한다.
> + **인터프리터**는 한 줄씩 소스 코드를 단계별로 실행하면서 진행 상황을 파악한다.  
> 
> 컴파일러는 소스 프로그램을 읽어서 즉시 결과를 출력하는 인터프리터와는 구분된다. 그러나 현대에 들어 많은 인터프리터가 JIT 컴파일 등의 기술로 실시간 컴파일을 수행하므로, 컴파일러와 인터프리터 사이의 기술적 구분은 사라져 가는 추세이다.

#### ※ 참고

+ [Performance Tips for JavaScript in V8](https://www.html5rocks.com/ko/tutorials/speed/v8/)
+ [Compilers and Interpreters](https://hackernoon.com/compilers-and-interpreters-3e354a2e41cf)
+ [자바스크립트 개발자를 위한 AST(번역)](https://gyujincho.github.io/2018-06-19/AST-for-JS-devlopers)
+ [Welcome to The Super Tiny Compiler!](https://the-super-tiny-compiler.glitch.me/)
+ [AST Explorer](https://astexplorer.net/)

### 스코프 이해

어디서 어떻게 변수(확인자)를 찾는가를 결정하는 규칙의 집합  

```JS
var a = 2;
```
1. 컴파일러는 렉싱을 통해 구문을 토큰으로 쪼갠다.
2. 토근을 파싱에 트리 구조로 만든다. 
3. 컴파일러는 코드 생성과정에서 `var a`를 만나면 스코프에게 변수 `a`가 특정 스코프 컬렉션 안에 있는지를 확인한다.  
변수 `a`가 있다면 선언을 무시하고, 없으면 새로운 변수 `a`를 스코프 컬렉션 내에 선언하라고 요청한다.  
`a = 2`대입문을 처리하기 우해 나중에 엔진이 실행할 수 있는 코드를 생성한다.
4. 엔진은 스코프에게 `a`라는 변수가 현재 스코프 컬렉션 내에서 접근할 수 있는지 확인한다. 가능하면 엔진은 변수 `a`를 사용하고, 아니면 다른 곳에서(중첩 스코프, 바깥 스코프) 확인한다.

엔진은 두 종류의 검색을 수행한다.
+ LHS검색: 변수가 대입 연산자의 왼쪽에 있을 때 수행, 깂을 넣어야 해 변수 컨테이너 자체를 찾는다. `a = 2`에서 `a`에 대한 참조는 LSH참조이다.
+ RHS검색: 변수가 대입 연산자의 오른쪽에 있을 때 수행, 특정 변수의 값을 찾는다. `console.log(a)`에서 `a`에 대한 참조는 RHS참조다. 

LHS, RHS 검색 방식은 변수가 아직 선언되지 않았을 때(검색한 모든 스코프에서 찾지 못할 때) 다르게 동작한다.

+ RHS 참조가 대상을 찾지 못했을 때 
  - `ReferenceError` 발생
+ LHS 참조가 대상을 찾지 못했을 때
  - 자동적, 암시적으로 글로벌 스코프에 같은 이름의 변수가 생성된다.
  - `Strict Mode`일 경우:`ReferenceError` 발생

※ `TypeError`는 스코프 검색에 성공했으나 결과값을 가지고 적합하지 않거나 불가능한 시도를 한 경우를 의미한다.

```js
function foo(a) {
  console.log(a + b); // b에 대한 RHS검색이 실패했다.
  b = a;
}

foo(2);

// ReferenceError: b is not defined
```