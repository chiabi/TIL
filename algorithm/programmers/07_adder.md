# 두 정수 사이의 합

> #매개변수의기본값, #Math.min(), #Math.max(), #Math.abs()

date: 18.04.16

* [문제링크](https://programmers.co.kr/learn/challenge_codes/92)

> adder함수는 정수 a, b를 매개변수로 입력받습니다.
두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하세요. a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
예를들어 a가 3, b가 5이면 12를 리턴하면 됩니다.
>
>a, b는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않습니다.

## 1. 풀이

```javascript
function adder(a, b){
  if (a > b) {
    const temp = a;
    a = b;
    b = temp;
  }
  const newArr = [];
	for ( let i = a; i <= b; i++) {
  	newArr.push(i);
  }
  return newArr.reduce((a, b) => a + b);
}
adder(3, 5) // 12
```
a, b의 대소관계를 먼저 정하고 새로운 배열을 만들어서 for문 작은 수부터 큰 수까지 돌려 
a와 b 사이의 수를 배열에 담고 arr.reduce메소드로 계산하는 방법
```javascript
function adder(a, b) {
  const newArr = [];
  for( let i = Math.min(a, b); i <= Math.max(b); i++) {
    newArr.push(i);
  }
  return newArr.reduce((a, b) => a + b);
}
adder(3, 5) // 12
```
대소관계 계산하는 부분은 Math.min(), Math.max로 수정한 것

## 2. 다른 사람 풀이

### 2-1. 매개변수의 기본값(default parameter)

작성자: 김병찬

```javascript
function adder(a, b, s = 0){
  for (var i = Math.min(a, b); i <= Math.max(a, b); i++) s += i;
  return s;
}
adder(3, 5) // 12
```

for루프도 if문처럼 구문 하나면 괄호를 생략할 수 있구나...

ES2015에 추가된 매개변수 기본값을 사용해 함수 내부에 따로 변수를 추가하지 않고 푼 문제.  
매개변수에 기본값을 추가해 함수 호출 시 인수를 주지 않으면 미리 설정된 값을 사용할 수 있도록 기능이 추가되었다.

### 2-1. Math.abs

작성자: Heejune Wang

```js
function adder(a, b){
    return (a+b)*(Math.abs(b-a)+1)/2;
}
adder(3, 5) // 12
```
```
1, 3
(1 + 3) * ((2) + 1) / 2
6


3, 5
(3 + 5) * ((2) + 1) / 2
12
```

[Math.abs()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) : 주어진 숫자의 절대값을 반환한다.

