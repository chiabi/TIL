### 문제 1

두 수를 입력받아 큰 수를 반환하는 함수를 작성하세요.

#### 풀이
```js
function larger(x, y) {
  return Math.max(x, y);
} 
larger(2, 5);
```
```js
function larger(x, y) {
  return x - y > 0 ? x : y;
}
larger(2, 5);
```
```js
function larger3(x, y) {
  return x > y ? x : y;
}
```

#### 강사님과 푼 풀이

```js
function larger() {
  // 만약 x가 크면 x를 반환
  if (x > y) {
    return x;
  } else {
    // 아니면 y를 반환
    return y;
  }
}
```
Math.max랑 삼항연산은 위에 푼거랑 비슷

### 문제 2

세 수를 입력받아 그 곱이 양수이면 `true`, 0 혹은 음수이면 `false`, 둘 다 아니면 에러를 발생시키는 함수를 작성하세요.

에러를 발생시키는 코드는 다음과 같습니다.
```js
throw new Error('입력값이 잘못되었습니다.');
```

#### 풀이

```js
function isPositive(x, y, z) {
  var result = x * y * z;
  if(result > 0) {
    return true;
  } else if ( result <= 0) {
    return false;
  } else {
    throw new Error('입력값이 잘못되었습니다.');
  }
}
```

#### 강사님과 푼 풀이

```js
function isPositive(x, y, z) {
  const multi = x * y * z; // 유지보수 성이 좋아지고 중복된 계산을 없앤다.
  if(multi > 0) {
    return true;
  } else if ( multi <= 0) {
    return false;
  } else {
    throw new Error('입력값이 잘못되었습니다.');
  }
}
```

### 문제 3

세 수 `min`, `max`, `input`을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- `min`보다 `input`이 작으면, `min`을 반환합니다.
- `max`보다 `input`이 크면, `max`를 반환합니다.
- 아니면 `input`을 반환합니다.

예:
```
limit(3, 7, 5); -> 5
limit(3, 7, 11); -> 7
limit(3, 7, 0); -> 3
```

#### 풀이

```js
function limit (min, max, input) {
  if((input > min) && (input < max)) {
    return input;
  } else if (input < min) {
    return min;
  } else {
    return max;
  }
}
```

#### 강사님과 푼 풀이

```js
function limit (min, max, input) {
  if (min > input) {
    return min;
  } else if (max < input) {
    return max;
  } else {
    return input;
  }
}
```

```js
function limit(min, max, input) {
 switch(true) {
   case min>input :
     console.log(min);
     break;
   case max<input :
     console.log(max);
     break;
   default :
     return input;
 }
}

limit(3,7,5);
```

게임에서 캐릭터가 영역(맵)밖으로 못나가게 해야할 때. 위치를 특정범위 내로 제한시키기 위해 사용.

### 문제 4

짝수홀수

어떤 정수가 짝수인지 홀수인지 출력하는 함수를 작성하세요. 이를 이용해서, 1부터 20까지의 수가 각각 짝수인지 홀수인지 출력하는 프로그램을 작성하세요.

#### 풀이

```js
function printEvenOrOdd(x) {
  return x % 2 === 0 ? '짝수': '홀수';
}
for( let i = 0; i < 20; i++) {
  console.log(`${i + 1}는 ${printEvenOrOdd(i + 1)}입니다`);
}
```

#### 강사님과 푼 풀이

```js
function printEvenOrOdd(x) {
  if ( x % 2 === 0) {
    console.log(x + '는 짝수입니다.');
  } else {
    console.log(x + '는 홀수입니다.');
  }
}
// *******단, 
prentEvenOrOdd('hello'); // 도 홀수라고 출력된다;;

let i = 0;
while(i < 20) {
  printEvenOrOdd(i);
  i++;
}
```

다음과 같이 백틱을 이용해 문자열을 결합할 수도 있다.
```js
function printEvenOrOdd(x) {
  if ( x % 2 === 0) {
    console.log(`${x}는 짝수입니다.`);
  } else {
    console.log(`${x}는 홀수입니다.`);
  }
}
let i = 0;
while(i < 20) {
  printEvenOrOdd(i);
  i++;
}
```

### 문제 5

100 이하의 자연수 중 3과 5의 공배수를 모두 출력하는 프로그램을 작성하세요.

