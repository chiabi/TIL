# 불변성(Immnutability)

Array의 메소드들은 새로운 배열을 반환하는 것도 있지만 기존의 배열에 추가하거나 제거하는 수정을 일으키는 것도 있다.  
반면에 String의 메소드들은 원본의 변형없이 새로운 문자열을 반환한다. 

매니저님께 질문드리니 '그것은 문자열같은 원시값은 불변이기 때문입니다.'라는 답을 들었다. 원시값, 불변... 처음 듣는게 아니라서 금방 이해했지만 까맣게 잊고 있던거에 충격을 먹어서 다시 정리하기로 했다. 

## 1. 원시 타입(Primitive type) vs 참조 타입(Reference type)

자바스크립트에는(ES2015) 7가지의 타입(자료형, Data type)이 존재한다.

+ 원시 타입, 기본 자료형(Primitive data type)
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol(ES2015 추가)
+ 참조 타입(Reference type), 객체형(Obejct type)
  - Object

원시 타입과 참조 타입 사이에는 몇 가지 유의할 만한 차이점이 있다.

### 1.1. 원시 타입, 기본 자료형

+ 원시 타입은 **변경 불가능한 값**이며 **pass-by-value**이다.
+ 메모리의 스택 영역(Stack Segment)에 고정된 메모리 영역을 점유하고 저장된다.

### 1.2. 참조 타입, 객체형

+ 객체는 데이터와 그 데이터에 관련된 동작(절차, 방법, 기능)을 모두 포함할 수 있는 개념적 존재
  - 프로퍼티(property): 이름과 값을 가지는 데이터를 의미
  - 메소드(method): 동작을 의미
+ pass-by-refernce이다.
+ 메모리의 힙 영역(Heap Segement)에 저장된다.

#### 1.2.1. 참조(reference)

- 객체가 컴퓨터 메모리 상에서 어디에 저장되어있는지를 가리키는 값  
(자바스크립트에서는 우리가 참조를 직접 읽거나 조작할 수 없다.)
- 객체라고 생각하고 다루어왔던 값은 실제로는 **객체에 대한 참조**이다.

```js
const obj = {prop: 1}; // 변수 obj에 객체에 대한 참조가 저장
obj.prop; // obj를 통해 역참조된 객체의 속성을 읽어온다.
```
변수 obj에는 객체에 대한 참조가 저장되었다.  
객체의 속성에 접근하면,  
자바스크립트 엔진은 참조를 통해 메모리에 저장되어 있는 객체에 접근해서 해당 객체의 속성을 읽는다.(**역참조(dereference)**)

## 2. 동적 타이핑(Dynamic typing)

자바스크립트는 느슨한 타입(loosely typed) 언어, 혹은 동적(dynamic) 언어이다.
- 변수의 타입을 미리 선언할 필요가 없다.(값이 할당되는 과정에서 자동으로 자료형이 결정된다.)
- 같은 변수에 여러 타입의 값을 넣을 수 있다.

```js
var foo = 42;      // Number
var foo = 'bar';   // String
var foo = true;    // Boolean
```

※ C나 Java같은 C-family 언어는 변수 선언 시 사전에 저장할 값의 종류를 지정해야한다.(Type annotation), 이런 언어는 정적 타이핑(Static Typing) 언어라 한다.

---

+ [hellojavascript - 값 더 알아보기](https://helloworldjavascript.net/pages/220-value-in-depth.html)
+ [mdn - 자바스크립트의 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)
+ [poiemaweb - 자료형과 변수](http://poiemaweb.com/js-data-type-variable)
+ [poiemaweb - 객체와 변경불가성(Immutability)](http://poiemaweb.com/js-immutability)
+ [javascript tutor](http://pythontutor.com/javascript.html#mode=edit): 자바스크립트 코드 실행을 시각화해주는 멋진 사이트
+ [자바스크립트는 어떻게 작동하는가:메모리 관리 + 4기자ㅣ 흔한 메모리 누수 대처법](https://goo.gl/cfUVmr)
+ [자바스크립트의 동작원리: 엔진, 런타임, 호출 스택](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)