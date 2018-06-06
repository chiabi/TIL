# Level 1

프로그래머스 알고리즘 연습이 리뉴얼 되면서 level1에 추가로 생긴 자바스크립트 문제들

## 가운데 글자 가져오기

> 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.
> 
> 제한 사항  
> + s는 길이가 1 이상, 100이하인 스트링입니다.
> 
> 입출력 예
> | s | return |
> | --- | --- |
> | abcde | c |
> | qwer | we |

```js
function solution(s) {
    const l = s.length;
    const half = Math.ceil(l / 2)
    return s.substr(half - 1, l % 2 !== 0 ? 1 : 2)
}
```

## 자연수 뒤집어 배열로 만들기

> 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.
>
> 제한 조건  
> + n은 10,000,000,000이하인 자연수입니다.
> 
> 입출력 예
> | n | return |
> | --- | --- |
> | 12345 | [5,4,3,2,1] |

```js
function solution(n) {
    return n.toString().split('').map(n => parseInt(n)).reverse();
}
```
※ 이 풀이에는 영향이 없었지만 `reverse()`나 `sort()`는 원본 배열에 영향을 미치는 메소드이니 주의해서 사용하자!

## 같은 숫자는 싫어

> 배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 배열 arr에서 제거 되고 남은 수들을 return 하는 solution 함수를 완성해 주세요. 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다.  
> 예를들면 
> 
> + arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
> + arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
> 
> 배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.
> 
> 제한사항  
> + 배열 arr의 크기 : 1,000,000 이하의 자연수
> + 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

```js
function solution(arr) {
    const answer = [];
    let before;
    for (const i of arr) {
        if(before !== i) answer.push(i);
        before = i;
    }
    return answer;
}
// 정확성: 71.9
// 효율성: 28.1
```

## 문자열 내림차순으로 배치하기

> 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.  
> s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.
> 
> 제한 사항
> + str은 길이 1 이상인 문자열입니다.
>
> 입출력 예
> | s | return | 
> | --- | --- |
> | Zbcdefg | gfedcbZ | 

```js
function solution(s) {
    return s.split('').sort().reverse().join('')
}
```

※ `sort()`정렬은 기본적으로 유니코드 포인트 비교임. 대문자를 소문자보다 작은 것으로 간주한다고 하니 `sort()`에 별도의 비교를 위한 함수를 넣지 않아도 될 듯