#### 풀이

```js
let i = 0;
while(i < 100) {
  if((i + 1) % 15 === 0) {
    console.log(`${i + 1}는 3과 5의 공배수 입니다.`)
  }
  i++;
}
```
```js
for( let i = 0; i < 100; i++) {
  if ((i + 1) % 15 === 0) console.log(`${i + 1}는 3과 5의 공배수 입니다.`);
}
```

### 문제 6

자연수를 입력받아, 그 수의 모든 약수를 출력하는 함수를 작성하세요.

```js
function printDivisor(num) {
  for (let i = 1; i <= num; i++) {
    if(num % i === 0) {
      console.log(i);
    }
  }
}
```
```js
function printDivisor(num) {
  let arr = [1, num];
  const length = Math.sqrt(num);
  for (let i = 2; i <= length; i++) {
    if (num % i === 0) {
      arr.push(i);
      if (num / i !== i) {
        arr.push(num / i)
      }
    }
  }
  return arr.sort(function(a, b){ return a - b});
}
```

### 문제 7

2 이상의 자연수를 입력받아, 그 수가 소수인지 아닌지를 판별하는 함수를 작성하세요.

#### 풀이

```js
function prime(num) {
  const length = Math.sqrt(num);
  for (let i = 2; i <= length; i++) {
    if (num % i === 0) return `${num}은 소수가 아닙니다.`;
  }
  return `${num}은 소수입니다.`;
}
```

### 문제 8

1부터 100까지의 수를 차례대로 출력하되, 자릿수에 3, 6, 9중 하나라도 포함되어 있으면 '짝!'을 대신 출력하는 프로그램을 작성하세요.

```js
for (let i = 0; i < 100; i++) {
  let num = (i + 1).toString();
  if(num.includes(3)) {
    console.log("짝!");
  } else if (num.includes(6)) {
    console.log("짝!")
  } else if (num.includes(9)) {
    console.log("짝!")
  } else {
    console.log(i + 1);
  }
}
```
```js
for (let i = 0; i < 100; i++) {
  let num = (i + 1).toString();
  console.log(num.indexOf(3) === -1 && num.indexOf(6) === -1 && num.indexOf(9) === -1 ? i + 1 : "짝수");
}
```
```js
for (let i = 0; i < 100; i++) {
  let num = (i + 1).toString();
  console.log(num.includes(3) || num.includes(6) || num.includes(9) ? "짝수" : i + 1);
}
```
```js
for(let i = 0; i < 100; i++) {
  (i + 1).toString().search(/3|6|9/g) === -1 ? console.log(i + 1) : console.log("짝!");
}
// search는 매칭된 문자열 인덱스 리턴, 문자열 없으면  -1 반환
```
```js
for(let i = 0; i < 100; i++) {
  (i + 1).toString().match(/3|6|9/g) ? console.log("짝!") : console.log(i + 1);
}
// match는 매칭된 문자열 있으면 매칭된 값의 배열, 없으면 null 반환
```
```js
for(let i = 0; i < 100; i++) {
  `${i + 1}`.match(/3|6|9/g) ? console.log("짝!") : console.log(i + 1);
}
// 이게 되네...
```
```js
for(let i = 0; i < 100; i++) {
  /3|6|9/g.test(`${i + 1}`) ? console.log("짝!") : console.log(i + 1);
}
// test 매칭된 문자열 있으면 true 없으면 false
```

### 문제 9

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1을 입력받은 경우:
```
*
```

3을 입력받은 경우:
```
*
* *
* * *
```

5를 입력받은 경우:
```
*
* *
* * *
* * * *
* * * * *
```

### 문제 10

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1를 입력받은 경우:
```
*
```

3를 입력받은 경우:
```
  *
 * *
* * *
 * *
  *
```

5를 입력받은 경우:
```
    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *
```

### 문제 11

두 수를 입력받아서, 두 수의 최대공약수를 반환하는 함수를 작성하세요. ([유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)을 참고하세요.)

### 문제 12

세 수를 입력받아 큰 것부터 차례대로 출력하는 함수를 작성하세요.

### 문제 13

자연수 `n`을 입력받아, `n`번째 피보나치 수를 반환하는 함수를 작성하세요.