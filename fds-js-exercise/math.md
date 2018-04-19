### 문제 1

양수를 입력받아 이 수를 반지름으로 하는 원의 넓이를 반환하는 함수를 작성하세요.

#### 풀이

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

#### 풀이

```js
function randomNumber(min, max) {
                                    // min 이상 max 미만이니까
  return Math.floor(Math.random() * (max - min)) + min;
}
randomNumber(3, 10);
```

### 문제 3

정수를 입력받아, 5 단위로 올림한 수를 반환하는 함수를 작성하세요.

예:
```
ceilBy5(32); -> 35
ceilBy5(37); -> 40
```

#### 풀이

```js
function ceilBy5(num) {
  return Math.ceil(num / 5) * 5;
}

console.log(ceilBy5(5)); // 5
console.log(ceilBy5(2)); // 5
console.log(ceilBy5(32)); // 35
console.log(ceilBy5(37)); // 40
```
5나 0일때는 안 올리는 게 맞나... 모르겠네..

### 문제 4

배열을 입력받아, 요소들의 순서를 뒤섞은 새 배열을 반환하는 함수를 작성하세요.

#### 풀이

```js
function mixArray(arr) {
  const l = arr.length;
  const newArr = new Array(l);
  arr.map(item =>{
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * l);
    }
    while(newArr[randomIndex] != null);
    newArr[randomIndex] = item;
  });
  return newArr;
}
mixArray(['one' ,'two', 'three', 'four', 'five', 'six', 'seven']);
```

### 문제 5

임의의 HTML 색상 코드를 반환하는 함수를 작성하세요.

#### 풀이

**랜덤으로 RGB뽑기**
```js
function randomRGB() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}
randomRGB();
```
```js
function randomChannel(){
  return Math.floor(Math.random() * 256);
}
function randomRGB() {
  return `rgb(${randomChannel()},${randomChannel()},${randomChannel()})`;
}
randomRGB();
```
0으로 된 item 3개의 빈배열 만들고 구하기  
어떤 값으로 채우지 않은 그냥 empty 상태는 push로 배열에 무언가를 넣는 방식이 아닌 이상 map 같은 콜백에 item 인수받는 메소드에서 현재요소로써 탐색이 불가능 한가 봄  
[mdn - Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  
> map은 callback함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 리턴값(결과값)으로 새로운 배열을 만듭니다. callback함수는 (undefined도 포함해서) **배열 값이 들어있는 인덱스에 대해서만 호출됩니다. 즉, 값이 삭제되거나 아직 값이 할당/정의되지 않은 인덱스에 대해서는 호출되지 않습니다.**  
그래서 fill()메소드로 일단 0을 할당해주는 걸로 수정했더니 원하는대로 나왔다.
```js
function randomRGB() {
  const arr = new Array(3).fill(0);
  return `rgb(${arr.map(item => Math.floor(Math.random() * 256))})`;
}
randomRGB();
```

**랜덤으로 HEX 컬러 뽑기**  
※ [`numObj.toString([radix])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) : radix에는 2에서 36 사이 값이 들어가며 선택적인 매개변수로, 수의 값을 나타내기 위한 기준을 정하는 정수가 들어간다.  
16이 들어가면 수를 16진수로 표기한 문자열을 반환한다.
```js
function randomHex(){
  return Math.floor(Math.random() * 256).toString(16);
}
function randomHexColor() {
  return `#${randomHex()}${randomHex()}${randomHex()}`
};
randomHexColor();
```
HEX 컬러 구하는 코드 더 줄여본 것
```js
// (Math.pow(16, 6) - 1).toString(16);    // ffffff;
function randomHexColor() {
  return `#${Math.floor(Math.random() * Math.pow(16, 6)).toString(16)}`;
}
randomHexColor();
```

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

(~~네???? [표준편차](https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80%ED%8E%B8%EC%B0%A8)요??? 그게 뭐죠ㅋㅋㅋㅋㅋㅋ😭😭😭~~)
먼저 수들의 평균을 구하고 각 수에서 평균을 뺀(편차) 수의 제곱의 평균을 구하고(분산) 여기에 제곱근을 구한다.(표준편차)

표준편차 잘 모르니까 답이라도 같게 나오는지 다른 계산해주는 사이트에서 같은 수로 돌려봤는데 처음에는 결과값이 같지 않았다.  
풀이가 잘못된 건가 생각했는데 reduce에 initialValue를 넣어주지 않아서 발생한 일.  
덕분에 이 인수를 꼭 넣어줘야 한다는 걸 깨달았다...
```js
function stdev(arr) {
  const n = arr.length;
  const m = arr.reduce((acc, item) => acc + item, 0) / n;
  return Math.sqrt(arr.reduce((acc, item) => acc + ((item - m) ** 2), 0) / (n - 1));
}

stdev([20,30,50,60,80,90]); // 27.386127875258307
```
---

~~수학문제 넘나 어렵다으아으아으ㅏㅡ아으ㅏ으ㅏ으ㅏ으ㅏㅏㅏㅏ 😭~~