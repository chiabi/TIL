### 문제 1

두 정수 `start`, `end`를 입력받아, `start`부터 `end`까지의 모든 정수를 배열로 반환하는 함수를 작성하세요.

예:
```
range(3, 6); -> [3, 4, 5, 6]
```

#### 풀이

```js
function range(x, y) {
  const arr = [];
  for(let i = x; i <= y; i++) {
    arr.push(i);
  }
  return arr;
}
range(3, 6);
```

#### 강사님과 풀이

```js
function range(start, end) {
  const arr = [];
  for(i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}
range(3, 6); // [3, 4, 5, 6]
```
map으로 푸는 방법
```js
function range(start, end) {
  return new Array(end - start + 1).fill(start).map((item, index) => item + index);
}
```
### 문제 2

수 타입의 값으로만 이루어진 배열을 입력받아, 그 값들의 합을 구하는 함수를 작성하세요.

#### 풀이

[arr.reduce(callback[, initalValue])](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) : 왼쪽에서 오른쪽으로 이동하며 배열의 각 요소마다 누적 계산값과 함께 함수를 적용해 하나의 값으로 줄이는 메서드

callback 함수는 4개의 인수를 가질 수 있다.
- **accmulator**: 누적계산값, 콜백의 반환값을 누적한다.
- **currentValue**: 배열 내 현재 처리되고 있는 요소
- **currentIndex**: 배열 내 현재 처리되고 있는 요소의 인덱스
- **array**: reduce가 호출된 배열
```js
function total(arr){
  return arr.reduce((a, b) => a + b);
}
total([12, 15, 20]) // 47
```

#### 강사님과 풀이

for 루프로 풀 경우
```js
function sum(arr) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num += arr[i];
  }
  return num;
}
sum([1, 2, 3]); // 6
```
forEach 메소드
```js
function sum(arr) {
  let num = 0;
  arr.forEach(item => {
    num += item
  });
  return num
}
```
for...of 구문
```js
function sum(arr) {
  let num = 0;
  for(const item of arr) {
    num += item;
  }
  return num;
}
```
reduce는 for 루프 없이 합계나 평균 같은 계산을 하기쉽다.

### 문제 3

배열을 입력받아, falsy인 요소가 제거된 새 배열을 반환하는 함수를 작성하세요.

