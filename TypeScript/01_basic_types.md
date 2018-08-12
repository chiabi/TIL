# Basic Types

타입스크립트 코드에서 어떤 변수 또는 값의 타입을 표기하기 위해 타입표기를 사용  
```
식별자 또는 값 : 타입
value: type
```

```ts
let userName: string = 'chiabi';
let userAge: number = 28;
let doYouHaveCats: boolean = true;
let catNames: Array<string> = ['syami', 'jojo', 'loki', 'kkonnim', 'samsun'];
```

## 불리언(Boolean)

true / false 값
```ts
let isTrue: boolean = true; 
let isFalse: boolean = false; 
```

## 숫자(Numbers)

자바스크립트처럼 모든 숫자는 부동 소수점(Floating Point) 값, 16진수 및 10진수 리터럴 외 ECMASciprt 2015에 도입된 2진수와 8진수 표기를 지원한다.

※ 16진수, 2진수, 8진수 리터럴
```ts
// ES5: 16진수 리터럴
0xFF
// 255

// ES6 추가
// 2진수는 0B, 0b의 접두사를 가짐
0b11 // 3

// 8진수는 0O, 0o의 접두사를 가진다.
0o10 // 8
```

```js
let decimal: number = 12;
let hex: number = 0xff;
let binary: number = 0b11;
let ocatal: number = 0o10;
```

## 문자열(String)

