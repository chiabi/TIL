### 문제 1

두 문자열을 입력받아, 대소문자를 구분하지 않고(case insensitive) 두 문자열이 동일한지를 반환하는 함수를 작성하세요.

예:
```
insensitiveEqual('hello', 'hello'); -> true
insensitiveEqual('hello', 'Hello'); -> true
insensitiveEqual('hello', 'world'); -> false
```

#### 풀이

```js
function insensitiveEqual(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase() ? true : false;
}
```
```js
function insensitiveEqual(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase() ? true : false;
}
```

#### 강사님과 풀이

대소문자 구분없이 비교 -> 모두 소문자화하거나 대문자로 만들어주고 비교
```js
function insensitiveEqual(str1, str2) {
  if (str1.toLowerCase() === str2.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}
```
```js
function insensitiveEqual(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase() ? true : false;
}
```

### 문제 2

문자열 `s`와 자연수 `n`을 입력받아, 만약 `s`의 길이가 `n`보다 작으면 `s`의 왼쪽에 공백으로 추가해서 길이가 `n`이 되게 만든 후 반환하고, 아니면 `s`를 그대로 반환하는 함수를 작성해보세요.

예:
```
leftPad('hello', 8); -> '   hello'
leftPad('hello', 3); -> 'hello'
```

#### 풀이

```js
function leftPad(s, n) {
  return s.length >= n ? s : s.padStart(n); 
}
```

#### 강사님과 풀이

```js
function leftPad(str, num) {
  if ( str.length < num ) {
    // 공백 추가 후 반환
    const spaceLength = num - str.length;
    return ' '.repeat(spaceLength) + str;
  } else {
    return str;
  }
}
```

### 문제 3

문자열을 입력받아, 문자열 안에 들어있는 모든 모음(a, e, i, o, u)의 갯수를 반환하는 함수를 작성하세요.

#### 풀이

```js
function countVowel(str) {
  let arr = str.split('');
  let result = []
  for(let i = 0; i < str.length; i++) {
    if (/a|e|i|o|u/i.test(str[i])) result.push(str[i]);
  }
  return result.length;
}
```
```js
function countVowel(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if(str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u'){
      count++;
    }
  }
  return count;
}
```
```js
function countVowel(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if( /a|e|i|o|u/i.test(str[i])) {
      count++;
    }
  }
  return count;
}
```

#### 강사님과 풀이

```js
function countVowel(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if(str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u'){
      count++;
    }
  }
  return count;
}
```
```js
function countVowel(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (
      str[i].includes('a') ||
      str[i].includes('e') ||
      str[i].includes('i') ||
      str[i].includes('o') ||
      str[i].includes('u')
    ) {
      count++;
    }
  }
  return count;
}
```

### 문제 4

문자열을 입력받아, 해당 문자열에 포함된 문자의 종류와 갯수를 나타내는 객체를 반환하는 함수를 작성하세요.

예:
```
countChar('tomato'); -> {t: 2, o: 2, m: 1, a: 1}
```

객체 접근법 관련: 점 표기법, 대괄호 표기법
```javascript
const obj = {a: 1, b: 2}
// undefined
obj.a
// 1
obj['a']
// 1
obj['hello world'] = 3
// 3
obj.hello world
// unknown: Unexpected token (1:10)
// > 1 | obj.hello world
//     |           ^
obj[hello world]
// unknown: Unexpected token (1:10)
// > 1 | obj[hello world]
//     |           ^
obj['hello world']
//  3

// ※
const propName = 'hello world'
//  undefined
obj[propName]
//  3
obj.propName
//  undefined
```

```js
const char = 't';
// undefined
const obj = {}
// undefined
obj[char] = 1
// 1
obj
// { t: 1 }
obj.t
// 1
obj['t']
// 1
const char2 = 'o'
// undefined
obj[char2] = 1;
// 1
obj
// {t: 1, o: 1}
obj[char]++
// 1
obj
// {t: 2, o: 1}
```

#### 풀이

```js
function countChar(str) {
  const obj = {}; // 객체 속성 값은 변경될 수 있다.
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] === undefined) {
      obj[str[i]] = 1;
    } else {
      obj[str[i]]++;
    }
  }
  return obj;
}
```
null check 참고해서 더 줄이면
```js
function countChar(str) {
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    obj[str[i]] == null ? obj[str[i]] = 1 : obj[str[i]]++;
  }
  return obj;
}
```
#### 강사님과 풀이

