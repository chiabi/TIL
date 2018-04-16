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

filter랑 이중부정
```js
function removeFalsy(arr) {
  return arr.filter(el => !!el);
}
removeFalsy([false, true, 1, 'string', 0, undefined, null, [], {}]);
```
filter랑 Boolean 함수 🌟
```js
function removeFalsy(arr) {
  return arr.filter(el => Boolean(el));
}
removeFalsy([false, true, 1, 'string', 0, undefined, null, [], {}]);
```
for of랑 새로운 배열에 push
```js
function removeFalsy(arr) {
  const newArr = [];
  for(const i of arr) {
    if (!!i) newArr.push(i);
  }
  return newArr;
}
removeFalsy([false, true, 1, 'string', 0, undefined, null, [], {}]);
```
[성능비교](http://jsben.ch/dwj25)에서 filter로 새로운 배열을 만드는게 더 빨랐고, 그 중 Boolean함수가 가장 빨랐다.

#### 강사님과 풀이 

※ 굳이 이중부정이나 Boolean 안쓰고 이렇게 해도 상관없음
```js
function removeFalsy(arr) {
  let noFalsy = [];
  for (i = 0; i < arr.length; i++) {
    if (arr[i]) { // truthy, flasy를 이용한다.
      noFalsy.push(arr[i]);
    }
  }
  return noFalsy;
}
```
```js
function removeFalsy(arr) {
  return arr.filter(el => el); // 자바스크립트 엔진이 알아서 해주니까 이렇게 써도 상관없다.
}
```
매개변수명은 나중에 읽기 좋게 관련된 이름으로 작성하자

### 문제 4

배열을 입력받아, 중복된 요소가 제거된 새 배열을 반환하는 함수를 작성하세요.

#### 풀이

for...of, includes로 새로운 배열에 있던 요소인지 확인하고 추가함
```js
function removeOverlap(arr) {
  const newArr = [];
  for( const i of arr) {
    if (!newArr.includes(i)) newArr.push(i);
  }
  return newArr;
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```
forEach, includes로 새로운 배열에 있던 요소인지 확인하고 추가함
```js
function removeOverlap(arr) {
  const newArr = [];
  arr.forEach((el, idx) => {
    if (!newArr.includes(el)) newArr.push(el);
  });
  return newArr;
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```
new Set으로 유니크 데이터 걸러내고 하나씩 새로운 배열에 담는 거
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
(※ 바로 return해주면 되는데 불필요한 부분이 있어서 수정)
```js
function removeOverlap(arr) {
  const newArr = [];
  return arr.filter(el => {
    if(!newArr.includes(el)) {
      newArr.push(el);
      return true;
    } else {
      return false;
    }
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```
filter와 findIndex 사용. 성능비교시 제일 빨랐던 방법 🌟
```js
function removeOverlap(arr) {
  return arr.filter((el, idx) => {
    // console.log(el, arr.findIndex(item => el === item), idx);
    return arr.findIndex(item => el === item) === idx;
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```
filter와 indexOf 사용
```js
function removeOverlap(arr) {
  return arr.filter((el, idx) => {
    return arr.indexOf(el) === idx;
  });
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```
Set으로 너무 먼길을 돌아가는 것 아닐까 찾아보니 Set으로 이렇게 쓸 수도 있다.  
(그런데 성능비교 결과는 제일 느렸다.;;)
```js
function removeOverlap(arr) {
  return [...new Set(arr)];
}
removeOverlap(['a', 'b', 'ab', 'a', 'c', 'b']); // ['a', 'b', 'ab', 'c']
```

### 문제 5

수 타입의 값으로만 이루어진 두 배열을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- 두 배열의 같은 자리에 있는 요소를 더한 결과가 새 배열의 요소가 됩니다.
- 만약 입력받은 두 배열의 길이가 같지 않다면, 긴 배열에 있는 요소를 새 배열의 같은 위치에 포함시키세요.

예:
```
addArray([1, 2, 3], [4, 5, 6, 7]) -> [5, 7, 9, 7]
```

#### 풀이

긴 배열, 짧은 배열을 먼저 구하고, 긴 배열 length만큼 for loop로 돌려서 짧은 배열의 요소가 없을때부터는 긴배열의 값만 새로운 배열에 추가하는 방법
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
같은 방법인데 긴배열을 for Each로 돌린 방법
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
addArray([1, 2, 3, 5, 6], [4, 5, 6, 7]);
```
[arr.map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) : 배열의 각 요소에 함수를 적용해서, 그 반환값을 요소로 갖는 새로운 배열을 만든다. 

이것도 비슷한 방법인데, 긴 배열 기준으로 map으로 반복처리한 방법 🌟
```js
function addArray(arr1, arr2) {
  if (arr1.length > arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  return arr2.map((el, idx) => arr1[idx] != null ? el + arr1[idx] : el);
}
addArray([1, 2, 3, 5, 6], [4, 5, 6, 7]);
```
긴배열 구하는 부분을 sort 메소드로 바꾼 방법
```js
function addArray(arr1, arr2) {
  const arr = [arr1, arr2].sort((a, b) => b.length - a.length);
  return arr[0].map((el, idx) => arr[1][idx] != null ? el + arr[1][idx] : el);
}
addArray([1, 2, 3, 5, 6], [4, 5, 6, 7]);
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
for문을 하나만 써보자해서 만든거 근데 반복을 더 도는 것 같다...  
성능비교해서도 위에꺼보다 느렸다.
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
100
50
10
1
1
1
```

#### 풀이

배열 수만큼 for loop도는데 계산된 금액(이전 동전금액을 뺀)이 음수가 나오면 갱신되도록 함
```js
function coins(sum, arr) {
  let newSum = sum;
  for(let i = 0; i < arr.length; ) {
    if (newSum - arr[i] >= 0) {
      newSum -= arr[i];
      console.log(arr[i]);
    } else{
      i++;
    } 
  }
}
coins(263, [100, 50, 10, 5, 1]);
```
map으로 요소마다 반복하는데 while문에 음수가 되면 종료되도록해서 출력하는 방법
```js
function coins(sum, arr) {
  let newSum = sum;
  arr.map(item => {
    while(newSum - item >= 0) {
      newSum -= item;
      console.log(item);
    }
  });
}
coins(263, [100, 50, 10, 5, 1]);
```
금액이 0보다 클때까지 while문으로 돌리면서 내부에서 인덱스를 더해줘서 다음 동전 배열 요소에 접근하게 하는 방법 🌟
```js
function coins(sum, arr) {
  let newSum = sum;
  let i = 0;
  while(newSum > 0) {
    if (newSum - arr[i] >= 0) {
      newSum -= arr[i];
      console.log(arr[i]);
    } else{
      i++;
    }
  }
}
```
두번째 방법을 생각하면서 while문을 써도 좋겠구나해서 세번째도 작성했는데 3가지 방법중 성능비교시 가장 빨랐다.

#### 강사님과 풀이

```js
function coins(money, coinTypes) {
  let currentMoney = money;
  let coinIndex = 0;
  while (currentMoney > 0) {
    if (currentMoney - coinTypes[coinIndex] >= 0) {
      console.log(coinTypes[coinIndex]);
      currentMoney -= coinTypes[coinIndex];
    } else {
      coinIndex++;
    }
  }
}
coins(263, [100, 50, 10, 5, 1]);
```
어떤 조건을 만족하는 한 계속 실행시키고 싶을 때 while을 쓴다.

### 문제 8

수 타입의 값만 들어있는 배열을 입력받아, 해당 배열을 오름차순 정렬하는 함수를 작성하세요. (`Array.prototype.sort`를 사용하지 않고 작성해보세요. [선택 정렬](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)을 참고하세요.)

![선택정렬 알고리즘 위키백과](../asset/Selection-Sort-Animation.gif)  
<cite>이미지 출처: 위키백과 선택정렬(https://goo.gl/FNCuo3)</cite>

#### 풀이

선택정렬이라고 생각하고 풀었는데 console.log로 보니 이상하다...아닌가봐 이건뭐지...
```js
function sort(arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]){
        const temp = arr[i];
        arr[i] = arr[j]; 
        arr[j] = temp;
        console.log(arr);
      }
    }
  }
  return arr;
}
sort([0, 3, 4, 8, 6, 7, 2, 9, 1, 5]); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```
```
[ 0, 2, 4, 8, 6, 7, 3, 9, 1, 5 ]
[ 0, 1, 4, 8, 6, 7, 3, 9, 2, 5 ]
[ 0, 1, 3, 8, 6, 7, 4, 9, 2, 5 ]
[ 0, 1, 2, 8, 6, 7, 4, 9, 3, 5 ]
[ 0, 1, 2, 6, 8, 7, 4, 9, 3, 5 ]
[ 0, 1, 2, 4, 8, 7, 6, 9, 3, 5 ]
[ 0, 1, 2, 3, 8, 7, 6, 9, 4, 5 ]
[ 0, 1, 2, 3, 7, 8, 6, 9, 4, 5 ]
[ 0, 1, 2, 3, 6, 8, 7, 9, 4, 5 ]
[ 0, 1, 2, 3, 4, 8, 7, 9, 6, 5 ]
[ 0, 1, 2, 3, 4, 7, 8, 9, 6, 5 ]
[ 0, 1, 2, 3, 4, 6, 8, 9, 7, 5 ]
[ 0, 1, 2, 3, 4, 5, 8, 9, 7, 6 ]
[ 0, 1, 2, 3, 4, 5, 7, 9, 8, 6 ]
[ 0, 1, 2, 3, 4, 5, 6, 9, 8, 7 ]
[ 0, 1, 2, 3, 4, 5, 6, 8, 9, 7 ]
[ 0, 1, 2, 3, 4, 5, 6, 7, 9, 8 ]
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```
최소값이랑 비교해야하는데 뒤에 작은 숫자를 만나면 자리교체하고 루프 넘어감;;  
최소값을 기억하도록 수정  
이렇게 풀어야 선택정렬인 것 같다...아마도  
for loop 두번 써서 맨 앞 요소부터 뒤의 모든 요소와 비교해서 가장 작은 수랑 자리 바꾸는 방법 
```js
function sort(arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
    let min = i;
    for(let j = i + 1; j < arr.length; j++) {
      min = arr[min] < arr[j] ? min : j;
    }
    const temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
    console.log(arr);
  }
  return arr;
}
sort([0, 3, 4, 8, 6, 7, 2, 9, 1, 5]);
```
```
[ 0, 3, 4, 8, 6, 7, 2, 9, 1, 5 ]
[ 0, 1, 4, 8, 6, 7, 2, 9, 3, 5 ]
[ 0, 1, 2, 8, 6, 7, 4, 9, 3, 5 ]
[ 0, 1, 2, 3, 6, 7, 4, 9, 8, 5 ]
[ 0, 1, 2, 3, 4, 7, 6, 9, 8, 5 ]
[ 0, 1, 2, 3, 4, 5, 6, 9, 8, 7 ]
[ 0, 1, 2, 3, 4, 5, 6, 9, 8, 7 ]
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

