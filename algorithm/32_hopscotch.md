# 땅따먹기 게임

> #관련키워드

date: 18.05.21

* [문제링크](https://programmers.co.kr/learn/challenge_codes/154)

> 영희는 땅따먹기 게임에 푹 빠졌습니다. 땅따먹기 게임의 땅은 총 N행 4열로 나누어져 있고, 모든 칸에는 점수가 쓰여 있습니다. 땅을 밟으면서 한 행씩 내려올 때, 영희는 각 행의 4칸 중 1칸만 밟으면서 내려올 수 있습니다. 땅따먹기 게임에는 같은 열을 연속해서 밟을 수가 없는 특수 규칙이 있습니다. 즉, 1행에서 (5)를 밟았다면, 2행의 (8)은 밟을 수가 없게 됩니다. 마지막 행까지 모두 내려왔을 때, 점수가 가장 높은 사람이 게임의 승자가 됩니다. 여러분이 hopscotch 함수를 제작하여 영희가 최대 몇 점을 얻을 수 있는지 알려주세요. 예를 들어  
1 2 3 5  
5 6 7 8  
4 3 2 1  
의 땅이 있다면, 영희는 각 줄에서 (5), (7), (4) 땅을 밟아 16점을 최고점으로 받을 수 있으며, hopscotch 함수에서는 16을 반환해주면 됩니다.

## 1. 풀이

```js
function hopscotch(board, n) {
  for (let i = 1; i < n; i++) { 
    board[i][0] += Math.max(board[i - 1][1], board[i - 1][2], board[i - 1][3]);
    board[i][1] += Math.max(board[i - 1][0], board[i - 1][2], board[i - 1][3]);
    board[i][2] += Math.max(board[i - 1][0], board[i - 1][1], board[i - 1][3]);
    board[i][3] += Math.max(board[i - 1][0], board[i - 1][1], board[i - 1][2]);
  }
  return Math.max(board[n - 1][0], board[n - 1][1], board[n - 1][2], board[n - 1][3])
}

 //아래는 테스트로 출력해 보기 위한 코드입니다.
var board = [[ 1, 2, 3, 5 ], [ 5, 6, 7, 8 ], [ 4, 3, 2, 1]];
console.log(hopscotch(board, 3));
```

끝내 접근방법을 생각지 못했다. 너무 어렵게 생각한 것 같다. for문을 돌리니 이렇게 명쾌할 수가;; 
인자로 받은 borad의 상태 유지가 안된다는 점은 매우 걸리는 풀이지만;;

그 부분은 뭔가 깊은 복사를 하는 내부 로직이 하나 더 있어야 할 것 같다.
```js
function hopscotch(board, n) {
  const newBoard = board.map(item => item.map(item => item));
  for (let i = 1; i < n; i++) { 
    newBoard[i][0] += Math.max(newBoard[i - 1][1], newBoard[i - 1][2], newBoard[i - 1][3]);
    newBoard[i][1] += Math.max(newBoard[i - 1][0], newBoard[i - 1][2], newBoard[i - 1][3]);
    newBoard[i][2] += Math.max(newBoard[i - 1][0], newBoard[i - 1][1], newBoard[i - 1][3]);
    newBoard[i][3] += Math.max(newBoard[i - 1][0], newBoard[i - 1][1], newBoard[i - 1][2]);
  }
  return Math.max(newBoard[n - 1][0], newBoard[n - 1][1], newBoard[n - 1][2], newBoard[n - 1][3])
}
var board = [[ 1, 2, 3, 5 ], [ 5, 6, 7, 8 ], [ 4, 3, 2, 1]];
console.log(hopscotch(board, 3));
```
배열 안 배열 구조 정도가 고정인 문제니까 map메소드를 이용하는 정도로 복사했다.