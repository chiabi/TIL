# 행렬의 곱셈

> #for loop

date: 18.05.05

* [관련링크](https://programmers.co.kr/learn/challenge_codes/142)

> 행렬의 곱셈은, 곱하려는 두 행렬의 어떤 행과 열을 기준으로, 좌측의 행렬은 해당되는 행, 우측의 행렬은 해당되는 열을 순서대로 곱한 값을 더한 값이 들어갑니다. 행렬을 곱하기 위해선 좌측 행렬의 열의 개수와 우측 행렬의 행의 개수가 같아야 합니다. 곱할 수 있는 두 행렬 A,B가 주어질 때, 행렬을 곱한 값을 출력하는 productMatrix 함수를 완성해 보세요.

## 1. 풀이

```js
function productMatrix(a, b) {
  const arr = [];
  for (let i = 0; i < a.length; i++) {
    arr.push([]);
    for (let j = 0; j < a[0].length; j++) {
      let sum = 0;
      for (let z = 0; z < b[0].length; z++) {
        sum += a[i][z] * b[z][j];
      }
      arr[i][j] = sum;
    }
  }
  return arr;
}

var a = [ [1,2],[4,5] ];
var b = [ [1,2],[4,5] ];

productMatrix(a, b);
```

