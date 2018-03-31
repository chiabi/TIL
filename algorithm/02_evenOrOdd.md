# 짝수와 홀수

> #삼항연산, #falsy

date: 18.03.31

* [프로그래머스 알고리즘 연습 문제 링크](https://programmers.co.kr/learn/challenge_codes/122)

> evenOrOdd 메소드는 int형 num을 매개변수로 받습니다.  
> num이 짝수일 경우 Even을 반환하고 홀수인 경우 Odd를 반환하도록 evenOrOdd에 코드를 작성해 보세요.  
> num은 0이상의 정수이며, num이 음수인 경우는 없습니다.

## 1. 풀이

```javascript
function evenOrOdd(num) {
  return num % 2 === 0 ? 'Even' : 'Odd';
}
```

크게 어려운 문제는 아니었다. 2로 나눠지는 것은 짝수니까 삼항연산으로 해당 문자열을 반환하면 되지 않을까 생각했다.  
어려운 문제가 아니지만 문서화한 이유는 아래의 다른 사람 풀이 때문이다.

## 2. 다른 사람 풀이

### 2-1. falsy

(아래는 atom이라는 분의 풀이다.)

```javascript
function evenOrOdd(num) {
  return (num % 2)? "Odd":"Even";
}
```

나는 나눠져서 나머지 값이 0이면 짝수라는 문자열을 반환하는 식으로 했는데(어찌보면 그냥 정석대로...)  
이 풀이는 0이 falsy라는 점을 이용했다.

## 3. 관련링크
