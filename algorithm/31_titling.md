# 2 x n 타일링

> #재귀함수, #피보나치수열

date: 18.05.20

* [문제링크](https://programmers.co.kr/learn/challenge_codes/54)

> 1x1 정사각형 2개가 붙어 있는 타일이 있습니다. 이 타일을 이용하여 총 2xN 의 보드판을 채우려고 합니다.  
> 타일은 가로, 세로 두 가지 방향으로 배치할 수 있습니다.
> 
> 보드판의 길이 N이 주어질 때, 2xN을 타일로 채울 수 있는 경우의 수를 반환하는 tiling 함수를 완성하세요.
> 
> 단, 리턴하는 숫자가 매우 커질 수도 있으므로 숫자가 5자리를 넘어간다면 맨 끝자리 5자리만 리턴하세요.예를 들어 N = 2일 경우 가로로 배치하는 경우와 세로로 배치하는 경우가 있을 수 있으므로 2를 반환해 주면 됩니다. 하지만 만약 답이 123456789라면 56789만 반환해주면 됩니다. 리턴하는 숫자의 앞자리가 0일 경우 0을 제외한 숫자를 리턴하세요. 리턴타입은 정수형이어야 합니다.

## 1. 풀이

```js
function tiling(n) {
  const save = {};
  const fibo = n => {
    if (n < 3) {
      return n;
    } else {
      const cases1 = save[n - 1] || fibo(n - 1);
      const cases2 = save[n - 2] || fibo(n - 2);
      const result = cases1 + cases2;
      save[n] = result;
      return parseInt(result.toString().slice(-5));
    }
  }
  return fibo(n);
}
```

피보나치 수열로 풀어야겠다는 건 알았는데, 배열을 활용한다든지, `% 100000` 으로 구하면 될거라는 걸 몰라서 아주 무식하게 풀었다.

```js
function tiling(n) {
  let result = 0;
  const arr = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 100000;
  }
  result = arr[arr.length - 1];
  return result;
}
```

다른 사람들 풀이를 읽어보니 배열에 메모제이션하면서 굉장히 코드도 짧고 훨씬 빠르게 풀 수 있었다.  
으....