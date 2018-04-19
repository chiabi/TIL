# 삼각형출력하기

> #반복문, #재귀함수, #문자열의 반복

date: 18.04.05

* [관련링크](https://programmers.co.kr/learn/challenge_codes/101)

> printTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다.
다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printTriangle 메소드를 완성하세요
printTriangle이 return하는 String은 개행문자('\n')로 끝나야 합니다.
>
>높이가 3일때
>```
>*
>**
>***
>```
>높이가 5일때
>```
>*
>**
>***
>****
>*****
>```

## 1. 풀이

```javascript
function printTriangle(num) {
  // 함수를 완성하세요
  let result = '';
  for(let i = 0; i < num; i++) {
  	result += `${'*'.repeat(i + 1)}\n`;
  }
  return result;
}
```

생각하기에 제일 포멀한? 풀이를 한 것 같다. 반복문을 이용해 간단하게 돌렸다. 역 삼각형에서 재귀함수 돌리는 걸 봐서 그렇게 리팩토링하고 싶었는데 거꾸로 돌리는 재귀함수는 간단해 보였는데 역순이 아니라면 어떻게 해야하지 머리를 쥐어짜다가 안나와서 일단 답을 제출했다.

## 2. 다른 사람 풀이

### 2-1. 재귀함수

작성자: 마상길

```javascript
function printTriangle(num) {
  return num < 1 ? "" : printTriangle(num-1) + "*".repeat(num) + "\n";
}
```

아... 재귀함수.... 나는 왜 이 생각을 못하나...  
역시나 답에 재귀함수가 있었다. 재귀함수도 잘 이해 못하고 있지만 문자열과 재귀함수의 조합이 어디까지 가능한지 모르고 있는 것 같다. 이렇게 문자열 앞에서 -1로 돌리면 별을 작은 수부터 찍을 수 있구나.

