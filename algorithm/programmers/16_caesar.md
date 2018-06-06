# 시저 암호

> #str.charCodeAt(), #str.formCharCode()

date: 18.05.01

* [문제링크](https://programmers.co.kr/learn/challenge_codes/24)

> 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.
A를 3만큼 밀면 D가 되고 z를 1만큼 밀면 a가 됩니다. 공백은 수정하지 않습니다.
보낼 문자열 s와 얼마나 밀지 알려주는 n을 입력받아 암호문을 만드는 caesar 함수를 완성해 보세요.
> + “a B z”,4를 입력받았다면 “e F d”를 리턴합니다.

## 1. 풀이

```js
// A - 65
// Z - 90
// a - 97
// z - 122
function caesar(s, n) {
	var result = "";
	// 함수를 완성하세요.
	const newN = n % 26;
	return [...s].map(item => {
	  const code = item.charCodeAt(0);
	  if (code !== 32 && code <= 90) {
	    return String.fromCharCode(code + newN > 90 ? code + newN - 26 : code + newN);
	  } else if (code !== 32 && code <= 122) {
	    return String.fromCharCode(code + newN > 122 ? code + newN - 26 : code + newN);
	  } else {
	    return ' ';
	  }
	}).join('');
}
```

+ `str.charCodeAt(index)`: 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
  - index: 0 이상이고 문자열의 길이보다 작은 정수. 숫자가 아니라면 0을 기본값으로 사용함. 
  - 반환값: 주어진 인덱스 대한 문자에 대한 UTF-16 코드를 나타내는 숫자. 범위 밖으로 넘어갔을 경우 NaN
+ `str.fromCharCode(num[1, ...[, numN]])`: 지정된 UTF-16 코드 단위 시퀀스에서 생성 된 문자열을 반환
  - numN : UTF-16 코드 단위 인 일련의 숫자. 범위는 0 ~ 65535 (0xFFFF). 0xFFFF보다 큰 숫자는 잘린다. 유효성 검사는 수행되지 않는다.
  - 반환값: N 개의 지정된 UTF-16 코드 단위로 구성되는 길이가 N 인 문자열

## 3. 관련링크

+ [MDN - String.prototype.fromCharCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
+ [MDN - String.prototype.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)