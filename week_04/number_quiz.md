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
```js
for (let i = 0; i < 100; i++) {
  // console.log(i + 1);
  if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0) {
    console.log(i + 1);
  }
}
```
공배수니까 3, 5의 최소공배수의 배수를 구하면 되는 거 아닌가.. 아닌가...수학이 약해서 모르겠네😿

#### 강사님과 푼 풀이

```js
// 3의 배수
// = 3, 6, 9, 12, 15, 18, 21,...
// = 3으로 나누어 떨어지는 수 
// v % 3 === 0

// 3과 5의 공배수
// = 3으로 나누어 떨어지고 "그리고" 5로도 나누어 떨어지는 수

// 100 이하의 자연수마다
// 3과 5의 공배수인지 확인하고 
// 맞으면 출력(console.log)
for (let i = 0; i < 100; i++) {
  // console.log(i + 1);
  if ((i + 1) % 3 === 0 && (i + 1) % 5 === 0) {
    console.log(i + 1);
  }
}
```
```js
for (let i = 0; i < 100; i++) {
  const num = i + 1;
  if (num % 3 === 0 && num % 5 === 0) {
    console.log(i + 1);
  }
}
```
```js
for (let num = 1; num <= 100; num++) {
  if (num % 3 === 0 && num % 5 === 0) {
    console.log(num);
  }
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
그냥 1부터 n까지 나눠지는지 다 돌리는 거
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
제곱근 이하 나머지가 0인 수랑 그 수로 n을 나눴을때 몫... 답이 배열로 반환되는 거라 문제에 맞는지는 모르겠다.

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

#### 풀이
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
for (let i = 1; i <= 100; i++) {
  let str = i.toString();
  str.indexOf(3) === -1 && str.indexOf(6) === -1 && str.indexOf(9) === -1 ? console.log(i) : console.log('짝!');
}
```
```js
for (let i = 1; i <= 100; i++) {
  let str = i.toString();
  str.includes(3) || str.includes(6) || str.includes(9) ? console.log('짝!') : console.log(i);
}
```
```js
for(let i = 1; i <= 100; i++) {
  i.toString().search(/3|6|9/g) === -1 ? console.log(i) : console.log("짝!");
}
// search는 매칭된 문자열 인덱스 리턴, 문자열 없으면  -1 반환
```
```js
for(let i = 1; i <= 100; i++) {
  i.toString().match(/3|6|9/g) ? console.log("짝!") : console.log(i);
}
// match는 매칭된 문자열 있으면 매칭된 값의 배열, 없으면 null 반환
```
```js
for(let i = 1; i <= 100; i++) {
  `${i}`.match(/3|6|9/g) ? console.log("짝!") : console.log(i);
}
// 이게 되네...
```
```js
for(let i = 1; i <= 100; i++) {
  /3|6|9/g.test(i) ? console.log('짝!') : console.log(i);
}
// test 매칭된 문자열 있으면 true 없으면 false
```
문자열 includes나 indexOf나 아니면 정규식... 그런데 number 문제인데 이렇게 푸는게 맞나...

#### 강사님과 푼 풀이

```js
for (let i = 1; i <= 100; i++) {
  let str = i.toString();
  // 만약 3이 포함되어 있거나 또는
  // 6이 포함되어 있거나
  // 9가 포함되어 있으면
  if (str.includes(3) || str.includes(6) || str.includes(9)) {
    // '짝!'을 출력
    console.log('짝!');
  } else {
    // 아니면 그냥 숫자를 출력
    console.log(i);
  }
}
```
구문이란 세미콜론으로 구분되는 문장   
구문 단위는 위에서 아래로 좌에서 우로 실행되는데 구문 안에서는 좀 더 복잡하다.  
안쪽에서부터 실행한다.  

코드를 실행한다는 건 값을 메모리에 올린다는 것  

