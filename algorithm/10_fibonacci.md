# 피보나치 수

> #arr.push(), #arr.reduce, #재귀함수

date: 18.04.19

* [관련링크](https://programmers.co.kr/learn/challenge_codes/6)

> 피보나치 수는 F(0) = 0, F(1) = 1일 때, 2 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 점화식입니다. 2 이상의 n이 입력되었을 때, fibonacci 함수를 제작하여 n번째 피보나치 수를 반환해 주세요. 예를 들어 n = 3이라면 2를 반환해주면 됩니다.

## 1. 풀이

```javascript
function fibonacci(num) {
  const answer = [0, 1];
  for(let i = 2; i <= num; i++) {
    answer.push(answer[i - 1] + answer[i - 2]);
  }
  return answer[num];
}
```
2이상의 n이 입력된다고 가정했으니 배열에 0, 1을 먼저 넣고 계산되도록 했다.

```js
function fibonacci(num) {
  const arr = new Array(num).fill(1);
  return arr.reduce((acc, item, index) => {
    return (arr[index] = acc + (arr[index - 2] ? arr[index - 2] : 0));
  }, 1);
}
console.log(fibonacci(10));
```
reduce로 풀어보려고 한건데 위의 코드보다는 비효율적인 것 같다. 그리고 어쨌건 0번째가 0이 아니라 1로 나오니까... 

## 2. 다른 사람 풀이

### 2-1. 재귀함수

작성자: 최윤우

```javascript
function fibonacci(num) {
  if(num < 2){
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// 더 줄이면 이렇게 쓸 수 있다.
function fibonacci(num) {
  return num < 2 ? num : fibonacci(num - 1) + fibonacci(num - 2);
}
```

재귀함수....  
재귀함수는 잘 생각이 안난다. 어떻게 쓰는지 많이 봐야할 것 같다.  
그런데 속도 자체는 그닥 효율적이지 않은 것 같다.