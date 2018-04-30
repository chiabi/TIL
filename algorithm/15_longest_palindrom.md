# 가장 긴 팰린드롬

> #while문, #for loop, #재귀함수, #arr.reverse()

date: 18.04.30

* [관련링크](https://programmers.co.kr/learn/challenge_codes/84)

> 앞뒤를 뒤집어도 똑같은 문자열을 palindrome이라고 합니다.
longest_palindrom함수는 문자열 s를 매개변수로 입력받습니다.
s의 부분문자열중 가장 긴 palindrom의 길이를 리턴하는 함수를 완성하세요.
예를들어 s가 토마토맛토마토이면 7을 리턴하고 토마토맛있어이면 3을 리턴합니다.

## 1. 풀이

```js
function longest_palindrom(s){
  let newStr = s;
  let reverse = [...s].reverse().join('');
  const arr = [];
  while (newStr) {
    const index = reverse.indexOf(newStr[0]);    
    const length = reverse.slice(index).length;
    if(newStr.substr(0, length) === reverse.slice(index)) {
      arr.push(length);
      newStr = newStr.slice(length);
      reverse = reverse.slice(0, index);
    } else {
      newStr = newStr.slice(1);
      reverse = reverse.slice(0, -1);
    }
  }
  return Math.max(...arr);
}

console.log( longest_palindrom("토마토맛토마토") )    // 7
console.log( longest_palindrom("토마토맛있어토마토마토") )    // 5
console.log( longest_palindrom("이늦은밤다들잠들다자꾸만꿈만꾸자") )    // 7
console.log( longest_palindrom("통술집술통다가져가다") )    // 5
console.log( longest_palindrom("저기저사람여보게저기저게보여") )    // 9
```

으아아아아ㅏ아아아아아앙 드디어 풀었어ㅠㅠㅠㅠㅠㅠㅠ  
간단한 팰린드롬 문제를 보기전에 이 문제부터 봐서 얼마나 멘붕이 왔었는지...  
무엇보다 이 문제가 프로그래머스의 레벨2로 올라와있어서 나는 이것도 풀지 못하는 똥멍충이라고 얼마나 자책했는데 지금보니 완료한 사람 수가 같은 레벨의 다른 문제에 비해 현저히 적었다.

일단 강사님이 내주신 문제 풀이 중 간단한 팰린드롬 문제를 풀면서 글자를 reverse시키면 수월하게 해결할 수 있다는 걸 알게되었다.  
그래서 이 점을 이용해 이 꼬아놓은 문제를 어떻게 풀 수 있을까 생각해봤는데,

1. 기존 문자열의 앞에서부터 일치하는 리버스 문자열의 인덱스를 찾는다.   
2. 일치하는 리버스 문자열의 인덱스부터 나머지 문자열을 자르고 그 길이만큼 기존 문자열을 잘라본다.
3. 만약 이 잘라낸 두 문자열이 일치하며 arr 배열에 push 한다. 그리고 그 문자열만큼 제거한 기존 문자열과 새로운 문자열로 다시 1번부터 시작한다.
4. 아니라면 기존 문자열을 앞에서 하나, 리버스 문자열은 뒤에서 하나 제거한 새로운 문자열로 다시 1번부터 시작한다.
5. while문의 조건은 newStr이 남아있을때까지로 한다.  
문자열이 일치해서 제거하거나, 아니라서 문자열 하나씩 제거하는 식으로 문자열을 제거해 왔기때문에 최종에 빈문자열이 나오니까 종료된다.
6. 길이를 담은 배열 중 가장 큰 수를 반환한다.

이렇게 하면 모든 문자열을 다 돌지 않아도 일치되는 문자열이 나오면 뭉텅이로 제거해서 그 다음 문자열부터 검사하니까 훨씬 빠르게 종료된다.

```
토마토맛있어토마토마토
토마토마토어있맛토마토

토, 마, 토는 차례로 4번에 맞아 제거된다.

맛있어토마토마토
토마토마토어있맛

맛, 있, 어는 차례로 3번에 맞아 그 길이가 배열에 추가된 뒤 제거된다. [1, 1, 1]

토마토마토
토마토마토

토마토마토는 3번에 맞아 그 길이가 배열에 추가된 뒤 제거된다. [1, 1, 1, 5];

결과는 5가 출력된다.
```
```
마토맛있어토마토마토 토마토마토어있맛토마
토맛있어토마토마토 토마토마토어있맛토
맛있어토마토마토 토마토마토어있맛
있어토마토마토 토마토마토어있
어토마토마토 토마토마토어
토마토마토 토마토마토
```
만약 팰린드롬인 문자열을 다 찾아야하는 문제라면 문제가 있을 수 있는데('토마토'가 그냥 제거된 것 처럼) 가장 긴 팰리드롬을 구하려면 알맞게 결과가 나온다.  

## 2. 다른 사람 풀이

### 2-1. 재귀함수

작성자: 진현성

```js
function longest_palindrom(s){
  // 함수를 완성하세요
  if (s === s.split("").reverse().join("")) {
    return s.length;
  } else {
    var A = longest_palindrom(s.substring(0, s.length-1));
    var B = longest_palindrom(s.substring(1, s.length));
    return Math.max(A, B);
  }
}
```

재귀함수로 푼 사람 분명 있을거라고 생각했는데 역시나...  
일단 리버스한 문자열과 기존 문자열이 정확히 일치하면 그 길이를 반환하고

아니라면 재귀함수를 돌리는데 앞에서 잘라보고, 뒤에서 잘라본 문자열을 계속 비교하는 걸 재귀함수를 통해 수행하고 그 중 리턴된 문자열 길이가 가장 긴 것을 반환하는 것 같다.

그런데 예상대로 검사하는 문자열이 길면 너무 오래걸린다;; 단순히 for문으로 해결할 수 있는 문제라서 더욱 그런 것 같다.

### 2-2. for loop

작성자: 이슬기

```js
function longest_palindrom(s){
  var result = 0;
  var sumtext = '';
  var reverstext = '';
  // 함수를 완성하세요

  for (var i = 0; i < s.length; i++) {
    sumtext ='';
    for (var j = i; j < s.length; j++) {
      sumtext += s[j]
      reverstext = sumtext.split('').reverse().join('');
      if (sumtext === reverstext && sumtext.length > result) { 
        result = sumtext.length;
      }
    }
  }
  return result;
}
```
for루프 2번 이용한 것 사실 for루프 두번 써서 풀어보려다 쓰면 어떻게 실행되는지 너무 머리로 인지하기 어려워서😿 while문으로 풀어내는 방법을 고민했다...  
for루프를 두번 쓰는 것은 초기값, 실행 조건, 갱신에 각각 뭐가 들어갔는지 패턴으로 기억해야 될 것 같다.

음 이 문제는 기존 문자열을 앞에서부터... 음 뭐지???ㅋㅋㅋㅋ그려야겠다. 그냥 보려니 모르겠네
```
[토]마토맛있어토마토마토
[토]
```
이렇게 문자가 일치하고 그 sumtext 길이가 기존 result에 담은 수보다 크면 다시 길이를 담는다. (아.. 이러면 굳이 배열과 Math.max()과정이 필요없겠다.)
이런식으로 처리하다보면
```
[토마토]맛있어토마토마토
[토마토] 
```
여기서 result는 3이된다.
```
[토마토맛]있어토마토마토
[맛토마토]
```
'맛, 있, 어'부터는 리버스 문자열과 일치하지 않는다. 아무튼 이런식으로 모든 문자열을 검색하고(??)
```
[마토]맛있어토마토마토
[토마]
``` 
이렇게 다음 문자열부터 모든 문자열을 검색하는 거 또 돌고(?????) 다음 문자열부터 남은 모든 문자열을 비교하는 걸 다 수행하다보면
```
[토마토마토]
[토마토마토]
```
여기서 5가 출력되는데...멈추지 않어... 이거 계속 도는 구나... 콘솔 찍어보니 어마어마했다. 

### 2-3. for loop

작성자: 한정규

```js
function longest_palindrom(s){
  var result = 1,j;

  for ( var i = 1; i < s.length - 1; i++ ) {
    j = 1; 
    while ( i >= j && i + j <= s.length && s[i + j] === s[i - j] ) {
      j++;
    } 
    if ( j * 2 - 1 > result ) result = j * 2 - 1;
  }

  return result;
}
```

이렇게 푼 사람이 몇 보였고, 속도도 굉장히 빨랐다. (내가 푼 것보다 훨씬 빨랐...)  
근데 코드는 읽기 어려워서 이것도 일단 그려봐야겠다.

1. i가 j보다 크거나 같고
2. i랑 j를 합친게 문자열 길이보단 같거나 작아야하며
3. 문자열[i + j] 인덱스의 문자와 문자열[i - j] 인덱스의 문자가 같으면

j를 더함???

그렇게 해서 j에 2곱하고 1 뺀 수가 result 보다 크면 그값을 result에 담는다. 그리고 i를 갱신한다. 이 과정은 문자열 길이 - 1만큼 반복된다.(??????)

이거 범인이 생각해낼 수 있는 건가..끄응....대단하다..
```js
function longest_palindrom(s){
  var result = 1,j;

  for ( var i = 1; i < s.length - 1; i++ ) {
    j = 1; 
    while ( i >= j && i + j <= s.length && s[i + j] === s[i - j] ) {
      console.log(s[i + j], i + j);
      console.log(s[i - j], i - j);
      j++;
    } 
    if ( j * 2 - 1 > result ) result = j * 2 - 1;
  }

  return result;
}
longest_palindrom("토마토맛있어토마토마토")
```
```
1 1
토 2   토마[토]맛있어토마토마토
토 0   [토]마토맛있어토마토마토

7 1
토 8   토마토맛있어토마[토]마토
토 6   토마토맛있어[토]마토마토

8 1
마 9   토마토맛있어토마토[마]토
마 7   토마토맛있어토[마]토마토

8 2
토 10  토마토맛있어토마토마[토]
토 6   토마토맛있어[토]마토마토
(3 * 2 - 1 = 5)

9 1
토 10  토마토맛있어토마토마[토]
토 8   토마토맛있어토마[토]마토 
```

으 보고도 모르겠다..