# 약수의 합

> #반복문, #조건문

date: 18.04.08

* [관련링크](https://programmers.co.kr/learn/challenge_codes/3)

> 어떤 수를 입력받아 그 수의 약수를 모두 더한 수 sumDivisor 함수를 완성해 보세요. 예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환해 주면 됩니다.

## 1. 풀이

```javascript
function sumDivisor(num) {
  let answer = num + 1;
  for(let i = 2; i < num; i++) {
    answer += ( num % i === 0 ) ? i : 0;
  }
  return answer;
}
sumDivisor(12) // 28
```

어차피 1과 자기자신은 약수로 가지니까 그 합을 더하고 answer에 담았다.  
2부터 입렵된 수(미포함)까지의 수를 반복문을 통해 입력된 수를 나누어떨어지게 할 수 있는지 검사하고 나머지가 0으로 나누어 떨어지는 수만 answer에 더한 값을 리턴하게 했다.