```js
function countChar(str) {
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    console.log(char);
  }
}
countChar('tomato');
// t
// o
// m
// a
// t
// o
```

```js
function countChar(str) {
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    // console.log(char);
    // 만약 속성이 없다면 
    
    // ※ null check
    // 요기 등호 2개짜리라면 null이어도 되고 undefined여도 된다.
    if (obj[char] == null) {
      // 속성 값에 1 저장
      obj[char] = 1;
    } else {
      obj[char]++
    }
  }
  return obj;
}
```


### 문제 5

문자열을 입력받아 그 문자열이 회문(palindrome)인지 판별하는 함수를 작성하세요. (회문이란, '토마토', 'never odd or even'과 같이 뒤에서부터 읽어도 똑같이 읽히는 문자열을 말합니다.)

#### 풀이

```js
function palindrome(str) {
  let trimStr = str.replace(/\s/g, '');
  let l = trimStr.length - 1;
  for(let i = 0; i < l / 2; i++) {
    // 중간 문자를 제외하고 하나씩 비교
    if(trimStr[i] !== trimStr[l - i]) {
      return '이 문자열은 회문이 아닙니다.';
    }
  }
  return '이 문자열은 회문입니다.';
}
palindrome('never odd or even'); // 이 문자열은 회문입니다.
```
`str.replace(' ', '')`이렇게 하면 모든 공백을 교체해주는 줄 알았는데 첫번째 매개변수로 문자열을 넣으면 한번만 교체해줘서  
`'never odd or even'.replace(' ', '')`이 것의 결과는 `neveroddoreven`이 아니라 `neverodd or even`이다... 

정규식을 쓰니까 `neferoddoreven`이 되었는데 공백을 제거하는 다른 방법을 또 찾아봐야겠다.  
단순하게 생각해본 거는 일단 공백을 기준으로 배열로 만들어서 하나의 문자열로 만들 수 없을까나...해서 공백 제거부분 수정
```js
function palindrome(str) {
  // 배열로 나눈걸 다시 문자열로
  let trimStr = str.split(' ').join('');
  let l = trimStr.length - 1;
  for(let i = 0; i < l / 2; i++) {
    if(trimStr[i] !== trimStr[l - i]) {
      return '이 문자열은 회문이 아닙니다.';
    }
  }
  return '이 문자열은 회문입니다.';
}
```

### 문제 6

문자열을 입력받아, 그 문자열의 모든 '부분 문자열'로 이루어진 배열을 반환하는 함수를 작성하세요.

예:
```
subString('햄버거');
// 결과: ['햄', '햄버', '햄버거', '버', '버거', '거']
```

#### 풀이

※ `str.substr(start[, length])`: 시작 인덱스부터 길이만큼 새로운 문자열 반환

```js
// str.substr(0, 1)
// str.substr(0, 2)
// str.substr(0, 3)
// str.substr(1, 1)
// str.substr(1, 2)
// str.substr(2, 1)
function subString(str) {
  let arr = [];
  let l = str.length;
  for (let i = 0; i < l; i++) {
    for(let j = 0; j < (l - i); j++) {
      arr.push(str.substr(i, j + 1));
    }
  }
  return arr;
}
```

※ [`str.substring(indexStart[, indexEnd])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/substring): 시작 인덱스부터 끝 인덱스(제외)까지
```js
// str.substring(0, 1)
// str.substring(0, 2)
// str.substring(0, 3)
// str.substring(1, 2)
// str.substring(1, 3)
// str.substring(2, 3)
function subString(str) {
  let arr = [];
  let l = str.length;
  for (let i = 0; i < l; i++) {
    for(let j = 0; j < (l - i); j++) {
      arr.push(str.substring(i, i + j + 1));
    }
  }
  return arr;
}
```
※ [`str.slice(beginIndex[, endIndex])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/slice):  문자열의 일부를 추출하면서 새로운 문자열을 반환
```js
function subString(str) {
  let arr = [];
  let l = str.length;
  for (let i = 0; i < l; i++) {
    for(let j = 0; j < (l - i); j++) {
      arr.push(str.slice(i, i + j + 1));
    }
  }
  return arr;
}
```
substring이랑 slice 둘다 결과가 같은데 무슨 차이인지 찾아봐야겠다.  

### 문제 7

