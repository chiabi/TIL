# 문자열 내 p와 y의 개수

> #정규표현식, #ES6. #iterable, #spread 연산자, #화살표함수

date: 18.04.07

* [관련링크](https://programmers.co.kr/learn/challenge_codes/96)

> numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 매개변수로 입력받습니다.
s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 리턴하도록 함수를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다.
예를들어 s가 pPoooyY면 True를 리턴하고 Pyy라면 False를 리턴합니다.

## 1. 풀이

```javascript
function numPY(s){
  var p = s.match(/p/ig);
  var y = s.match(/y/ig);
  return (p ? p.length : 0) === ( y ? y.length : 0) ? true : false;
}
numPY("pPoooyY") // true
numPY("Pyy") // false
numPY("asdv") // true
```

특정 문자를 찾아내서 비교한다고 해서 그럼 정규표현식을 사용하면 되겠다고 생각했다.  
문제가 바로 풀리지는 않았는데 일단 대소문자가 섞인 문자에서 p와 y의 개수를 비교하라길래 대소문자를 구분하는가 싶어서 `i`플래그는 쓰지 않았더니 오류를 봤다...  
그리고 그 과정에서 나는 `str.match(RegExp)` 메서드가 배열을 반환하길래 없으면 빈배열을 반환하겠거니 생각했는데 해당하는 게 없으면 `null`을 반환한다는 걸 알게되었다;;  

그래서 먼저 해당 값이 truthy가 될 수 있는지 물어보고 있으면 배열 길이를 없으면 0으로 비교하게해서 '모두 하나도 없는 경우 true'를 리턴한다는 조건도 같이 만족시켰다.

### 1-1. [str.match(RegExp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

문자열이 정규표현식에 일치하는 경우 일치하는 문자열을 배열로 반환한다.  
일치하는 문자열이 없을 경우 null을 반환한다.

정규표현식에 `g`플래그가 없으면 `RegExp.exec()`와 같은 결과를 반환한다.  
(`RegExp.exec()`는 `g`플래그를 사용해도 일치하는 첫번째 문자열만 [0]번째 인덱스에 담는다.)

```javascript
/p/ig.exec('yyypooyY');
// ["p", index: 3, input: "yyypooyY", groups: undefined]
'pooyY'.match(/p/ig);
// ["p"]

// 둘다 배열의 [0]번째 인덱스 값이 일치함
```

### 1-2. RegExp mathods

+ `RegExp.test()`: 일치하는 문자열이 있는지 여부 검사 (true, false)
+ `RegExp.exec()`: 일치하는 문자열을 찾는다. 일치한 문자열의 정보를 가지고 있는 배열을 반환한다. 일치하는 문자열이 없을 경우는 null을 반환한다.

```javascript
/quick\s(brown).+?(jumps)/ig.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```
Property/Index | Description | Example |
------------- | ------------ | ------- |
[0] | 일치하는 전체 문자열 | Quick Brown Fox Jumps |
[1], ...[n] | 괄호로 묶은 부분 문자열과 매칭된 문자열 | [1] = Brown<br>[2] = Jumps |
index | 0부터 시작하는 일치하는 문자열의 인덱스 | 4 |
input | 원본 문자열 | The Quick Brown Fox Jumps Over The Lazy Dog |

## 2. 다른 사람 풀이

### 2-1. ES6

iterable, spread 연산자, 화살표함수

작성자: `마냐`

```javascript
function numPY(s) {
  const as = [...s.toLowerCase()];
  return as.filter(a => a === 'p').length === as.filter(a => a === 'y').length;
}
```
다른 풀이들은 다 반복문을 돌리거나 아니면 나와 비슷한 정규표현식을 이용한 풀이였는데, 이 풀이는 아직 익숙하지 않은 ES6문법이라 눈에 띄었다.
소문자로 변환한 문자열을 spread 연산자를 통해 as에 iterable을 개별요소로 분리한다. 그리고 filter메소드에서 콜백으로 'p'와 'y'랑 일치하는지 확인하는 함수(화살표함수 사용)를 사용해 새로운 배열을 각각 만들고 그 배열의 length가 일치하는지 여부를 리턴한다.

ES6 문법은 아직 잘 모르겠다. iterable에 대한것도 개념 이해가 안된다. 이부분은 공부해서 따로 정리해야할 것 같다.

## 3. 관련링크

+ [정규식](http://beomy.tistory.com/21)
+ [Rest 파라미터와 Spread 연산자 정리하기](http://jeong-pro.tistory.com/117)