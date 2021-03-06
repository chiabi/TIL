# 객체 지향 프로그래밍(OOP)

## 1. 객체 지향 프로그래밍이란

객체 지향 프로그래밍이란 실제 세계에 기반한 모델을 만들기 위해 추상화를 사용하는 프로그래밍 패러다임이다. 
절차 지향형 프로그래밍, 함수형 프로그래밍처럼 프로그래밍을 하기 위한 패턴이나 프로그래밍을 바라보는 관점을 갖게해주는 사고방식이다. 그러니까 일종의 방법론이란 얘기다.  

객체 지향 프로그래밍은 프로그램을 유연하고 변경이 쉽게하여 유지보수하기 좋게 만든다.

많은 유명한 프로그래밍 언어들이 이런 객체 지향 프로그래밍을 지원한다.(자바, 자바스크립트, C#, C++, 파이썬, PHP, 루비, 오브젝트C...)

자바스크립트에서는 객체 프로토타입을 사용해 객체 지향 프로그래밍을 지원한다. 

ES2015에 새롭게 도입된 클래스는 새로운 객체 지향 모델을 제공하는 것이 아니며, 별도의 문법으로 작성해야하지만 사실 Class도 함수이고 내부적으로 프로토타입의 상속 기능을 활용하고 있다.(기존 프로토타입 기반 패턴의 Syntactic sugar일 뿐이다.)

### 1.1. 프로그래밍 패러다임 

프로그래밍 패러다임이란 프로그래머에게 프로그래밍의 관점을 갖게 해 주고, 결정하게 하는 역할을 한다. 

예를 들어 객체지향(object oriented) 프로그래밍은 프로그램을 상호작용하는 객체들의 집합으로 볼 수 있게 해주는 반면, 함수형(functional) 프로그래밍은 상태값을 지니지 않는 함수값들의 연속으로 생각할 수 있게 해준다.

절차적 프로그래밍, 또는 절차 지향(procedural) 프로그래밍으로 불리는 프로그래밍 패러다임은 문제를 여러 개의 함수로 나눠 작성하고 이 함수들을 원하는 순서에 맞게 작성하는 방식이다.(함수들의 집합, 컴퓨터의 명령어들의 목록)

자바스크립트는 프로토타입 기반의, 다중 패러다임 언어이다. 동적(dynamic) 언어이며 명령형(imperative), 객체 지향, 함수형 프로그래밍 스타일을 지원한다.

### 1.2. 객체 지향의 기본 구성 요소

+ **클래스(Class)**: 같은 종류, 문제 해결을 위한 집단에 속하는 속성과 행위를 정의한 것. 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라 할 수 있다.
+ **객체(Object), 인스턴스(Class Instance)**: 실제로 메모리가 할당된 것. 객체는 자신 고유의 속성을 가지며 클래스에서 정의한 행위를 수행할 수 있다.  
객체의 행위는 클래스에 정의된 행위에 대한 정의를 공유함으로써 메모리를 경제적으로 사용한다.
+ **메소드(Method), 메시지(Message)**: 클래스로부터 생성된 객체를 사용하는 방법. 객체에 명령을 내리는 메시지. 메소드는 한 객체의 서브루틴 형태로 객체의 속성을 조작하는데 사용된다.  
객체 간의 통신은 메시지를 통해 이루어진다.(Message Passing)

### 1.3. 객체 지향의 특징

자료 추상화를 기초로 하여 상속, 다형 개념, 동적 바인딩이 시스템의 복잡성을 제어하기 위해 서로 맞물려 기능하는 것이다.

+ **추상화(Abstraction)**: 불필요한 정보는 숨기고 중요한 정보만을 표현함으로써 프로그램을 간단히 만드는 것. 말하자면 설계하는 작업 자체를 나타낸다. 어떤 것을 클래스로 표현한다고 했을 때 예상되는 프로퍼티와 메소드를 정의하는 작업이다.
  - **추상 자료형**: 자료 추상화를 통해 정의된 자료형. 자료형의 자료 표현과 자료형의 연산을 캡슐화한 것으로 접근 제어를 통해 자료형의 정보를 은닉할 수 있다.  
    * **클래스**: 추상 자료형
    * **객체**: 추상 자료형의 인스턴스
    * **메소드(함수)**: 추상 자료형에서 정의된 연산
    * **생성자**: 메소드의 호출(인스턴스화 되는 시점에서 호출되는 메소드)
+ **캡슐화(Encapsulation)**: 추상화 작업내용 중 어떤 것은 외부에서 접근이 가능하고 어떤 것은 접근할 수 없어야 한다. 이런 접근 제어를 하는 작업을 캡슐화라고 한다.(`private`, `public`)
+ **상속(Inheritance)**: 새로운 클래스가 기존의 클래스의 자료와 연산(속성과 메소드)을 이용할 수 있게 하는 기능
  - 기존의 클래스를 상속받은 하위 클래스를 이용해 프로그램의 요구에 맞춰 클래스를 수정할 수 있다. 
  - 클래스 간의 종속 관계를 형성해 객체를 조직화할 수 있다.
+ **다형성(Polymorphism)**: 어떤 한 요소에 어려 개념을 넣어 놓은 것. 일반적으로 오버라이딩이나 오버로딩을 의미한다. 프로그램 안의 객체 간의 관계를 조직적으로 나타낼 수 있다.
  - **오버라이딩**: 같은 이름의 메소드가 여러 클래스에서 다른 기능을 하는 것 
  - **오버로딩**: 같은 이름의 메소드가 인자의 갯수나 자료형에 따라서 다른 기능을 하는 것

그외 특징
+ **다중 상속**: 클래스가 2개 이상의 클래스로부터 상속 받을 수 있게 하는 기능. 참고로 자바스크립트는 오직 하나의 클래스를 상속받는 것만 지원한다.
+ **동적 바인딩**: 실행 시간 중에 일어나거나 실행 과정에서 변경될 수 있는 바인딩. 프로그램의 한 개체나 기호를 실행 과정에 여러 속성이나 연산에 바인딩함으로써 다형 개념을 실형한다.
  - 정적바인딩은 컴파일 시간에 완료되어 변화하지 않는다.

## 2. 자바스크립트에서의 객체 지향 프로그래밍

## 2.1. Core Objects

자바스크립트는 코어에 몇 개의 객체를 가지고 있다. [표준내장객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects)  
`Math`, `Object`, `Array`, `String` 등

자바스크립트의 모든 객체는 `Object` 객체의 인스턴스이므로 `Object`의 모든 속성과 메소드를 상속받는다.

## 2.2. Custom Objects

자바스크립트에서는 비슷한 종류의 객체를 많이 만들고 또 그 객체 간에 공유되어야하는 공통적인 속성과 메소드를 프로토타입이라는 기능을 이용해 효율적으로 저장하는 방법이 있다.

객체를 생성하는 방법
+ 객체 리터럴
  ```js
  const obj1 = {};
  obj1.name = 'chichi';
  ```
+ `Object()` 생성자 함수
  ```js
  const obj2 = new Object();
  // obj2는 Object 생성자 함수의 인스턴스 이다.
  obj2.name = 'chichi';
  ```
+ 생성자 함수
  ```js
  function Person() {}
  const obj3 = new Person();
  // obj3는 Person 생성자 함수의 인스턴스 이다.
  obj3.name = 'chichi';

  // 혹은
  function Person(name) {
    this.name = name;
  }
  const obj4 = new Person('chichi');
  obj4.name; // 'chichi'
  ```

<!-- 객체의 프로토타입을 지정하는 방법
+ `Object.create()`함수를 이용해 객체
+
+ -->

---

클래스를 정리하려고 한 건데 흘러흘러 객체 지향 프로그래밍을 알아야겠다는 생각에 정리를 시작했다.

또, 글 쭉쭉 읽다가 정리는 아직 못했다... 객체 지향 프로그래밍이란 것을 생성자 함수나 혹은 ES2015에 추가된 클래스 문법으로 구현할 수 있다는데 그래서 어떻게 사용해야하는지는 아직 감이 안온다. (함수형 프로그래밍만큼은 아니지만...)

정적 메소드 같은 것도 언제 사용해야하는지 감이 안온다.  
할 수 있는데까지 정리해보고 이번 주 안에 간단한 것을 완성해보는 튜토리얼을 따라해봐야겠다. 전체적인 어떤 과정을 알면 조금은 이해되지 않을 까 싶다.

---

+ [wikipedia - 객체 지향 프로그래밍](https://goo.gl/3FCgc5)
+ [MDN - 자바스크립트에 대하여](https://developer.mozilla.org/ko/docs/Web/JavaScript/About)
+ [MDN - 객체 지향 자바스크립트 소개](https://developer.mozilla.org/ko/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Reference)
+ [MDN - Object-oriented JavaScript for beginners](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object-oriented_JS)
+ [ObjectPlayground.com](http://www.objectplayground.com/): 객체 지향 자바스크립트를 위해, 객체와 프로토타입, 클래스에 관하여 시각화 해 보여주는 사이트. 영상도 제공하고 있다.