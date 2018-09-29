# 클래스

타입스크립트는 자바스크립트(ES6)에서 지원하는 것(키워드 class 추가)보다 더 많은 부분에서 객체지향 프로그래밍(OOP) 지원한다.

## 1. 객체지향 프로그래밍

- 커다란 문제를 클래스라는 단위로 나눈다.
- 클래스 간 관계를 상속이나 포함 관계를 고려해 추가하면서 코드 중복을 최소화한다.

| 객체지향 프로그래밍 요소 | 자바스크립트(ES6) | 타입스크립트                    |
| ------------------------ | ----------------- | ------------------------------- |
| 클래스                   | `class`           | `class`                         |
| 인터페이스               | -                 | `interface`                     |
| 인터페이스 구현          | -                 | `implements`                    |
| 상속                     | `extends`         | `extends`                       |
| 생성자                   | `constructor()`   | `constructor()`                 |
| 접근 제한자              | -                 | `private`, `public`,`protected` |
| final 제한자             | -                 | `readonly`(TS2.0+)              |
| static 제한자            | `static`          | `static`                        |
| super 키워드             | `super`           | `super`                         |

### 1.1. 클래스 선언

다음의 클래스 타입과, 인터페이스 타입은 정확히 일치한다.

```ts
// Recatangle class type
class Recatangle {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getArea(): number {
    return this.x * this.y;
  }
}

// Interface Recatangles
interface Recatangle {
  x: number;
  y: number;
  getArea(): number;
}
```
