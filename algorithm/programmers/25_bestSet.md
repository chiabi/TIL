# 최고의 집합

> #for loop, #while, #arr.sort(), #Math.floor(), #new Array(), #arr.fill()

date: 18.05.08

* [문제링크](https://programmers.co.kr/learn/challenge_codes/39)

> 자연수 N개로 이루어진 집합 중에, 각 원소의 합이 S가 되는 수의 집합은 여러 가지가 존재합니다. 최고의 집합은, 위의 조건을 만족하는 집합 중 각 원소의 곱이 최대가 되는 집합을 의미합니다. 집합 원소의 개수 n과 원소들의 합 s가 주어지면, 최고의 집합을 찾아 원소를 오름차순으로 반환해주는 bestSet 함수를 만들어 보세요. 만약 조건을 만족하는 집합이 없을 때는 배열 맨 앞에 –1을 담아 반환하면 됩니다. 예를 들어 n=3, s=13이면 [4,4,5]가 반환됩니다.
(자바는 집합이 없는 경우 크기가 1인 배열에 -1을 담아 반환해주세요.)

## 1. 풀이

```js
function bestSet(n, s) {
  const arr = [];
  if(s / n < 1) return [-1];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(s / n));
  } 
  for (let i = 0; i < s % n; i++) {
    arr[i]++;
  }
  return arr.sort((a, b) => a - b);
}

console.log(bestSet(3,13));
```
수가 n으로 나눠지지 않으면 n개의 수의 집합이 만들어지지 않으니까 [-1] 배열을 반환하고  
집합 원소의 곱이 최대가 되기 위해서 수를 n으로 나눈 수의 배열을 먼저 만들고 수를 n으로  
나눴을 때 나머지 만큼을 다시 앞에서부터 반복문을 통해 추가해 준뒤 오름차순한 배열을 반환

```js
function bestSet(n, s) {
  if(s / n < 1) {
    return [-1];
  } else {
    const arr = new Array(n).fill(Math.floor(s / n));
    for (let i = 1; i <= s % n; i++) {
      arr[arr.length - i]++;
    }
    return arr;
  }
}
console.log(bestSet(3,13));
```
배열을 만드는 부분을 new Array()랑 fill메소드로 수정하고 sort 메소드를 안쓰기 위해 배열 뒤에서부터 더해주는 식으로 반복문 수정함

```js
function bestSet(n, s) {
  if(s / n < 1) {
    return [-1];
  } else {
    const arr = new Array(n).fill(Math.floor(s / n));
    let i = 1;
    while(i <= s % n) {
      arr[arr.length - i]++;
      i++;
    }
    return arr;
  }
}
console.log(bestSet(3,13));
```
반복문을 while문으로 해본 거