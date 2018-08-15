# Interfaces

타입스크립트의 핵심 원리 중 하나는 **type-checking이 값의 형태에 초점을 맞춘다**는 것이다. 'duck typing' 또는 'structural subtyping'이라고 불린다. 타입스크립트에서 인터페이스는 이러한 타입의 이름을 지정하는 역할을 하며 코드 내의 약속과 프로젝트 외부의 코드와의 약속을 정의하는 강력한 방법이다.

## 첫번째 인터페이스

인터페이스의 작동 방식을 이해하기 위한 간단한 예제를 보자.
```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj); // 'Size 10 object'
```

타입 검사기는 `printLabel`의 호출을 검사한다. `printLabel`함수에 매개변수로 전달된 객체는 문자열 타입의 `label`이라는 프로퍼티를 가진다. 실제로 객체는 이것보다 더 많은 프로퍼티를 가질 수 있지만, 컴파일러는 적어도 필요한 것들이 있는지와 타입이 일치하는지만 확인한다. 그러나 타입스크립트가 모든 경우에서 관대한 것은 아니다.

인터페이스를 사용하여 문자열인 `label` 프로퍼티를 가지도록 요구사항을 설명하는 동일한 예제를 다시 작성해보자.
```ts
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 object' };
printLabel(myObj); // 'Size 10 object'
```

`LabeledValue` 인터페이스는 이전 예제의 요구사항을 설명하는 데 사용될 수 있는 이름이다. 여전히 문자열 타입인 `label`이라는 단일 프로퍼티가 있다는 것을 나타낸다. `printLabel`에 전달한 객체가 다른 언어에서처럼 이 인터페이스를 구현한다고 구체적으로 명시할 필요가 없다. 여기에서 중요한 것은 형태일뿐이다. 
함수에 전달하는 객체가 요구사항 목록과 일치하면, 허용된다.

타입 검사기는 이러한 프로퍼티들이 어떤 순서로 오는지는 상관하지 않으며, '인터페이스가 요구하는 프로퍼티가 존재하는지, 요구하는 타입인지'만을 지적한다는 점이 중요하다.

## 선택적 프로퍼티(Optional Property)

인터페이스의 모든 프로퍼티가 필수일 필요는 없다. 일부 특정 조건 하에서 존재하거나 전혀 존재하지 않을 수도 있다. 이러한 선택적 프로퍼티는 '옵션 백(options bags)'과 같이 일부 프로퍼티만 채워진 객체를 함수에 전달하는 패턴을 생성할 때 많이 사용된다. 

다음은 이 패턴의 예이다.
```ts
interface SquareConfig {
  // 프로퍼티 선언의 이름 끝에 `?`를 추가하면 optional property가 된다.
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: 'white', area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: 'black'});
```
선택적 프로퍼티를 가지는 인터페이스는 다른 인터페이스와 비슷하게 작성된다. 프로퍼티 선언의 이름 끝에 `?`가 추가된다.

선택적 프로퍼티의 장점은 
+ 인터페이스의 일부가 아닌 프로퍼티의 사용을 방지한다.
+ 사용 가능한 프로퍼티를 열거할 수 있다.

예를 들어 `createSquare`의 `color`프로퍼티 이름에 오타를 내면 다음과 같은 오류 메시지가 표시된다.
```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: 'white', area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: 'black'});
```

## 읽기전용 프로퍼티(Readonly properties)

처음 만들때만 수정할 수 있는 객체를 만들기 위해 프로퍼티 이름 앞에 `readonly`를 붙인다. 객체 리터럴을 할당해 `Point`를 생성할 수 있다. `x`, `y`는 할당 후에 변경할 수 없다.
```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let pl: Point = {x: 10, y: 20};
pl.x = 5;
// Error: Cannot assign to 'x' because it is a constant or a read-only property.
```

타입스크립트는 모든 변경가능한(mutating) 메소드가 제거된 `Array<T>`와 같은 `ReadonlyArray<T>`타입이 있어서, 생성 후에 배열을 바꿀 수 없다는 것을 확신할 수 있다.
```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12;
// Error: Index signature in type 'ReadonlyArray<number>' only permits reading.
ro.push(5);
// Error: Property 'push' does not exist on type 'ReadonlyArray<number>'.
ro.length = 100;
// Error: Cannot assign to 'length' because it is a constant or a read-only property.
a = ro;
// Error: Type 'ReadonlyArray<number>' is not assignable to type 'number[]'.
// Property 'pop' is missing in type 'ReadonlyArray<number>'.
```

위 코드의 마지막 줄을 보면, `ReadonlyArray`를 일반 배열로 다시 할당하는 것조차 허용되지 않는 것을 알 수 있다. 그러나 타입 어설션(type assertion)으로는 여전히 오버라이드(override)할 수 있다. 
```ts
a = ro as number[];
```

### `readonly` vs `const`

