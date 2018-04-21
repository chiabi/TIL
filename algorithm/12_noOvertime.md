# 야근 지수

> #관련키워드

date: 18.04.21

* [관련링크](https://programmers.co.kr/learn/challenge_codes/27)

> 회사원인 수민이는 많은 일이 쌓여 있습니다. 수민이는 야근을 최소화하기 위해 남은 일의 작업량을 숫자로 메기고, 일에 대한 야근 지수를 줄이기로 결정했습니다. 야근 지수는 남은 일의 작업량을 제곱하여 더한 값을 의미합니다. 수민이는 1시간 동안 남은 일 중 하나를 골라 작업량 1만큼 처리할 수 있습니다. 수민이의 퇴근까지 남은 N 시간과 각 일에 대한 작업량이 있을 때, noOvertime 함수를 제작하여 수민이의 야근 지수를 최소화 한 결과를 출력해 주세요. 예를 들어, N=4 일 때, 남은 일의 작업량이 [4, 3, 3] 이라면 야근 지수를 최소화하기 위해 일을 한 결과는 [2, 2, 2]가 되고 야근 지수는 22 + 22 + 22 = 12가 되어 12를 반환해 줍니다.

## 1. 풀이

```js
function noOvertime(no, works) {
  let n = no;
  let newWorks = works;
  // 새로운 배열에서 가장 큰 수 기준으로
  // [i] >= n(5) && n !== 0 [0](5) -1 [1](3) 0 [2](2)0
  // [i] >= n(4) && n !== 0 [0](4) -1 [1](3) 0 [2](2)0
  // [i] >= n(3) && n !== 0 [0](3) -1 [1](3) 0 [2](2)0
  // [i] >= n(2) && n !== 0 [0](2) -1 [1](2) -1 [2](2)0
  const maxMinus = item => {
    if(item >= Math.max(...newWorks) && n > 0) {
      n--;
      return --item;
    }else {
      return item;
    }
  }
  while(n > 0) {
    newWorks = newWorks.map(maxMinus);
    console.log(newWorks);
  }
	return newWorks.reduce((acc, item) => acc + Math.pow(item, 2), 0);
}
noOvertime(4, [4, 3, 3]); // 12
noOvertime(25,[16,20,18,13,18,20]) // 1068
```

```js
function noOvertime(no, works) {
  let newWorks = works.sort((a, b) => b - a);
  for (let i = 0, n = no; n > 0; ) {
    newWorks = newWorks.sort((a, b) => b - a);
    if(newWorks[i] >= newWorks[i + 1]) {
      newWorks[i]--;
      n--;
    } else {
      i++;
    }
  }
  return newWorks.reduce((acc, item) => {
	  return acc + Math.pow(item, 2);
	}, 0);
}
noOvertime(4, [4, 3, 3]); // 12
noOvertime(25,[16,20,18,13,18,20]) // 1068
```