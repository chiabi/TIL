# 가장 큰 정사각형 찾기

> #for loop, #Math.min()

date: 18.05.16

* [문제링크](https://programmers.co.kr/learn/challenge_codes/190)

> O와 X로 채워진 표가 있습니다. 표 1칸은 1 x 1 의 정사각형으로 이루어져 있습니다. 표에서 O로 이루어진 가장 큰 정사각형을 찾아 넓이를 반환하는 findLargestSquare 함수를 완성하세요. 예를 들어
>
| 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- |
| X | O | O | O | X |
| X | O | O | O | O |
| X | X | O | O | O |
| X | X | O | O | O |
| X | X | X | X | X |
>
> 가 있다면 정답은
>
| 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- |
| X | O | O | O | X |
| X | O | `O` | `O` | `O` |
| X | X | `O` | `O` | `O` |
| X | X | `O` | `O` | `O` |
| X | X | X | X | X |
>
> 가 되며 넓이는 9가 되므로 9를 반환해 주면 됩니다.

## 1. 풀이

```js
function findLargestSquare(board) {
  const newB = board;
  let max = 0;
  for (let i = 0, l = newB.length; i < l; i++) {
    for (let j = 0, l = newB[0].length; j < l; j++) {
      let result = 0;
      if (newB[i][j] === 'O') {
        if(i === 0 || j === 0) {
          result = 1;
        } else if (newB[i - 1][j - 1] === newB[i - 1][j] && newB[i][j - 1] === newB[i - 1][j]) {
          result = newB[i][j - 1] + 1;
        } else {
          result = Math.min(newB[i - 1][j - 1], newB[i - 1][j], newB[i][j - 1]) + 1;
        }
      } 
      newB[i][j] = result;
      max = max < newB[i][j] ? newB[i][j] : max;
    }
  }
  return Math.pow(max, 2);
}
//아래 코드는 테스트를 위한 출력 코드 입니다.
var testBoard = [['X','O','O','O','X'],['X','O','O','O','O'],['X','X','O','O','O'],['X','X','O','O','O'],['X','X','X','X','X']];
console.log(findLargestSquare(testBoard));
```

이거 풀려고 머리 너무 굴려서 토나올 것 같다... level4부터는 너무 어렵다...  
내가 생각한 모든 방법이 생각과 다르게 되어서 (혹은 너무 구현하기 어렵다거나 for 루프를 무진장 돌린다거나) 하루를 꼬박 낭비했으니 다른 사람의 풀이를 참고하기로 했다.   
다른 사람의 접근 방식을 보니 표의 `x, y`에 `[x - 1, y]` `[x, y - 1]`, `[x - 1, y - 1]`의 값에 따라 수를 더하는 식이었다.

```
1 1 1
1 1 1
1 1 1
```
의 표가 있다면
```
1 1 1
1 2 2
1 2 3
```
이 되는 식이 었다. 이러한 접근방식을 참고해서 풀었다.