자바스크립트처럼 큰따옴표("), 작은따옴표(') 모두 사용하며, 여러 줄이거나 표현식을 포함할 수 있는 템플릿 문자열도 지원한다. 백틱(\`)을 사용하며, `${expr}`형식으로 표현식을 포함할 수 있다.

```js
let username: string = 'chiabi';
let age: number = 28;
let sentence: string = `Hello, my name is ${username}.
I'll be ${age} years old.`;
```

## 배열(Array)

`type[]` 형식과 `Array<elemType>`형식의 두 가지 방법 중 하나로 작성할 수 있다.
```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

## 튜플(Tuple)

요소의 수와 요소의 타입이 고정되어 있으며, 요소들의 타입이 다를 경우 배열의 타입을 정의할 수 있다.  
예를 들면 문자열과 숫자의 쌍으로 값을 표시할 수 있다.
```ts
// 튜플 타입을 정의한다
let x: [string, number];

// 할당할 경우 다음의 경우는 유효하다
x = ['hello', 10];

// 다음의 경우는 에러가 발생한다
x = [10, 'hello'];
// Error: Type 'number' is not assignable to type 'string'.
// Error: Type 'string' is not assignable to type 'number'.

x[0].substr(1);
// 'ello'
x[1].substr(1);
// Error: Property 'substr' does not exist on type 'number'.

x[0] = 'chiabi'; // OK
x[1] = 28; // OK
x[1] = true;
// Error: Type 'true' is not assignable to type 'number'.
```

만약 타입 정의보다 더 많거나, 더 적은 요소를 가지는 배열을 할당하면 에러를 낸다.
```ts
let y: [string, number]
y = ['chiabi']
// Error: Type '[string]' is not assignable to type '[string, number]'. 
// Property '1' is missing in type '[string]'.
```

단, 튜플 타입의 값을 Array 프로토타입의 메소드를 통해 조작하거나, 접근자를 통해 할당할 경우 유니온 타입(union type, `string | number`과 같이 여럿 중 하나인 타입)이 대신 사용되므로 다음과 같이 작동하니 유의하자.
```ts
const x: [string, number] = ['hello', 10];
x[2] = 100; // ['hello', 10, 100]
x.push('typescript'); // 4
console.log(x); // ['hello', 10, 100, 'typescript']

x[4] = true;
// Error: Type 'true' is not assignable to type 'string | number'.
```

## 열거형(Enum)

유한한 경우의 수를 가지는 값의 집합을 표현하기 위해 사용한다.  
```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

console.log(c); // 1
```

기본적으로 열거형은 0부터 시작해 멤버의 번호를 매긴다. 멤버 중 하나의 값을 설정해 변경할 수 있다. 예를 들면 0 대신 1로 시작하도록 다음과 같이 할 수 있다. 또는 열거형의 모든 값을 직접 설정할 수 있다.
```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

console.log(c)// 2
```

열거형의 편리한 기능은 숫자값에서 열거형 값의 이름으로 역방향 매핑이 가능하다는 것이다.
```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // Green
```

## Any

타입 정의를 제공하지 않는 라이브러리일 경우 어떤 유형의 값이 들어올지 알 수 없는 경우가 있다. 이러할 경우 값에 대해 컴파일이 타입 검사를 수행하지 않도록 할 수 있다. 

`any`는 모든 타입과 호환이 된다, 모든 값의 타입을 any로 지정할 수 있으며, any 타입의 변수에는 모든 값을 할당할 수 있다.

```ts
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false
```

`any` 타입은 컴파일하는 동안 점진적으로 타입 검사를 옵트인(opt-in), 옵트 아웃(opt-out)할 수 있다.  
`Object`가 다른 언어에서의 동작처럼 `any`와 비슷한 역할을 할 거라 예상하겠지만, Object 유형의 변수는 값을 할당만 할 수 있다. 실제로 존재하는 값이라도 임의의 메소드를 호출할 수는 없다.
```ts
let notSure: any = 4;
notSure.toFiexd(); 
// 4
// 컴파일러가 체크하지 않는다.

let prettySure: Object = 4;
prettySure.toFiexd();
// Error: Property 'toFixed' does not exist on type 'Object'.
```

모든 타입은 아니고, 일부 타입만 알고 있을때도 any는 유용하다. 예를 들면 배열이 있는데, 배열에 서로 다른 유형이 섞여있는 다음과 같은 경우에 쓸 수 있다.
```js
let list: any[] = [1, true, "free"];
list[1] = 100;
```

그러나 any를 남용하면 타입스크립트를 사용하는 의의가 사라지므로 꼭 필요한 경우에만 사용하자

## Void

`null`과 `undefined`만을 값으로 가질 수 있는 타입이다. 보통 아무런 값도 반환하지 않는 함수의 반환 타입을 표시할 때 사용한다. (변수 선언에서는 별로 유용하지 않다.)

```ts
function justLog(): void {
  console.log('logging');
}
```

## Null and undefined

`undefined`와 `null`은 각각 `undefined`와 `null` 타입을 가진다. `void`처럼 자체로는 별로 유용하지 않다.  

```ts
let u: undefined = undefined;
let n: null = null;
```

보통 `null`과 `undefined`는 다른 모든 타입의 서브타입이다. 즉, `null`과 `undefined`를 `number`와 같은 것으로 할당 할 수 있다.  

그러나 `--strictNullChecks` 플래그를 사용 할 때 `null`과 `undefined`는 `void`와 해당 유형에만 할당 할 수 있다. 이것은 많은 오류를 피하는데 도움이 된다. `string` 또는 `null` 또는 `undefined`를 전달하고 싶을 경우 유니온 타입(`string | null | undefined`)을 사용할 수 있다.

## Never

아무런 값도 가질 수 없는 타입이다. 무한 루프를 돌거나, 에러를 던지는 함수처럼 값이 절대 존재할 수 없는 함수의 반환 타입에 `never` 타입을 사용할 수 있다.
`never` 타입의 변수에는 어떤 값도 할당할 수 없다. 
```ts
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('Something failed');
}

function infiniteLoop(): never {
  while (true) {

  }
}
```

## Object

`Object`는 원시 타입이 아닌 타입을 나타내는 타입이다.  
`Object.create`와 같은 API를 잘 표현할 수 있다.

```ts
declare function create(o: object | null): void {}

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```
(사실 이부분은 잘 이해가 안되는데, 다들 Object는 건너뛰고 정리했다. 다시 찾아봐야겠다.)

## Type assertions

타입 어설션은 컴파일러에게 '나를 믿어, 나는 내가 뭘 할 지 알고 있어'라고 말하는 것과 같은 방법이다. 다른 언어의 type cast와 비슷하지만, 특별한 검사나 데이터를 재구성을 수행하지는 않는다. 런타임에는 영향을 미치지 않으며 컴파일러에서만 사용된다. 타입스크립트는 프로그래머가 필요한 특수 검사를 수행했다고 가정한다.

타입 어설션에는 2가지 타입이 있다. 하나는 꺽쇠(`<>`) 문법이고, 하나는 `as`문법이다.
```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```
두 예제는 똑같고 어떤 것을 선택하느냐는 선호의 문제지만, 타입스크립트와 JSX를 함께 사용할 때는 `as` 스타일의 어설션만 허용된다.