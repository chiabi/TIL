### 문제 1

양수를 입력받아 이 수를 반지름으로 하는 원의 넓이를 반환하는 함수를 작성하세요.

[Math.PI](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)
> 원의 넓이 = 파이 * 반지름 제곱

```js
function circleAreaCalc(num) {
  return (num * num) * Math.PI;
}
circleAreaCalc(12);
```
```js
function circleAreaCalc(num) {
  return (num ** 2) * Math.PI;
}
circleAreaCalc(12);
```
```js
function circleAreaCalc(num) {
  return Math.pow(num, 2) * Math.PI;
}
circleAreaCalc(12);
```

### 문제 2

두 정수 `min`, `max` 를 입력받아, `min` 이상 `max` 미만인 임의의 정수를 반환하는 함수를 작성하세요.

### 문제 3

정수를 입력받아, 5 단위로 올림한 수를 반환하는 함수를 작성하세요.

예:
```
ceilBy5(32); -> 35
ceilBy5(37); -> 40
```

### 문제 4

배열을 입력받아, 요소들의 순서를 뒤섞은 새 배열을 반환하는 함수를 작성하세요.

```js
function mixArray(arr) {
  const l = arr.length;
  const newArr = new Array(l);
  arr.map(item =>{
    let randomIndex = Math.floor(Math.random() * l);
    // 새로운 배열의 랜덤 인덱스가 이미 채워져 있으면 랜덤 인덱스 다시 구하기
    while(newArr[randomIndex] != null) {
      randomIndex = Math.floor(Math.random() * l);
    }
    newArr[randomIndex] = item; 
  });
  return newArr;
}
mixArray(['one' ,'two', 'three', 'four', 'five', 'six', 'seven']);
```

### 문제 5

임의의 HTML 색상 코드를 반환하는 함수를 작성하세요.

### 문제 6

양수를 입력받아, 그 수만큼의 길이를 갖는 임의의 문자열을 반환하는 함수를 작성하세요.

만들고보니 이건 너무 간것같은데...
[String.fromCharCode()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
[한글 문자 집합 및 인코딩](http://forensic-proof.com/archives/615)
```js
function randomString(num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    // 한글 임의 문자열
    str += String.fromCharCode(Math.floor(Math.random() * 11172) + 0xAC00);

    // 영어(대소문자 혼용) 임의 문자열
    // str += String.fromCharCode(Math.floor(Math.random()  * 58) + 0x0041);
  }
  return str;
}
randomString(16);
```

### 문제 7

수 타입의 값으로만 이루어진 배열을 입력받아, 그 값들의 표준편차를 구하는 함수를 작성하세요.

---

수학문제 넘나 어렵다으아으아으ㅏㅡ아으ㅏ으ㅏ으ㅏ으ㅏㅏㅏㅏ 😭