문자열을 입력받아, 해당 문자열에서 중복된 문자가 제거된 새로운 문자열을 반환하는 함수를 작성하세요.

예:
```
removeDuplicates('tomato'); -> 'toma'
removeDuplicates('bartender'); -> 'bartend'
```

#### 풀이

```js
// 전에 set이 유니크 데이터를 만들어 준다고 들어서 ES6방식으로 품
// 잘은 몰라서 배열에 다시 담는 방법을 썼는데 나중에 Set 공부하면 그때 다시 풀어보면 좋을 듯
let removeDuplicates = (str) => { 
  let arr = [];
  for(let i of new Set(str)) {
    arr.push(i);
  }
  return arr.join('');
}
```

```js
// arr.includes()를 이용해서 배열에 없으면 추가한뒤 해당 배열을 문자열로 반환
function removeDuplicates(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (!arr.includes(str[i])) arr.push(str[i]);
  }
  return arr.join('');
}
```

### 문제 8

이메일 주소를 입력받아, 아이디 부분을 별표(`*`)로 가린 새 문자열을 반환하는 함수를 작성하세요.

- 루프로 먼저 풀어보세요.
- `split` 메소드를 이용해서 풀어보세요.

#### 풀이

```js
// 루프로 먼저 풀어본 풀이
function saveEmailId(email) {
  let result = email;
  for (let i = 0; i < email.length; i++) {
    if(email[i] === '@') { // @만나면 함수 종료
      return result;
    }
    result = result.replace(email[i], '*');
  }
  return result;
}

saveEmailId('chiabi88@gmail.com'); // '********@gmail.com'
```

```js
// @위치 구해서 id랑 id 길이 구해서 id부분을 id길이만큼 반복한 *로 교체
function saveEmailId(email) {
  let id = email.slice(0, email.indexOf('@'));
  return email.replace(id, '*'.repeat(id.length));
}
```

```js
// split를 이용한 방법
function saveEmailId(email) {
  let arr = email.split('@');
  arr[0] = '*'.repeat(arr[0].length);
  return arr.join('@');
}
```

### 문제 9

문자열을 입력받아, 대문자는 소문자로, 소문자는 대문자로 바꾼 결과를 반환하는 함수를 작성하세요.

#### 풀이

```js
function toTextTransform(str) {
  var arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] === arr[i].toLowerCase() ? arr[i].toUpperCase() : arr[i].toLowerCase();
  }
  return arr.join('');
}
toTextTransform('Hello'); // hELLO
```
다른 방법도 찾아보려고 했는데 생각나지 않는다...

### 문제 10

문자열을 입력받아, 각 단어의 첫 글자를 대문자로 바꾼 결과를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

#### 풀이

```js
function toCapitalize(str) {
  let arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(arr[i][0], arr[i][0].toUpperCase());
  }
  return arr.join(' ');
}
toCapitalize('hello world! hello javascript!'); // 'Hello World! Hello Javascript!'
```

```js
function toCapitalize(str) {
  let arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    let subArr = arr[i].split('');
    subArr[0] = subArr[0].toUpperCase();
    arr[i] = subArr.join('');
  }
  return arr.join(' ');
}
```

### 문제 11

문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

### 문제 12

문자열 `s`과 자연수 `n`을 입력받아, `s`의 첫 `n`개의 문자만으로 이루어진 새 문자열을 반환하는 함수를 작성하세요.

### 문제 13

Camel case의 문자열을 입력받아, snake case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.

### 문제 14

Snake case의 문자열을 입력받아, camel case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.

### 문제 15

`String.prototype.split`과 똑같이 동작하는 함수를 작성하세요.

예:
```
split('Hello World'); -> ['Hello World']
split('Hello World', ' '); -> ['Hello', 'World']
split('let,const,var', ',') -> ['let', 'const', 'var']
```

### 문제 16

2진수를 표현하는 문자열을 입력받아, 그 문자열이 나타내는 수 타입의 값을 반환하는 함수를 작성하세요. (`parseInt`를 사용하지 말고 작성해보세요.)

예:
```
convertBinary('1101'); -> 13
```

### 문제 17

숫자로만 이루어진 문자열을 입력받아, 연속된 두 짝수 사이에 하이픈(-)을 끼워넣은 문자열을 반환하는 함수를 작성하세요.

예:
```
insertHyphen('437027423'); -> '4370-274-23'
```