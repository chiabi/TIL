# 줄 서는 방법

> #재귀함수

date: 18.05.19

* [문제링크](https://programmers.co.kr/learn/challenge_codes/51)

> N명의 사람이 있을 때, N명의 사람을 서로 다른 방법으로 줄을 세우는 방법은 N!개가 존재합니다.
>
> 이 때 각각의 사람들에게 번호를 매겨서 줄을 서는 방법을 표시합니다. 예를들어 [1,2,3,4]는 1번 사람이 제일 앞에, 2번 사람이 2두번째에... 서 있는 상태를 나타냅니다.
>
> 이러한 각각의 방법을 사전순으로 정렬했을때 K번째 방법으로 줄을 세우는 방법을 찾아 보려고 합니다.
>
> 예를 들어 3명의 사람이 있다면 총 6개의 방법은 다음과 같이 정렬할 수 있습니다.
>
> + 1번째 방법은 [1,2,3]
> + 2번째 방법은 [1,3,2]
> + 3번째 방법은 [2,1,3]
> + 4번째 방법은 [2,3,1]
> + 5번째 방법은 [3,1,2]
> + 6번째 방법은 [3,2,1]

> 이 때 K가 5이면 [3,1,2]가 그 방법입니다.
> 
> 사람의 수 N과 순서 K를 입력받아 K번째 방법으로 줄을 세우는 setAlign 함수를 완성해 보세요. 예를 들어 setAlign(3,5)를 입력받는다면 [3,1,2]를 리턴해주면 됩니다.

## 1. 풀이

```js
function setAlign(n, k) {
  const arr = [];
  for(let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return recursiveAlign(arr, n, k - 1).split(',').map(item => parseInt(item));
}

function recursiveAlign(arr, n, k) {
  // 경우의 수
  let cases = 1;
  for (let i = 1; i <= n; i++) {
    cases *= i;
  }
  if (k > cases) {
    k = k % cases;
  }
  cases = cases / n;

  if(arr.length === 1) {
    return `${arr[0]}`;
  } else {
    return `${arr.splice(Math.floor(k / cases), 1)[0]},${recursiveAlign(arr, arr.length, k % cases)}`
  }
}

console.log(setAlign(11, 1812391289)); // 5, 6, 7, 2, 8, 1, 10, 9, 11, 3, 4 
```
풀었다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ  
못 풀 줄 알았는데, 아니 문제만 읽었을 때는 오 이거 왠지 풀 수 있을 것 같아 했었다.  접근방법도 지금 풀이와 크게 다르지 않은데, 재귀함수에서 받은 배열에 reduce 메소드를 사용해 경우의 수를 구하려고 해서 계속 오류나는 거였다.  
내가 원하는 것은 3 * 2 * 1, 2 * 1, 1인데 다음 배열을 받아서 돌리면 뽑아낸 수에 따라 배열이 달라질텐데, 그 부분을 생각못하고 있었다. 그래서 그부분을 for 문으로 수정했더니 통과했다.

재귀함수에 문자열로 처리해서 setAlign에서 문자열을 다시 숫자 아이템의 배열로 처리하는 방법을 사용했다.

## 2. 다른 사람 풀이

### 2-1. 

작성자: ThereIsaDeer

```js
function setAlign(n, k) {
  var answer = [];
  let numList = new Array(n);
  function factorial(n) {
    let fac = 1;
    for (let i = 1; i <=n; i++) { fac *= i };
    return fac;
  }
  for (let i = 1; i <= n; i++) {
    numList[i-1] = i;
  }

  for (let i = numList.length; i >= 1; i--) {
    let popNumIdx = (Math.ceil(k / (factorial(i) / numList.length)) - 1) % numList.length;
    answer = answer.concat(...numList.splice(popNumIdx, 1));
  }
  return answer;
}
```

아... `concat()`....이 있었지.

이거 보고 생각난게 팩토리얼 문제 이전에 풀어놓고 아직도 뭐가 팩토리얼인지, 내가 푼 게 팩토리얼 구하는 거였는 줄도 몰랐다는 것에 반성한다.

그리고 new Array로 배열을 미리 만들고 접근자를 통해 값을 넣을지, 빈배열에 push할지 고민하다가 push() 메소드를 사용했는데, 이 풀이에서는 new Array로 빈배열을 만들었다.

그래서 성능이 궁금해져서 돌려보니 수가 커질 수록 for 문 안에서 접근자로 접근해 값을 넣을 수 있는 new Array() 방식이 더 좋은 것 같다. (한 1 ~ 100까지의 수를 배열로 만드는 경우는 속도가 많이 차이 났다.)

```js
function setAlign(n, k) {
  const arr = new Array(n);
  for(let i = 1; i <= n; i++) {
    arr[i - 1] = i;
  }
  return recursiveAlign(arr, n, k - 1);
}
function recursiveAlign (arr, n, k) {
  // 경우의 수
  let cases = 1;
  for (let i = 1; i <= n; i++) {
    cases *= i;
  }
  if (k > cases) {
    k = k % cases;
  }
  cases = cases / n;

  if(arr.length === 1) {
    return arr[0];
  } else {
    return [arr.splice(Math.floor(k / cases), 1)[0]].concat(recursiveAlign(arr, arr.length, k % cases));
  }
}
```
그럼 내 풀이를 이렇게 수정해도 되겠다.

+ [jsben test](http://jsben.ch/3sSpE)
+ [jsperf test](https://jsperf.com/setalign/1)