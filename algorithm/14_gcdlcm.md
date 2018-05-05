# 최대공약수와 최소공배수

> #재귀함수, #유클리드호제법, #Math.abs(), #for loop

date: 18.04.25

* [문제링크](https://programmers.co.kr/learn/challenge_codes/12)

> 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성해 보세요. 배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환하면 됩니다. 예를 들어 gcdlcm(3,12) 가 입력되면, [3, 12]를 반환해주면 됩니다.

## 1. 풀이

```js
function gcdlcm(a, b) {
  // 최대공약수는 유클리드 호제법으로 구하자
  // 최대공약수 * 최소공배수 = x * y
  const euclidean = (a, b) => {
    if(a > b) {
      const temp = a;
      a = b;
      b = temp;
    }
    if (b % a !== 0) {
      return euclidean(a, b % a);
    } else {
      return a;
    }
  }
  const gcd = euclidean(a, b);
  return [gcd, a * b / gcd];
}
console.log(gcdlcm(3, 12)) // [3, 12]
console.log(gcdlcm(5, 12)) // [1, 60]
console.log(gcdlcm(14, 16)) // [2, 112]
```

최대공약수는 유클리드 호제법으로 풀어봐서 구할 수 있는데 최소공배수를 어떻게 구하는 지 몰라서 레벨 1 문제인데 계속 못 풀고 있었다. 수학적 지식이 없어서 못 푸는 것 같아서 찾아보니... 소인수분해?? 그거는 먼저 나누는 수가 소수인지 알아야하지 않나?라고 생각되었다. 풀이 방식이 이게 아닌 것 같아서 더 찾아보니  
```
a,b의 최대공약수 * a,b의 최소공배수 = a,b 두 수의 곱
```
라고한다... 이 간단한 걸 몰라서 한참을 고민했구나... 최대공약수 구한거면 이미 다끝난 문제였는데...

## 2. 다른 사람 풀이

### 2-1. 재귀함수랑 `Math.abs()`

작성자: 최재용

```js
function greatestCommonDivisor(a, b) {
  return b ? greatestCommonDivisor(b, a % b) : Math.abs(a);
}
function leastCommonMultipleOfTwo(a, b) {
  return (a * b) / greatestCommonDivisor(a, b);
}
function gcdlcm(a, b) {
    return [greatestCommonDivisor(a, b),leastCommonMultipleOfTwo(a, b)];
}

console.log(gcdlcm(3, 12)) // [3, 12]
console.log(gcdlcm(5, 12)) // [1, 60]
console.log(gcdlcm(14, 16)) // [2, 112]
```

greatestCommonDivisor 내부가 어떻게 동작하는 지 잘 모르겠으니 그려보자
```
greatestCommonDivisor(3, 12)
return 12 ?            greatestCommonDivisor(12, 3 % 12) [실행]  : Math.abs(3)
return 3 % 12니까 3 ?  greatestCommonDivisor(3, 12 % 3)  [실행]  : Math.abs(12)
return 12 % 3니까 0 ?  greatestCommonDivisor(0, 3 % 0)           : Math.abs(3) [실행]

최종 return 값은 3
```
```
greatestCommonDivisor(14, 16)
return 16 ?            greatestCommonDivisor(16, 14 % 16)    [실행]  : Math.abs(14)
return 14 % 16니까 14 ?  greatestCommonDivisor(14, 16 % 14)  [실행]  : Math.abs(16)
return 16 % 14니까 2 ?  greatestCommonDivisor(2, 14 % 2)     [실행]  : Math.abs(14) 
return 14 % 2니까 0 ?  greatestCommonDivisor(0, 2 % 0)               : Math.abs(2) [실행]

최종 return 값은 2
```
와 이거면 큰 수, 작은 수 구할 필요도 없네...

#### 2-1-1. Math.abs()

절대값을 반환한다.(0은 0 음수이면 양수로)
```
                     x  if x > 0 
Math.abs(x)=|x|={    0  if x = 0 
                    -x  if x < 0 
```

### 2-2. 

작성자: 김찬중

```js
function gcdlcm(a, b) {
    var r;
    for (var ab = a * b; r = a % b; a = b, b = r){}
    return [b, ab/b];
}
```
~~이건 뭐여~~

유클리드 호제법을 정말 다양한 방법으로 구현하는 구나... 이것도 그냥 봐서는 잘 모르겠다.
```
gcdlcm(3, 12)
조건식:  r = 3 % 12, 갱신: a = 12, b = 3
조건식:  r = 12 % 3, 0 (반복문 종료) b(최대공약수) = 3
```