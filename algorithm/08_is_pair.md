# 괄호 확인하기

> #arr.push, #arr.every, #str.match(RegExp), #str.replace, #정규표현식

date: 18.04.19

* [관련링크](https://programmers.co.kr/learn/challenge_codes/87)

> is_pair함수는 문자열 s를 매개변수로 입력받습니다.
s에 괄호가 알맞게 짝지어져 있으면 True를 아니면 False를 리턴하는 함수를 완성하세요.
예를들어 s가 (hello)()면 True이고, )(이면 False입니다.
s가 빈 문자열("")인 경우는 없습니다.

## 1. 풀이

```javascript
function is_pair(str) {
  // let result = true;
  const arrLeft = [];
  const arrRight = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      arrLeft.push(i);
    } else if (str[i] === ')') {
      arrRight.push(i);
    }
  }
  if (arrLeft.length !== arrRight.length) {
    return false;
  } else {
    console.log(arrLeft, arrRight);
    return arrLeft.every((item, index) => {
      return item < arrRight[index];
    });
  }
}

console.log( is_pair("(hello)()") )
console.log( is_pair(")(") )
console.log( is_pair("(())((()())())") )
```

한참 헤맸다;;; 어제 이걸로 시간 다 잡아먹고...(나의 기분도 하락하고...뱀 게임 때문에 다시 신나졌지만) 이거를 indexOf와 slice로 어찌저찌 풀어보려고 계속 시도하다보니 놓치는 경우의 수도 많고 반복문도 두번은 돌려야할 것 같았다.  
생각해보니 굳이 그렇게 할바에야 문자열을 일일이 탐색해서 각 괄호의 배열을 만들고 혹시 배열의 수가 맞지 않다면 결국 짝이 맞지 않다는 것이니 false를 
만약 배열간 비교해서 ')'가 '('보다 저장한 인덱스 수가 크면 그것 역시 짝이 맞지 않다는 것이니 false를 반환하도록 every 메소드를 사용했다.

```js
function is_pair(str) {
  let count = 0;
  if(str[0] !== '(' || str[str.length - 1] !== ')') {
    return false;
  }
  for (let i of str) {
    if (i === '(') count++;
    if (i === ')') count--;
  }
  return count === 0;
}
```
다른 방법으로 풀어봤다. 그런데 이 경우는 문자열의 처음과 끝이 괄호가 아닐경우면 원하는 결과가 안 나올 것 같다.  
(프로그래머스 문제에서는 통과했지만...)
```js
function is_pair(str) {
  let count = 0;
  let newStr = '';
  // 괄호 외의 문자열 제거
  const match = str.match(/(\(|\))/g);
  if(match != null) {
    newStr = match.join('');
  } else {
    return false;
  }
  if(newStr[0] !== '(' || newStr[newStr.length - 1] !== ')') {
    return false;
  }
  for (let i of newStr) {
    if (i === '(') count++;
    if (i === ')') count--;
  }
  return count === 0;
}
```
처음 풀이처럼 괄호 외의 문자열은 제거하는 것으로 시작했다. 이렇게 하면 `aa(aaa(()()aaa))bb` 이런식의 문자열에도 제대로 결과가 출력된다.  
```js
function is_pair(str) {
  let newStr = str;
  while(/\w*\(\w*\)\w*/.test(newStr)) {
    newStr = newStr.replace(/\w*\(\w*\)\w*/g, '');
  }
  return newStr === ''
}
```
정규 표현식으로 좀더 잘 풀어낼 수 없을까 고민하다가 정규표현식 자체로 괄호 짝이 맞는지 찾아내는 방법은 생각해내지 못했지만.  
문자열에서 `(문자열)`이런 형태의 문자열을 제거하다 보면 짝이 안맞는 괄호가 남지 않을까라는 생각에 위와 같은 방법으로 풀어보았다.  
그런데 이것도 만약 문자열이란게 특수문자 포함이면....

[처음 만든거에 비해 훨씬 빨라졌다!](http://jsben.ch/a1bbV)