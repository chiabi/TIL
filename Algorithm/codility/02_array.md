# Array

## CyclicRotation

An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

Write a function:

function solution(A, K);

that, given an array A consisting of N integers and an integer K, returns the array A rotated K times.

For example, given

```
    A = [3, 8, 9, 7, 6]
    K = 3
```

the function should return [9, 7, 6, 3, 8]. Three rotations were made:

```
    [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
    [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
    [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
```

For another example, given

```
    A = [0, 0, 0]
    K = 1
```

the function should return [0, 0, 0]

Given

```
    A = [1, 2, 3, 4]
    K = 4
```

the function should return [1, 2, 3, 4]

Assume that:

N and K are integers within the range [0..100];
each element of array A is an integer within the range [−1,000..1,000].
In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

```js
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, K) {
  if (K === 0 || A.length <= 1) return A;
  // write your code in JavaScript (Node.js 8.9.4)
  while (K--) {
    const last = A.pop();
    A.unshift(last);
  }
  return A;
}
```

```js
function solution(A, K) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (K === 0 || A.length <= 1) return [...A];
  const lastIndex = A.length - 1;
  return solution([A[lastIndex], ...A.slice(0, lastIndex)], K - 1);
}
```

## OddOccurrencesInArray

A non-empty array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.

For example, in array A such that:

```
A[0] = 9 A[1] = 3 A[2] = 9
A[3] = 3 A[4] = 9 A[5] = 7
A[6] = 9
```

the elements at indexes 0 and 2 have value 9,
the elements at indexes 1 and 3 have value 3,
the elements at indexes 4 and 6 have value 9,
the element at index 5 has value 7 and is unpaired.
Write a function:

function solution(A);

that, given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

For example, given array A such that:

```
A[0] = 9 A[1] = 3 A[2] = 9
A[3] = 3 A[4] = 9 A[5] = 7
A[6] = 9
```

the function should return 7, as explained in the example above.

Write an efficient algorithm for the following assumptions:

N is an odd integer within the range [1..1,000,000];
each element of array A is an integer within the range [1..1,000,000,000];
all but one of the values in A occur an even number of times.

### 나의 풀이

```js
function solution(A) {
  // A는 빈 배열 아님
  // 다른 인덱스의 값이랑 매칭되지 않는 값을 리턴
  // 효율성 중요
  // N은 홀수 [1, ..., 1,000,000]
  // array A의 각 요소는 범위 내 정수[1, ..., 1,000,000]
  // A의 값 중 하나를 제외하고는 반드시 모든 값이 짝이 있음
  // write your code in JavaScript (Node.js 8.9.4)
  const values = {};
  for (const item of A) {
    !values[item] ? (values[item] = item) : delete values[item];
  }
  return Object.values(values)[0];
}
```
