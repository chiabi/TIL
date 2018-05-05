# 다음 큰 숫자

> #arr.filter(), #Number.toString(), #for loop문

date: 18.05.05

* [문제링크](https://programmers.co.kr/learn/challenge_codes/174)

> 어떤 수 N(1≤N≤1,000,000) 이 주어졌을 때, N의 다음 큰 숫자는 다음과 같습니다.
>
> + N의 다음 큰 숫자는 N을 2진수로 바꾸었을 때의 1의 개수와 같은 개수로 이루어진 수입니다.
> + 1번째 조건을 만족하는 숫자들 중 N보다 큰 수 중에서 가장 작은 숫자를 찾아야 합니다.
>
> 예를 들어, 78을 2진수로 바꾸면 1001110 이며, 78의 다음 큰 숫자는 83으로 2진수는 1010011 입니다.
N이 주어질 때, N의 다음 큰 숫자를 찾는 nextBigNumber 함수를 완성하세요.

## 1. 풀이

```js
function nextBigNumber(n){
  const oneN = [...n.toString(2)].filter(item => item === '1').length;
  for(let i = n + 1; i <= 1000000; i++) {
    if([...i.toString(2)].filter(item => item === '1').length === oneN) {
      return i;
    }
  }
}
```

너무 어렵게 생각했다. 그래서 한참 걸렸다. 아니 컴퓨터한테 일을 시켜야지 왜 내가 생각하고 앉았담 진짜!!!!아오!!!

뭔가 패턴을 찾아보려고 열심히 삽질했다. 그러다 생각해보니 그냥 컴퓨터한테 여기까지 숫자 중에 '1'개수는 같은 수 중 제일 처음 구해지는 수를 내놔라하면 되는 것을...

## 2. 다른 사람 풀이

### 2-1. 정규표현식, while문

작성자: 박철현

```js
function nextBigNumber(n) {
    var size = n.toString(2).match(/1/g).length
    while(n++) {
        if(size === n.toString(2).match(/1/g).length) return n
    }
}
```

확실히 문자열인 상태에서 1이 몇개인지 알려면 정규표현식이 제일 깔끔하구나... for문으로 돌릴 생각만했는데 이런식으로 중단해야하는 반복문이라면 while문을 이런식으로 활용할 수 있구나.