# 클래스(Class)

ECMAScript 2015에 추가되었다.

Class는 사실 함수이다. 함수를 함수 표현식, 함수 선언으로 정의할 수 있듯이 class 문법도 class 표현식과 class 선언으로 정의할 수 있다.

자바스크립트의 클래스는 클래스 기반 언어들과 달리 프로토타입 기반 상속을 사용한다.  
자바스크립트의 클래스는 새로운 어떤 기술이 아니라 기존의 function 키워드로 만든 생성자를 통한 프로토타입 기반 상속을 위한 패턴의 Syntactic sugar인 것이다.

class 선언(declaration)
```js
// function 선언과 다르게 class 선언은 호이스팅 되지 않는다.
class name [extends]{
  // 이 안은 엄격모드에서 실행된다.
  // class body
}
```

```js
class Polygon {
  // constructor: 생성자
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(length) {
    // constructor에 사용된 super()는 생성자에서만 쓰일 수 있다.
    // this 키워드가 사용되기 전에 호출되어야 한다.
    super(length, length);
    this.name = 'Square';
  }
}
```