`readonly`는 프로퍼티에 사용하고, `const`는 변수에 사용한다고 기억하자

## 초과 프로퍼티 체크(Excess Property Checks)

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  // ....
}

let mySquare = createSquare({ colour: 'red', width: 100});
```
`createSquare`에 주어진 매개변수는 `color`대신 `colour`라 쓰여있다. (자바스크립트라면 이런 종류의 일은 조용히 실패한다.)

`width` 프로퍼티가 호환되고 `color`프로퍼티가 없으며, 여분의 `colour` 속성은 중요하지 않으므로 이 프로그램이 올바르게 입력되었다고 주장할 수 있다.

그러나 타입스크립트는 이 코드에 버그가 있다는 것을 알 수 있다. 객체 리터럴은 다른 변수에 할당하거나 인수로 전달할 때, 특별한 처리를 받아 초과 프로퍼티 체크(excess property checking)를 거친다. 객체 리터럴에 '대상 타입'(target type)에 없는 속성이 있으면, 오류가 발생한다.
```ts
let mySquare = createSquare({color: 'black'});
// Error: Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
```

이 검사를 피하는 방법은 아주 간단하다. 가장 쉬운 방법은 타입 어설션을 사용하는 것이다.
```ts
let mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);
```

그러나 더 나은 접근법은 객체에 일부 특별한 방법으로 사용되는 추가 프로퍼티가 있는 것이 확실한 경우 문자열 인덱스 시그니처(string index signature)를 추가하는 것이다. 만약 `SquareConfig`가 위의 타입에서 `color`와 `width`프로퍼티를 가질 수 있지만, 다른 프로퍼티도 여러 개 가질 수 있다면 다음과 같이 정의할 수도 있다.
```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

인덱스 시그니처에 대해서는 나중에 이야기할 거지만, 여기서는 `SquareConfig`가 여러 속성을 가질 수 있고, `color`나 `width`가 아닌 이상은 어떤 타입이냐는 문제가 되지 않는다.

조금 놀랍게도 이 체크를 피하는 마지막 방법은 다른 변수에 객체를 할당하는 것이다. `squareOptions`는 초과 프로퍼티 체크를 거치지 않으므로, 컴파일러는 에러를 발생하지 않는다.
```ts
let squareOptions = { colour: 'red', width: 100};
let mySquare = createSquare(squareOptions);
```

위와 간단한 코드의 경우와 같이 이러한 체크를 피하려는 시도를 하려해서는 안된다. 메소드를 가지며 상태를 유지하는 더 복잡한 객체 리터럴에는 이러한 기술을 염두에 두어야할 수 있도 있으나, 초과 프로퍼티 오류의 대부분 실제로도 버그이다. 즉, 옵션 백(opiton bags)와 같은 것에 대해 초과 프로퍼티 검사 문제가 발생하는 경우, 타입 선언 중 일부를 수정해야할 수도 있다. 이 경우, `color`또는 `colour` 프로퍼티를 모두 가진 객체를 `createSquare`에 전달하는 것이 괜찮다면, `SquareConfig`의 정의를 수정하여 이를 반영해야 한다.

## 함수 타입(Function Types)

인터페이스는 자바스크립트 객체가 취할 수 있는 다양한 형태를 정의할 수 있다. 프로퍼티를 가진 객체를 정의하는 것 외에도, 인터페이스는 함수 타입을 정의할 수도 있다.

인터페이스로 함수 타입을 정의하기 위해, 인터페이스에 호출 시그니처(call signature)를 제공한다. 이것은 매개변수 리스트와 리턴 타입만 있는 함수 선언과 같다. 매개변수 리스트의 각 매개변수는 이름과 타입이 있어야한다.
```ts
interface SearchFunc {
  // 매개변수 리스트                    // 리턴 타입
  (source: string, subString: string): boolean;
}
```

일단 정의되면 함수 타입 인터페이스를 다른 인터페이스처럼 사용할 수 있다. 어떻게 함수 타입의 변수를 생성하고 같은 타입의 함수를 값으로 할당하는 지 보자.
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc; 
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

함수 타입의 타입 검사를 통과하기 위해, 매개변수의 이름이 일치할 필요는 없다. 예를 들어 위의 예제를 다음과 같이 쓸 수 있다.
```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
``` 

함수의 매개변수는 하나씩 검사되며, 각 해당 매개변수 위치의 타입을 서로 비교하며 검사한다. 타입을 모두 지정하지 않고 싶다면, 함수값이 `SearchFunc` 타입 변수에 직접 할당되므로 타입스크립트의 문맥 형식 지정(Contextual typing)이 인수 형식을 유추할 수 있다. 여기서도 함수 표현식의 반환 타입은 반환하는 값(이 예제에서는 `false` 및 `true`)에 의해 암묵적으로 유추된다. 함수 표현식 숫자나 문자열을 반환했다면, 타입 검사기는 반환 타입이 `SearchFunc`인터페이스에 정의된 반환 타입과 일치하지 않는다고 경고했을 것이다.
```ts
let mySearch: SearchFunc;
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
}
```

