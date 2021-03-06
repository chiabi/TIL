# 타입스크립트

자바스크립트로 컴파일되는, 자바스크립트의 타입이 있는 상위집합(superset)

C-family 언어와 다른 자바스크립트의 특성
- 프로토타입 기반의 객체지향언어
- scope와 this
- 동적 타입 언어, 느슨한 타입 언어

자바스크립트의 태생적 한계를 극복하기위해 나온 대체 언어들(**AltJS**)
- CoffeeScript
- Dart
- Haxe

타입스크립트 탄생
- 2012년 Microsoft에서 발표한 오픈소스
- C# 창시자인 덴마크 출신 소프트웨어 엔지니어 - 아네르스 하일스베르(Anders Hejlsberg)가 개발을 주도
- 정적 타이핑을 지원, ES6의 클래스, 모듈등과 ES7의 Decorator등을 지원

## 1. 타입스크립트의 특징

### 1.1. 정적 타입 시스템(static type system)을 도입한 자바스크립트

프로그램의 타입을 분석하는 방식에 따라 프로그래밍 언어는 다음과 같이 분류된다
+ 동적 타입 언어(dynamically typed language): 프로그램이 실제 실행될 때에 타입 분석을 진행한다.
+ 정적 타입 언어(statically typed language): 프로그램을 실행하지 않고 런타임 이전에 타입 분석을 진행한다. 

정적 타입 언어에서는 프로그램의 예상 동작을 타입을 통해 나타낸다. 컴파일 단계에서 타입이 검사되어 오류를 포착할 수 있다. 명시적인 정적 타입 지정으로 개발자의 의도를 명확하게 코드로 나타낼 수 있다.

```js
const sum = (a, b) => a + b
sum(1, 2) // 3
sum('1', '2') // '12'
```
숫자인 인수를 2개 전달받아 합계를 반환하는 함수에서 어떤 타입의 인수를 전달해야하며, 어떤 타입의 값을 반환해야 하는지를 타입스크립트를 통해 다음과 같이 명확하게 할 수 있다.
```ts
const sum = (a: number, b: number) => a + b
sum(1, 2) // 3
sum('1', '2') 
// Argument of type '"1"' is not assignable to parameter of type 'number'.
```

코드의 가독성을 높이고, 예측할 수 있도록 하며 디버깅을 쉽게 한다.  

프로토타이핑과 같이 요구사항이 정확하지 않거나 빠르게 변하는 경우에는 정적 타입은 적합하지 않을 수 있으나, 시스템의 복잡도가 늘어날수록 유용하다.

### 1.2. 자바스크립트의 상위집합(superset)

타입스크립트는 자바스크립트와 완전히 동떨어진 다른 언어가 아니다. 모든 자바스크립트 코드는 타입스크립트 코드이다. 자바스크립트 생태계를 염두에 두고 만들어졌다. 거대한 자바스크립트 프로젝트에서의 점진적인 마이그레이션도 지원한다.

## 2. 타입스크립트 구성

+ 언어명세: `.ts`, `.tsx` 확장자를 가지는 코드가 어떤 의미를 가지는지에 대한 약속
+ 컴파일러: 타입스크립트 코드를 입력받아, 명세에 맞게 해석 후 대응되는 자바스크립트 코드를 출력한다.
+ 생태계: 수많은 컨트리뷰터, 타입스크립트 지원도구, 타입스크립트로 쓰여진 라이브러리, 개발 커뮤니티

## 3. 타입스크립트 개발환경 구축

TypeScript 파일(.ts)은 브라우저에서 동작하지 않는다. 자바스크립트 파일로 변환해야하는 데 이를 컴파일 또는 트랜스파일링이라 한다.

### 3.1. 설치

(Node.js를 설치가 선행되어져 있어야 한다)

```sh
$ npm install -g typescript

$ tsc -v
Version 3.0.1
```
tsc(Typescript Compiler)는 `.ts`파일을 `.js`파일(자바스크립트)로 트랜스파일링 한다.

```sh
# 띄어쓰기를 통해 수행할 파일명 나열 가능
$ tsc 대상파일명(.ts 확장자는 생략 가능) 
$ tsc 대상파일명 또다른대상파일명 

# 와일드카드(*)를 통해 모든 .ts파일 한꺼번에 트랜스파일링
$ tsc *.ts

# -t (또는 --target) 옵션
$ tsc 대상파일명 -t (자바스크립트 버전)

# -w (또는 --watch) 옵션
$ tsc 대상파일명 --watch
```

+ [타입스크립트 컴파일러 옵션](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

### 3.2. Node REPL에서 타입스크립트 사용

+ [typescript-repl : tsun](https://github.com/HerringtonDarkholme/typescript-repl)

```sh
npm install -g tsun
```