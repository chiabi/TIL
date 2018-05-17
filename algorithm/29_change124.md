# 124나라의 숫자

> #재귀함수

date: 18.05.17

* [문제링크](https://programmers.co.kr/learn/challenge_codes/48)

> 1,2,4 세 개의 숫자만 쓰는 124나라가 있습니다.
> 
> 124나라에서 사용하는 숫자는 다음과 같이 변환됩니다.
> 
> + 10진법의 1 → 1
> + 10진법의 2 → 2
> + 10진법의 3 → 4
> + 10진법의 4 → 11
> + 10진법의 5 → 12
> + 10진법의 6 → 14
> + 10진법의 7 → 21
> 10진법의 수 N이 입력될 때, 124나라에서 쓰는 숫자로 변환하여 반환해주는 change124 함수를 완성해 보세요. 예를 들어 N = 10이면 “41”를 반환해주면 됩니다.  
리턴 타입은 문자열입니다.

## 1. 풀이

```js

function change124(n) {
  const world = ['4', '1', '2'];
  let str = '';
  if (n / 3 <  1 || (n / 3 === 1 && n % 3 === 0)) {
    str += world[n % 3];
    return str;
  } else {
    str = change124(Math.floor(n % 3 === 0 ? (n - 1) / 3 : n / 3)) + world[n % 3]
    return str;
  }
}
console.log(change124(1)) // 1
```
처음 풀이는 이거였는데, 생각해보니 124순서대로 배열에서 뽑고 n - 1하면 if문에서의 표현식이 줄어들고 재귀함수 호출하는 부분에는 굳이 삼항연산을 할 필요가 없었다.
```js
function change124(n) {
  const arr = ['1', '2', '4'];
  if ((n - 1) / 3 < 1) {
    return arr[(n - 1) % 3];
  } else {
    return change124(Math.floor((n - 1) / 3)) + arr[(n - 1) % 3]
  }
}
console.log(change124(1)) // 1
console.log(change124(12)); // 44
console.log(change124(541644380)); // 441141411424441222
```

## 2. 다른 사람 풀이

### 2-1. 

작성자: 코더

```js
function change124(n) {
  return n === 0 ? '' : change124(parseInt((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(change124(10));
```

3까지는 재귀함수 안쓰려고 했는데 그 부분까지 재귀함수로 돌리면 이렇게 한 줄로도 가능하겠구나.