## 인덱싱 가능 타입(Indexable Types)

함수 타입을 정의하기 위해 인터페이스를 사용하는 것처럼, `a[10]` 또는 `ageMap['daniel']`같이 인덱스를 가진 타입을 정의할 수 있다. 인덱싱 가능한 타입에는  인덱싱할 때 대응되는 반환 타입과 함께 객체에 대해 인덱싱하는 데 사용할 수 있는 타입을 정의하는 인덱스 시그니처(idnex signature)가 있다. 예를 들어보자.
```ts
interface StringArray {
  // 인덱스 타입  : 인덱싱할 때 해당 반환 타입
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];
```
위에 인덱스 시그니처를 가진 `StringArray` 인터페이스가 있다. 이 인덱스 시그니처는 `StringArray`가 `number`로 인덱싱 되면, `string`을 반환한다는 것을 나타낸다.

문자열 숫자, 두가지 타입의 인덱스 시그니처를 지원한다. 두가지 타입의 인덱서를 모두 지원할 경우, 숫자 인덱서에서 반환되는 타입은 문자열 인덱서에서 반환된 타입의 하위 타입이어야 한다. 이는 `number`로 인덱싱을 할 때, 자바스크립트가 객체로 인덱싱하기 전에 이를 `string`으로 변환하기 때문이다. `100`(`number`)을 인덱싱하는 것이 `"100"`(`string`)으로 인덱싱하는 것과 동일하므로, 두 가지 모두 일관성이 있어야 한다.
```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: number]: Animal, 
  [x: string]: Dog
}
// Error: Numeric index type 'Animal' is not assignable to string index type 'Dog'.
```

문자열 인덱스 시그니처는 '딕셔너리(dictionary)' 패턴을 정의하는 가장 강력한 방법이지만, 모든 프로퍼티가 그들의 반환 값에 일치하도록 강제한다. 문자열 인덱스가 `obj.property`를 `obj["property"]`로도 사용할 수 있다고 선언하기 때문이다.  
다음 예제에서 `name`의 타입은 문자열 인덱스의 타입과 일치하지 않고, 타입 검사기는 오류를 발생한다.
```ts
interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: string; 
  // Error: Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

마지막으로 인덱스에 할당하지 못하도록 인덱스 시그니처를 읽기 전용으로 만들 수 있다.
```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory';
// Error: Index signature in type 'ReadonlyStringArray' only permits reading.
```

##  클래스 타입(Class Types)

### 인터페이스 구현(Implementing an interface)

C#과 JAVA 같은 언어에서 인터페이스를 사용하는 가장 일반적인 방법 중 하나로, 클래스가 특정 약속에 만족한다는 것을 명시적으로 강제하는 방법이 타입스크립트에서도 가능하다.
```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ColockInterface {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
```

또한, 아래 예제에서의 `setTime`처럼 클래스에 구현된 인터페이스의 메소드를 정의할 수 있다.
```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ColockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```
인터페이스는 클래스의 public과 private 모두가 아니라 public만 정의할 수 있다. 클래스 인스턴스의 private에 특정 타입이 있는지를 검사하는데 클래스를 사용할 수 없다.

## 클래스의 static과 instance의 차이점(Difference between the static and instance sides of classes)

클래스와 인터페이스로 작업할 때 클래스에는 정적 측면의 타입과 인스턴스 측면 타입의 두가지 타입이 있음을 명심하자. 구성 시그니처(construct signature)로 인터페이스를 만들고, 이 인터페이스를 구현하는(implements) 클래스를 만들려고 하면 오류가 발생할 수 있다.
```ts
// 생성자의 인터페이스를 정의
interface ClockConstructor {
  // construct signature
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
// Error: Class 'Clock' incorrectly implements interface 'ClockConstructor'.
// Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
```
이는 클래스가 인터페이스를 구현할 때 클래스의 인스턴스 측면만 검사되기 때문이다. 생성자는 정적인 측면이기 때문에 이 검사에 포함되지 않는다.

대신 클래스의 정적 측면에서 직접 작업해야한다. 이 예제에서 생성자를 위한 `ClockConstructor`와 인스턴스 메소드를 위한 `ClockInterface`, 두 인터페이스를 정의한다. 편의상 전달된 타입의 인스턴스를 생성하는 `createClock` 생성자 함수를 정의한다.
```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 17);
```
`createClock`의 첫번째 매개변수가 `ClockConstructor`타입이므로 `createClock(AnalogClock, 7, 32)`에서 `AnalogClock`이 올바른 생성자 시그니처(constructor signature)를 가지고 있는지 확인한다

## 인터페이스 확장(Extending Interfaces)

