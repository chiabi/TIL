# 핸드폰번호 가리기

> #정규식, #str.substr(), #str.slice()

date: 18.04.21

* [문제링크](https://programmers.co.kr/learn/challenge_codes/132)

> 별이는 헬로월드텔레콤에서 고지서를 보내는 일을 하고 있습니다. 개인정보 보호를 위해 고객들의 전화번호는 맨 뒷자리 4자리를 제외한 나머지를 "*"으로 바꿔야 합니다.
전화번호를 문자열 s로 입력받는 hide_numbers함수를 완성해 별이를 도와주세요
예를들어 s가 `"01033334444"`면 `"*******4444"`를 리턴하고, `"027778888"`인 경우는 `"*****8888"`을 리턴하면 됩니다.

## 1. 풀이

```js
function hide_numbers(s){
  let result = '*'.repeat((s.length - 4)).concat(s.substr(-4, 4));
  return result;
}
```
```js
function hide_numbers(s){
  let result = `${'*'.repeat(s.length - 4)}${s.substr(-4, 4)}`;
  return result;
}
```
이걸 정규식으로 풀어보려구 했는데 결국 못 풀었다.ㅠㅠ  
concat이라고 문자열 결합하는 메소드가 있기는 한데 그냥 +연산자가 문자열템플릿 리터럴 쓰는게 메소드 하나 더 쓰는 것보단 나을 듯하다.

## 2. 다른 사람 풀이

### 2-1. 정규표현식

작성자: 정두식

```js
function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}

hide_numbers('01033334444')

```

내가 이렇게 풀어보려고 한건데...ㅠㅠㅠㅠ 나는 저부분을 `/\d*(?=\d{4}$)/g` 이렇게 작성했는데 
이렇게 작성하면 뒤의 숫자문자열 4개를 제외한 문자열 뭉치를 찾는다. 문자 하나씩 찾는 방법이 없을까 했었는데  
저 코드를 보니 뒤에 `$`와 `*`가 없었어야 했다. 특히 `$`는 바로 앞에 하나만 찾게 될테니까...  

### 2-2. str.slice()

작성자: 안다인

```js
function hide_numbers(s){
  var result = "*".repeat(s.length - 4) + s.slice(-4);

  return result;
}
hide_numbers('01033334444')
```

나는 뒤의 4글자래서 글자 수를 기준으로 찾는 `substr`만 생각했는데 이걸보니 `slice`에 음수를 넣으면 뒤에서부터 4개 앞의 문자열부터 2번째 인수가 생략되어있으니 문자열 끝까지 찾는 다는게 떠올랐다.