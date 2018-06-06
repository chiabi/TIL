# 숫자의 표현

> #for loop, #while

date: 18.05.07

* [문제링크](https://programmers.co.kr/learn/challenge_codes/42)

> 수학을 공부하던 민지는 재미있는 사실을 발견하였습니다. 그 사실은 바로 연속된 자연수의 합으로 어떤 숫자를 표현하는 방법이 여러 가지라는 것입니다. 예를 들어, 15를 표현하는 방법은   
`(1+2+3+4+5)`  
`(4+5+6)`  
`(7+8)`  
`(15)`  
로 총 4가지가 존재합니다. 숫자를 입력받아 연속된 수로 표현하는 방법을 반환하는 expressions 함수를 만들어 민지를 도와주세요. 예를 들어 15가 입력된다면 4를 반환해 주면 됩니다.

## 1. 풀이

```js
function expressions(num) {
  let count= 0;
  for (let i = 1; i <= num; i++) {
    let sum = i;
    if(i === num) count++;
    for (let j = i + 1; j <= num; j++) {
      sum += j;
      if (sum === num) {
        count++;
        break;
      } else if (sum > num) {
        break;
      }
    }
  }
  return count;
}
```

어제 땅따먹기 문제 풀면서 너무 시간만 잡아먹어서 좀 침울해졌다. 그래도 600여명밖에 못 푼 문제였다며 위안을 삼고 나중에 풀기로 했다.  
이 문제는 같은 레벨이지만 푼 사람 수가 제일 많았다. 

반복문을 돌리면 되겠다 생각해서 일단 for문을 썼는데 문제를 다시 보니 연속된 수의 합이라서 이미 다른 수의 연속된 계산에 들어간 수가 다시 나올 수 있었다. 그래서 for문을 2번 쓰고 조건에 만족하면 반복문을 break 시켜버리기로 했다.

나중에 결과가 안 맞아서 보니까 마지막 수에 i === num 인지 확인하는 부분을 sum === num이라 해놓고 아래에 넣어놨다;; 그러니 결과가 중복되어 들어가서 수가 뻥튀기 되지;; 

## 2. 다른 사람 풀이

### 2-1. 

작성자: 임택

```js
function expressions(num) {
    var answer = 0;

  for(var i=1; i<=num; i++) {
    if (num%i == 0 && i%2 == 1)
      answer++
  }
    return answer;
}
```

와 이게 뭐야...  
수가... i로 나눈 나머지가 0이고, i를 2로 나눈 나머지가 1이면??
```
1, 3, 5, 15
```

### 2-2. while문

작성자: 서현덕

```js
function expressions(num) {
  var answer = 0;
  var k = 0;
    while ((k * (k - 1) / 2) <= num ) {
      if (Number.isInteger((num / k) - (k - 1) / 2) && ((num / k) - (k - 1) / 2 != 0)){
        answer++;
      }
      k++;
    }
    return answer;
}
```

while문으로 푼 방식인데 사실 이것도 잘 이해는 안간다..  
비교적 쉬운 문제라고 생각했는데 수학적 지식이 있으면 더 깔끔하게 풀 수 있는 문제구나...