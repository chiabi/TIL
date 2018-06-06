# 역삼각형 출력하기

> #반복문, #재귀함수, #문자열의 반복, #배열

date: 18.04.01

* [문제링크](https://programmers.co.kr/learn/challenge_codes/113)

> printReversedTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다.  
> 다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printReversedTriangle 메소드를 완성하세요  
> 
> 높이(num)가 3일때 다음과 같은 문자열을 리턴하면 됩니다.  
> ```
> ***
> **
> *
> ```

## 1. 풀이

```javascript
function printReversedTriangle(num) {
  var result = ''
  // 함수를 완성하세요
  for (; num; num--) {
    result += '*'.repeat(num) + '\n';
  }
  return result
}
```
```javascript
function printReversedTriangle(num) {
  var result = ''
  while(num){
    result += '*'.repeat(num) + '\n';
        num--;
  }
  return result;
}
```

해당 문제는 for와 while 반복문으로 두번 풀었다. 역삼각형 출력을 해야해서 num에서 1씩 빼면서 거꾸로 반복된 문자열을 더하면 될 것 같았다.  
원래 조건식은 'num > 0'이었는데 이 부분도 num을 계속 빼서 0이 되면 0이 falsy니까 'num'으로 줄였다. 

## 2. 다른 사람 풀이

### 2-1. 재귀함수

작성자: 이진

```javascript
function printReversedTriangle(n) {
  return n > 0 ? '*'.repeat(n) + '\n' + printReversedTriangle(n-1) : '';
}
```

삼항연산과 재귀함수로 반복문처럼 처리가 가능하구나해서 놀랐던 풀이다.

#### 2-1-1. [다중 삼항연산](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

풀이와 관련된 건 아닌데, 혹시 삼항연산관련 문서를 보면 재귀함수랑 같이 푸는 것처럼 뭔가 다양한 방법이 없을까해서 찾아보다가 다중 삼항도 가능하다는 걸 알았다.  
주의할 점은 조건 연산은 우측부터 그룹핑 된다는 것이다.

```javascript
var firstCheck = false,
    secondCheck = false,
    access = firstCheck ? "Access denied" : secondCheck ? "Access denied" : "Access granted";
  
console.log( access ); // logs "Access granted"
```

다중 조건 IF 문과 같은 방식으로 여러개의 조건을 사용할 수도 있다고 한다.
```javascript
var condition1 = true,
    condition2 = false,
    access = condition1 ? condition2 ? "Full pie": "Half pie": condition2 ? "Half pie" : "No pie, don't cry" ;

console.log(access); // logs "Half pie"
```
그런데 이걸 어떻게 읽어야해...MDN의 설명만으로는 이해가 안되어서 [다른 글을 찾아봤다.](http://harrislim.tistory.com/26)
위의 식을 아래와 같이 읽으면 된다.

```javascript
condition1 ? (condition2 ? "Full pie": "Half pie") : (condition2 ? "Half pie" : "No pie, don't cry"); 
```

### 2-2. Arr.join([separator])

작성자: Seungjae Baek

```javascript
function printReversedTriangle(num) {
  var result = ''
  // 함수를 완성하세요
  while(num>0){result+=Array(num+1).join("*")+'\n';num--}

  return result
}
```
발상이 굉장히 신기했던 풀이다. 처음에는 얼핏보고 이걸 푸는데 배열이 왜 필요하지?라고 생각했다.  
빈 num+1의 배열을 만들고 separator에 '*'을 넣어 문자열을 완성한 문제.  


## 3. 관련링크

+ [다중 삼항연산 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)




