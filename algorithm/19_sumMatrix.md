# 행렬의 덧셈

> #arr.map

date: 18.05.05

* [관련링크](https://programmers.co.kr/learn/challenge_codes/9)

> 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 2개의 행렬을 입력받는 sumMatrix 함수를 완성하여 행렬 덧셈의 결과를 반환해 주세요.
>
> 예를 들어 2x2 행렬인 A = ((1, 2), (2, 3)), B = ((3, 4), (5, 6)) 가 주어지면, 같은 2x2 행렬인 ((4, 6), (7, 9))를 반환하면 됩니다.(어떠한 행렬에도 대응하는 함수를 완성해주세요.)

## 1. 풀이

```js
function sumMatrix(A,B){
	return A.map((item, index) => item.map((it, idx) => it + B[index][idx]));
}

sumMatrix([[1,2], [2,3]], [[3,4],[5,6]]);
```

