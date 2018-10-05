# Time Complexity

## PermMissingElem

An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given an array A, returns the value of the missing element.

For example, given array A such that:

```
  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5
```

the function should return 4, as it is the missing element.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
the elements of A are all distinct;
each element of array A is an integer within the range [1..(N + 1)].

> Detected time complexity:
> O(N) or O(N \* log(N))

### 나의 풀이

```js
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0, l = A.length + 1; i <= l; i++) {
    sum1 += i;
    sum2 += A[i] ? A[i] : 0;
  }
  return sum1 - sum2;
}
```

## Frog Jump

A small frog wants to get to the other side of the road. The frog is currently located at position X and wants to get to a position greater than or equal to Y. The small frog always jumps a fixed distance, D.

Count the minimal number of jumps that the small frog must perform to reach its target.

Write a function:

function solution(X, Y, D);

that, given three integers X, Y and D, returns the minimal number of jumps from position X to a position equal to or greater than Y.

For example, given:

```
  X = 10
  Y = 85
  D = 30
```

the function should return 3, because the frog will be positioned as follows:

```
after the first jump, at position 10 + 30 = 40
after the second jump, at position 10 + 30 + 30 = 70
after the third jump, at position 10 + 30 + 30 + 30 = 100
Write an efficient algorithm for the following assumptions:
```

X, Y and D are integers within the range [1..1,000,000,000];

```
X ≤ Y.
```

### 나의 풀이

(???????)

> Detected time complexity: O(1)

```js
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(X, Y, D) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (X === Y) return 0;
  let a = (Y - X) / D;
  return Math.ceil(a);
}
```

## TapeEquilibrium

A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

```
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
```

We can split this tape in four places:

```
P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7
```

Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

```
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
```

the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].

### 나의 풀이

> Detected time complexity: O(N)

```js
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  const L = A.length;
  if (L === 1) return A[0];
  if (L === 2) return Math.abs(A[0] - A[1]);
  let sums = [];
  for (let i = 0; i < L; i++) {
    sums.push(i === 0 ? A[i] : sums[i - 1] + A[i]);
  }
  let answer = Math.abs(sums[0] * 2 - sums[L - 1]);
  for (let j = 1; j < L - 1; j++) {
    const diff = Math.abs(sums[j] * 2 - sums[L - 1]);
    answer = answer > diff ? diff : answer;
  }
  return answer;
}
```