[arr.filter(callback[, thisArg])](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

callback 함수: 
- 배열의 각 요소를 테스트하는 함수. 
- 인수 (element, index, array) 와 함께 호출
- 요소를 (새 배열에) 계속 두기 위해 true를 반환, 그렇지 않으면 false.
```js
function removeFalsy(arr) {
  return arr.filter(function(el){
    return !!el;
  });
}
removeFalsy([false, true, 1, 'string', 0, undefined, null, [], {}]);
```

### 문제 4

배열을 입력받아, 중복된 요소가 제거된 새 배열을 반환하는 함수를 작성하세요.

#### 풀이

```js
function removeOverlap(arr) {
  const newArr = [];
  arr.forEach(function(el, idx){
    if (!newArr.includes(el)) newArr.push(el);
 });
 return newArr;
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

```js
function removeOverlap(arr) {
  const newArr = [];
  for (let i of new Set(arr)) {
    newArr.push(i);
  }
  return newArr;
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

filter 메소드 써볼 순 없을까해서 만들었는데 더 길어졌다;;
```js
function removeOverlap(arr) {
  const newArr = [];
  return arr.filter(function(el){
    let result;
    if(!newArr.includes(el)) {
      newArr.push(el);
      result = true;
    } else {
      result= false;
    }
    return result;
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

findIndex로 다음과 같은 방법도 가능하다. 성능비교 테스트를 해봤더니 가장 빨랐다.
```js
function removeOverlap(arr) {
  return arr.filter((el, idx) => {
    // console.log(el, arr.findIndex(t => el === t), idx);
    return arr.findIndex(t => el === t) === idx;
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

```js
function removeOverlap(arr) {
  return arr.filter((el, idx) => {
    return arr.indexOf(el) === idx;
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

Set으로 너무 먼길을 돌아가는 것 아닐까 찾아보니 Set으로 이렇게 쓸 수도 있다.  
다만, 의외로 성능비교 해보니 가장 느린 방법이었다;;
```js
function removeOverlap(arr) {
  return [...new Set(arr)];
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

### 문제 5

수 타입의 값으로만 이루어진 두 배열을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- 두 배열의 같은 자리에 있는 요소를 더한 결과가 새 배열의 요소가 됩니다.
- 만약 입력받은 두 배열의 길이가 갖지 않다면, 긴 배열에 있는 요소를 새 배열의 같은 위치에 포함시키세요.

예:
```
addArray([1, 2, 3], [4, 5, 6, 7]) -> [5, 7, 9, 7]
```

#### 풀이

```js
// 1. 먼저 긴 배열을 기준으로 반복문을 돌릴 수 있도록 arr2가 긴배열이도록 한다.
// 2. 배열의 인덱스의 요소가 arr1에 있으면 둘을 더하고 
// 3. 없으면 arr2의 요소만 추가하는 새로운 배열을 만든다. 
function addArray(arr1, arr2) {
  const newArray = [];
  if (arr1.length > arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  for(let i = 0, l = arr2.length; i < l; i++) {
    newArray.push(arr1[i] != null ? arr1[i] + arr2[i] : arr2[i]);
  }
  return newArray;
}
addArray([1, 2, 3, 5, 6], [4, 5, 6, 7]);
```

```js
function addArray(arr1, arr2) {
  const newArray = [];
  if (arr1.length > arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  arr2.forEach((el, idx) => {
    newArray.push(arr1[idx] != null ? el + arr1[idx] : el);
  });
  return newArray;
}
```

[arr.map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) : 배열의 각 요소에 함수를 적용해서, 그 반환값을 요소로 갖는 새로운 배열을 만든다. 
```js
function addArray(arr1, arr2) {
  if (arr1.length > arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  return arr2.map((el, idx) => arr1[idx] != null ? el + arr1[idx] : el);
}
```

### 문제 6

배열을 입력받아, 배열의 요소 중 두 개를 선택하는 조합을 모두 포함하는 배열을 작성하세요.

예:
```
combination([1, 2, 3]); -> [[1, 2], [1, 3], [2, 3]]
```

```js
function combination(arr) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      newArray.push([arr[i], arr[j]]);
    }
  }
  return newArray;
}
combination([1, 2, 3]); // [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]
```
for문을 하나만 써보자해서 만든거 근데 반복을 더 도는 것 같다;;

```js
function combination(arr) {
  const newArray = [];
  let j = 1;
  for (let i = 0; i < arr.length; ) {
    if(arr[j] != null) {
      newArray.push([arr[i], arr[j]]);
      j++;
    } else {
      i++;
      j = i + 1;
    }
  }
  return newArray;
}
```

### 문제 7

'금액'과 '동전의 종류가 들어있는 배열'를 입력받아, 최소한의 동전을 사용해서 금액을 맞출 수 있는 방법을 출력하는 함수를 작성하세요.
(단, 동전의 종류가 들어있는 배열에는 큰 동전부터 순서대로 들어있다고 가정합니다.)

예:
```
coins(263, [100, 50, 10, 5, 1]);
// 출력
100
50
10
1
1
1
```

#### 풀이

```js
function coins(num, arr) {
  let newNum = num;
  for(let i = 0; i < arr.length; ) {
    if (newNum - arr[i] > 0) {
      newNum -= arr[i];
      console.log(arr[i]);
    } else{
      i++;
    } 
  }
}
// coins(263, [100, 50, 10, 5, 1]) // 100 50 10 1 1
coins(263, [50, 10, 5, 1]) // (50 * 5) 10 1 1
```
으으 다른 방법이 딱히 떠오르지 않아

### 문제 8

수 타입의 값만 들어있는 배열을 입력받아, 해당 배열을 오름차순 정렬하는 함수를 작성하세요. (`Array.prototype.sort`를 사용하지 않고 작성해보세요. [선택 정렬](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)을 참고하세요.)

#### 풀이

