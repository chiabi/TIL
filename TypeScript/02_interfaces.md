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

인터페이스를 사용하여 문자열인 `label` 프로퍼티를 가지도록 요구사항을 설명하는 예제를 다시 작성해보자.
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

타입 검사기는 이러한 프로퍼티들이 어떤 순서로 오는지는 상관하지 않으며, 인터페이스가 요구하는 프로퍼티가 존재하며 요구하는 타입인지만을 지적한다는 점이 중요하다.

## 선택적 프로퍼티(Optional Property)

인터페이스의 모든 프로퍼티가 필수일 필요는 없다. 일부 특정 조건 하에서 존재하거나 전혀 존재하지 않을 수도 있다. 두개의 프로퍼티가 있는 객체를 함수에 전달하는 패턴을 생성할 때 많이 사용된다. 

선택적 프로퍼티를 가지는 인터페이스는 다른 인터페이스와 비슷하게 작성된다. 프로퍼티 선언의 이름 끝에 `?`가 추가된다.
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