프로그래밍마다 실행시키는 순서가 다르다. 자바스크립트는 안쪽에서부터([평가전략](https://goo.gl/2tErJG))

##### ※ `str.includes('3' || '6' || '9');`가 안되는 이유

or, and 연산자는 특이한 성질을 가지고 있다.  
- `3 || 4` or는 뒤를 볼 필요도 없어서 3을 반환
- `3 && 4` and는 둘다 true여야 true라고 결론을 내릴 수 있기 때문에 4까지 확인하고 4를 반환한다.
- `0 && 4` and는 앞에가 이미 falsy면 볼 필요없이 false이기 때문에 뒤를 볼 필요없이 0을 반환한다.
- `'3' || '6' || '9'` ('3' || '6' -> '3' || '9' -> '3')이 연산의 결과는 '3'이다.
결국에는 `str.includes('3' || '6' || '9');`는 `str.includes('3')`이 되어버린다.

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

#### 풀이

```js
function triangle(num) {
  let result = '*';
  let i = 1;
  while(i < num) {
    result += `\n${'* '.repeat(i + 1)}`;
    i++;
  }
  console.log(result);
}
```
```js
function triangle(num) {
  return num > 0 ? triangle(num - 1) + '\n' + '* '.repeat(num) : '';
}
// repl에서는 이상하네 나오는... 모르겠다...
```
```js
function stair(n) {
  for( let i = 1; i <= n; i++) {
    console.log('* '.repeat(i));
  }
}
```
```js
function stair(n) {
  let str = ''
  for( let i = 1; i <= n; i++) {
    str += '* ';
    console.log(str);
  }
}
```
아 이렇게 더할 수도 있겠구나...

중첩 반복문으로 해보라고 하셔서
```js
function stair(n) {
  for (let i = 0; i < n; i++) {
    let result = '';
    for(let j = 0; j < i + 1; j++) {
      result += ' *';
    }
    console.log(result);
  }
}
```
```js
function stair(n) {
  for (let i = 0; i < n; i++) {
    let result = '*';
    for(let j = 0; j < i; j++) {
      result += ' *';
    }
    console.log(result);
  }
}
```

#### 강사님과 푼 풀이

※ console.log는 `console.log('jfjfjfjfj')`이렇게 문자열을 한번 실행 시키고 나서 엔터가 들어간다.(줄바꿈이 된다.)

```js
function stair(n) {
  for (let i = 0; i < n; i++) {
    console.log('안쪽 루프 시작');
    for(let j = 0; j < i; j++) {
      console.log(`i: ${i}, j: ${j}`);
    }
    console.log('안쪽 루프 끝');
  }
}
stair(3)
// 안쪽 루프 시작
// 안쪽 루프 끝
// 안쪽 루프 시작
// i: 1, j: 0
// 안쪽 루프 끝
// 안쪽 루프 시작
// i: 2, j: 0
// i: 2, j: 1
// 안쪽 루프 끝
```
안쪽 루프의 결과(한줄 루프의 결과)만 먼저 생각하면 문제 풀기 쉬워진다.
```js
function line(n) {
  let str = '';
  for (let j = 0; j < n; j++) {
    str += '* ';
  }
  console.log(str);
}

line(2); 
// * *
```

```js
function stair(n) {
  for (let i = 0; i < n; i++) {
    let str = '';
    for(let j = 0; j < i + 1; j++) {
      str += '* ';
    }
    console.log(str);
  }
}
```
이런 중첩 반복문은 한줄을 어떻게 출력할지 먼저 생각해보는 식으로 접근하자
```js
function stair(n) {
  for (let i = 0; i < n; i++) {
    const str = '* '.repeat(i + 1);
    console.lot(str);
  }
}
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

#### 풀이

```js
function diamond(n) {
  for (let i = 0; i < n; i++) {
    const result = ' '.repeat(n - (i + 1)) +  '* '.repeat(i + 1);
    console.log(result);
  }
  for (let i = n - 1; i > 0; i--) {
    const result = ' '.repeat(n - i) +  '* '.repeat(i);
    console.log(result);
  }
}
```

#### 강사님과 풀이

```js
const n = 3;
const i = 1;

' '.repeat(n - (i + 1)) +  '* '.repeat(i + 1);
```
피라미드 위쪽(별이 증가하는)단계 완료하고 다시 거꾸로 가는(별이 감소) 단계로 나누어 생각
```js
function diamond(n) {
  for (let i = 0; i < n; i++) {
    const result = ' '.repeat(n - i - 1) +  '* '.repeat(i + 1);
    console.log(result);
  }
  for (let i = n - 2; i >= 0; i--) {
    const result = ' '.repeat(n - i - 1) +  '* '.repeat(i + 1);
    console.log(result);
  }
}
```
코드의 뭉치를 재사용, 중복된 부분을 함수로 만들어 준다.  
중복이 없어지고, 라인이라는 의미의 함수가 생겨서 어떤 실행인지 더 알기 쉬워짐.  
유지보수에 더 좋다.
```js
function line(n, i) {
  const result = ' '.repeat(n - i - 1) +  '* '.repeat(i + 1);
  console.log(result);
}
function diamond(n) {
  for (let i = 0; i < n; i++) {
    line(n, i);
  }
  for (let i = n - 2; i >= 0; i--) {
    line(n, i);
  }
}
```

아래와 같은 변형도 같은 결과가 나온다.
```js
function line(n, i) {
  const result = ' '.repeat(n - i - 1) +  '* '.repeat(i + 1);
  console.log(result);
}
function diamond(n) {
  for (let i = 0; i < n; i++) {
    line(n, i);
  }
  for (let i = 0; i < n - 1; i++) { // ++로 해도 같은 답이나온다.
    line(n, n - i - 2);
  }
}
```

### 문제 11

두 수를 입력받아서, 두 수의 최대공약수를 반환하는 함수를 작성하세요. ([유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)을 참고하세요.)

### 문제 12

세 수를 입력받아 큰 것부터 차례대로 출력하는 함수를 작성하세요.

#### 풀이

```js
function descendingOrder(x, y, z) {
  var arr = [x, y, z];
  arr.sort(function(a, b) {
    return b - a;
  });
  return arr;
}
```
답이 배열로 나오는거라..
```js
function descendingOrder(x, y, z) {
  var arr = [x, y, z];
  arr.sort(function(a, b) {
    return b - a;
  });
  arr.forEach(function(i){
    console.log(i);
  });
}
```
이렇게 하면 차례대로 나오기는 하는데
```js
function sort(x, y, z) {
  let arr = [x, y, z];
  arr.sort(function(a, b){
    return b - a;
  });
  for(let i = 0; i < 3; i++) {
    console.log(arr[i]);
  }
}
```

#### 강사님과 풀이

제일 단순한 방법. 숫자가 3개만 있으니까
```js
function sort(x, y, z) {
  // 셋 중에 제일 큰 놈을 따로 빼기
  let larger = x > y ? x : y;
  let smaller1 = x > y ? y : x;
  let max = larger > z ? larger : z;
  let smaller2 = larger > z ? z : larger;
  console.log(max);
  if (smaller1 > smaller2) {
    console.log(smaller1);
    console.log(smaller2);
  } else {
    console.log(smaller2);
    console.log(smaller1);
  }
}
```
삼항연산자로만 고칠경우
```js
function sort(x, y, z) {
  // 셋 중에 제일 큰 놈을 따로 빼기
  let larger = x > y ? x : y;
  let smaller1 = x > y ? y : x;
  let max = larger > z ? larger : z;
  let smaller2 = larger > z ? z : larger;
  console.log(max);
  smaller1 > smaller2 ? console.log(smaller1 + '\n' + smaller2) : console.log(smaller2 + '\n' + smaller1) 
}
```

### 문제 13

자연수 `n`을 입력받아, `n`번째 피보나치 수를 반환하는 함수를 작성하세요.