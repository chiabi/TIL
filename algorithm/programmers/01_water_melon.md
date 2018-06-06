# 수박수박수박수박수박수? 

> #문자열, #문자열의 반복, #반복문, #삼항연산

date: 18.03.25

* [프로그래머스 알고리즘 연습 문제 링크](https://programmers.co.kr/learn/challenge_codes/107)

> water_melon함수는 정수 n을 매개변수로 입력받습니다.  
> 길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.  
> 
> 예를들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴하면 됩니다.

## 1. 풀이

```javascript
function waterMelon(n){
  return (n % 2 === 0) ? '수박'.repeat(n / 2) : '수박'.repeat(Math.floor(n / 2)) + '수';
}
console.log("n이 3인 경우: "+ waterMelon(3)) // '수박수'
console.log("n이 4인 경우: "+ waterMelon(4)) // '수박수박'
```
[`Str.repeat(count)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)를 사용해서 삼항연산으로 2를 나눈 나머지가 0으로 떨어지는 값(짝수)는 '수박'을 n / 2번 반복하고, 홀수는 '수박'을 n / 2해서 [`Math.floor()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)로 정수로 만든 값만큼 반복한 뒤 '수'를 더해주면 되지 않을까 생각했다. 

## 2. 다른 사람 풀이

### 2-1. Str.repeat(), Str.substring()

작성자: 도원

```javascript
function waterMelon(n){
  var result = "수박";
   result = result.repeat(n-1).substring(0,n);
  //함수를 완성하세요

  return result;
}

// 실행을 위한 테스트코드입니다.
console.log("n이 3인 경우: "+ waterMelon(3))
console.log("n이 4인 경우: "+ waterMelon(4))
```
[`Str.substring(indexStart[, indexEnd])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)을 사용해 반복한 문자열을 필요한 문자열만큼 다시 잘라내 리턴하는 방식이다.

'수박'을 result에 대입하고 result를 n - 1만큼 반복한 뒤 0 ~ n번째까지(n번째는 포함하지 않는다.)의 문자열이 리턴되는 값을 다시 result에 담아 리턴한다.

n의 값이 4라면 '수박'이 3번 반복하고('수박수박수박') 그 값에서 인덱스 0 ~ n번째까지를 구하면 '수박수박'이 된다.  

### 2-2. Str.repeat(), 삼항연산

작성자: kyu라는 분의 풀이다.)
```javascript
function waterMelon(n){
  // n을 2로나눈 몫 만큼 곱하고 나머지가 있으면 '수' 더해라.
  return ("수박").repeat(n/2) + ((n%2) ? '수' : '');
}
```

내 코드의 반복되는 부분을 어떻게 더 줄여볼 수 있을까 고민했었는데 이 코드가 그 답이 될 수 있을 것 같다.

그런데 위에 코드에서 알 수 있었던 부분이 내가 `.repeat()` 메소드의 성질을 잘못 이해하고 있었던 것 같다. `.repeat(count)` 에 들어가는 count가 정수여야 한다고 알고있었는데 정수가 아닐 경우 정수로 변환된다. `Math.floor()`는 쓸 필요가 없는 거였다. 

`Math.floor()`를 쓰지 않아도 되면 `'수박'.repeat(n / 2)`부분이 중복되므로 위와 같이 줄일 수 있다.

#### 2-2-1. Str.repeat()

아래는 MDN 사이트의 예제이다.
```javascript
'abc'.repeat(-1);   // Range
Error
'abc'.repeat(0);    // ''
'abc'.repeat(1);    // 'abc'
'abc'.repeat(2);    // 'abcabc'
'abc'.repeat(3.5);  // 'abcabcabc' (count will be converted to integer)
'abc'.repeat(1/0);  // RangeError
```
Exceptions에 보면 
> RangeError: repeat count must be non-negative.  
> RangeError: repeat count must be less than infinity and not overflow maximum string size.

count로 들어올 수 없는 값은 음수이거나 무한이다. 이 값들이 들어올 경우 `RangeError`가 된다.  
그리고 'overflow maximun string size' 이부분은 이해가 잘 안되는 데 아마도 최대로 구할 수 있는 문자열 사이즈 제한을 넘지 말라는 것 같다. (해당 부분은 알게되면 다시 정리)

### 2-3. for 반복문, 삼항연산

작성자: 이석곤

```javascript
function waterMelon(n){
  let result = "";
  for(let i=0; i<n; i++) {
    result += (i % 2 == 0) ? "수" : "박";
  }
  return result;
}
```
for문으로 푼 방식이다.  
n번 반복하는데 짝수번째는 result에 '수'를 더하고 홀수번째는 '박'을 더해서 그 값을 리턴한다. 

그럼 n의 값이 3일 경우 0번째에 '수' 1번째에 '박' 2번째에 '수'를 더해 결과값은 '수박수'가 나온다.

## 3. 관련링크

+ [`Str.repeat(count)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
+ [`Str.substring(indexStart[, indexEnd])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
+ [`Math.floor()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)