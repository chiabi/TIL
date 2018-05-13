# 공항 건설하기

> #arr.sort(), #arr.reduce, #for loop, #arr.map

date: 18.05.13

* [문제링크](https://programmers.co.kr/learn/challenge_codes/186)

> 1보다 큰 N개의 도시 중 한 곳에 공항을 지을 예정입니다. 사람들의 편의를 위해 공항으로부터 각 사람들까지의 도시간 이동 거리가 최소가 되는 도시에 짓기로 하였습니다. 편의상 도시는 일직선상에 놓여있다고 가정하며 좌표의 범위는 음수가 포함됩니다. 또한 좌표는 정렬되어 있지 않습니다. 직선상의 위치와 그 도시에 사는 사람들의 수가 주어질 때, 공항을 지을 도시의 위치를 반환해주는 함수 chooseCity 함수를 완성하세요. 거리가 같은 도시가 2개 이상일 경우 위치가 더 작은 쪽의 도시를 선택하면 됩니다. 예를 들어 다음과 같은 정보의 도시가 있다고 가정해 봅시다.
>
> | 위치 | 인구수 | 
> | :---: | :---: |
> | 1 | 5 |
> | 2 | 2 |
> | 3 | 3 |
> 
> 이 살 경우, 각각의 도시에 공항을 지었을 때의 사람들의 이동 거리는 8, 8, 12 이므로 1번 또는 2번에 지을 수 있지만, 1의 위치가 더 작으므로 1을 반환해주면 됩니다.

## 1. 풀이

```js
function chooseCity(n,city) {
  city.sort((a, b) => a[0] - b[0]);
  const arr = [];
  for (let i = 0; i < n; i++) {
    let acc = 0;
    for (let j = 0; j < n; j++) {
      if(j !== i) {
        acc += Math.abs(city[i][0] - city[j][0]) * city[j][1]
      }
    }
    arr.push(acc);
  }
  console.log(arr);
  return city[arr.indexOf(Math.min(...arr))][0];
}

var tA = 3,
    tCity = [[1,5],[2,2],[3,3]];

console.log(chooseCity(tA,tCity));
```
```js
function chooseCity(n,city) {
  const arr = city.sort((a, b) => a[0] - b[0]).map((item, index, arr) => arr.reduce((acc, it, idx) => acc + (item !== it ? Math.abs(item[0] - it[0]) * it[1] : 0), 0));
	console.log(arr);
	return city[arr.indexOf(Math.min(...arr))][0];
}
var tA = 3,
    tCity = [[1,5],[2,2],[3,3]];

console.log(chooseCity(tA,tCity));
```
맞는 것 같은데 실행시간이 10초 초과된다고 제출이 안된다...;; 다른 방법을 찾아봐야겠다.  
비교해야하는 게 많아지면 일일이 다 for문으로 돌아서 그런 것 같다.

```js
function chooseCity(n,city) {
  const sumHalf = city.sort((a, b) => a[0] - b[0]).reduce((acc, item) => acc + item[1], 0) / 2;
  let acc = 0;
  for(let i = 0; i < n; i++) {
    acc += city[i][1];
    if(acc >= sumHalf) return city[i][0];
  }
}
var tA = 3,
    tCity = [[1,5],[2,2],[3,3]];

console.log(chooseCity(tA,tCity));
```
드디어 통과했다.

인구수 절반을 구한다는 다른 사람의 접근법을 참고했다.  
먼저 인구수 총 합의 절반을 구해서 그 절반이 넘는 시점의 위치를 결과로 찍었다. 

통과 된 뒤에 다른 사람들의 풀이를 보니 `reduce` 메소드로 합을 구한뒤 `sort` 메소드를 사용하는 사람도 있었는데,  
나는 sort는 원본 배열의 변화를 주는 메소드이기 때문에 `sort` 메소드로 반환되는 배열에서 바로 `reduce` 메소드를 사용했다.

그리고 sum의 절반을 넘는지를 비교하는 것은 처음에는 나도 for문 안에 넣었다가 생각해보니 sum / 2라는 표현식 자체가 for문에서 계속 구해지게 되기 때문에 미리 sumHalf 변수에 절반을 담았다.  

