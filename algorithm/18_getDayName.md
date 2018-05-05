# 2016년

> #Date객체와 메소드

date: 18.05.03

* [문제링크](https://programmers.co.kr/learn/challenge_codes/178)

> 2016년 1월 1일은 금요일입니다. 2016년 A월 B일은 무슨 요일일까요? 두 수 A,B를 입력받아 A월 B일이 무슨 요일인지 출력하는 getDayName 함수를 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각
>
>`SUN,MON,TUE,WED,THU,FRI,SAT`
>
> 를 출력해주면 됩니다. 예를 들어 A=5, B=24가 입력된다면 5월 24일은 화요일이므로 `TUE`를 반환하면 됩니다.

## 1. 풀이

처음에 Date 객체를 썼다가 결과가 기대한대로 안나와서 일단 일자를 다 저장한 배열을 만들어 풀었는데, 
```js
function getDayName(a,b){
  const date = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const day = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
  const accDate = a > 1 ? date.slice(0, a - 1).reduce((acc, item) => acc + item, 0) + b : b;
  return day[accDate % 7];
}
```
생각해보니 월이 0부터 시작한다는 걸 고려안하고 a로 받아서 그런것 같아서 a - 1로 넣었더니 맞게 나옴
```js
function getDayName(a,b){
  const date = new Date(2016, a - 1, b);
  const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return day[date];
}
```

Date 객체 메소드를 보니까 `toString()`이라고 
```
Fri Jan 01 2016 00:00:00 GMT+0900 (대한민국 표준시)
```
이렇게 문자열로 출력해주는 메소드가 있음
`toDateString()` 메소드는 시간 부분 제외하고 날짜만 출력해줌
```
Fri Jan 01 2016
```
```js
function getDayName(a,b){
  return new Date(2016, a - 1, b).toDateString().slice(0, 3).toUpperCase();
}
```

## 2. 다른 사람 풀이

### 2-1. Date 객체

작성자: 류한경

```js
function getDayName(a,b){
  var arr = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  var date = new Date(`2016-${a}-${b}`);
  var day = date.getDay()
  return arr[day];
}
```
dateString 형태로 넣으면 a - 1을 하지 않아도 됨

Date 생성자 호출 시 인자로 전달 가능한 형식
```js
new Date(); // 현재 시각
new Date(value); 
// 국제 표준시 기준, 1970년 1월 1일 00:00:00 부터의 시간을 밀리초 단위로 표현한 정수값
new Date(dateString); // 날짜를 표현하는 문자열값
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
// 월 부분은 0 - 11, 월 이후의 인수를 생략하면 일은 1로 나머지는 0으로 지정
```

## 3. 관련링크

+ [MDN - Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)
