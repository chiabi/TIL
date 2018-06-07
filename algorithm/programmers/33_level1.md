# Level 1

date: 18.06.06 - 18.06.07

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

## 나누어 떨어지는 숫자 배열

> array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.  
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.
> 
> 제한사항
> + arr은 자연수를 담은 배열입니다.
> + 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
> + divisor는 자연수입니다.
> + array는 길이 1 이상인 배열입니다.
>
> 입출력 예
> | arr | divisor | return |
> | --- | --- | --- |
> | [5, 9, 7, 10] | 5 | [5, 10] |
> | [2, 36, 1, 3] | 1 | [1, 2, 3, 36] |
> | [3,2,6] | 10 | [-1] |
>
> **입출력 예 설명**  
> + 입출력 예#1  
arr의 원소 중 5로 나누어 떨어지는 원소는 5와 10입니다. 따라서 [5, 10]을 리턴합니다.
> + 입출력 예#2  
arr의 모든 원소는 1으로 나누어 떨어집니다. 원소를 오름차순으로 정렬해 [1, 2, 3, 36]을 리턴합니다.
> + 입출력 예#3  
3, 2, 6은 10으로 나누어 떨어지지 않습니다. 나누어 떨어지는 원소가 없으므로 [-1]을 리턴합니다.

```js
function solution(arr, divisor) {
    const newArr = arr.filter(el => !(el % divisor))
    return newArr.length ? newArr.sort((a, b) => a - b) : [-1]
}
```

## 문자열 내 마음대로 정렬하기

> 문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 예를 들어 strings가 [sun, bed, car]이고 n이 1이면 각 단어의 인덱스 1의 문자 u, e, a로 strings를 정렬합니다.
> 
> 제한 조건
> + strings는 길이 1 이상, 50이하인 배열입니다.
> + strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
> + strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
> + 모든 strings의 원소의 길이는 n보다 큽니다.
> + 인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.
> 
> 입출력 예
> | strings | n | return | 
> | --- | --- | --- |
> | [sun, bed, car] | 1 | [car, bed, sun] | 
> | [abce, abcd, cdx] | 2 | [abcd, abce, cdx] | 
> 
> **입출력 예 설명**
> + 입출력 예 1  
sun, bed, car의 1번째 인덱스 값은 각각 u, e, a 입니다. 이를 기준으로 strings를 정렬하면 [car, bed, sun] 입니다.
> + 입출력 예 2  
abce와 abcd, cdx의 2번째 인덱스 값은 c, c, x입니다. 따라서 정렬 후에는 cdx가 가장 뒤에 위치합니다. abce와 abcd는 사전순으로 정렬하면 abcd가 우선하므로, 답은 [abcd, abce, cdx] 입니다.

```js
function solution(strings, n) {
    return strings.sort((s1, s2) => s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n]));
}
```

## 자릿수 더하기

> 자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.
> 
> 제한사항
> + N의 범위 : 100,000,000 이하의 자연수
> 
> 입출력 예
> | N | answer |
> | 123 | 6 |
> | 987 | 24 |
> 
> 입출력 예 설명
> + 입출력 예 #1  
문제의 예시와 같습니다.
> + 입출력 예 #2  
9 + 8 + 7 = 24이므로 24를 return 하면 됩니다.

```js
function solution(n){
    return ('' + n).split('').reduce((arr, i) => arr + parseInt(i), 0);
}
```

## 정수 내림차순으로 배치하기

> 함수 solution은 정수 n을 매개변수로 입력받습니다. n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 예를들어 n이 118372면 873211을 리턴하면 됩니다.
> 
> 제한 조건
> + n은 1이상 8000000000 이하인 자연수입니다.
>
> 입출력 예
> | n | return |
> | --- | --- |
> | 118372 | 873211 |

```js
function solution(n) {
    return parseInt(('' + n).split('').sort((n1, n2) => n2 - n1).join(''));
}
```

## x만큼 간격이 있는 n개의 숫자

> 함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.
> 
> 제한 조건
> + x는 -10000000 이상, 10000000 이하인 정수입니다.
> + n은 1000 이하인 자연수입니다.
> 
> 입출력 예
> | x | n | answer |
> | --- | --- | --- |
> | 2 | 5 | [2,4,6,8,10] |
> | 4 | 3 | [4,8,12] |
> | -4 | 2 | [-4, -8] |

```js
function solution(x, n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(x * i)
    }
    return arr;
}
```

## 제일 작은 수 제거하기

> 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.
> 
> 제한 조건
> + arr은 길이 1 이상인 배열입니다.
> + 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.
> 
> 입출력 예
> | arr | return |
> | --- | --- |
> | [4,3,2,1] | [4,3,2] |
> | [10] | [-1] |

```js
function solution(arr) {
    const min = Math.min(...arr);
    return arr.length !== 1 ? arr.filter(i => i !== min) : [-1]
}
```

## 최댓값과 최솟값

> 문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 (최소값) (최대값)형태의 문자열을 반환하는 함수, solution을 완성하세요.
예를들어 s가 1 2 3 4라면 1 4를 리턴하고, -1 -2 -3 -4라면 -4 -1을 리턴하면 됩니다.
> 
> 제한 조건
> + s에는 둘 이상의 정수가 공백으로 구분되어 있습니다.
> 
> 입출력 예
> | s | return |
> | --- | --- |
> | 1 2 3 4 | 1 4 |
> | -1 -2 -3 -4 | -4 -1 |
> | -1 -1 | -1 -1 |

```js
function solution(s) {
    const arr = s.split(' ').map(i => parseInt(i));
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return min + ' ' + max;
}
```

## JadenCase 문자열 만들기

> JadenCase란 모든 단어의 첫 알파벳이 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.
>
> 제한 조건
> + s는 길이 1 이상인 문자열입니다.
> + s는 알파벳과 공백문자(" ")로 이루어져 있습니다.
>
> 입출력 예
> | s | return |
> | --- | --- |
> | 3people unFollowed me | 3people Unfollowed Me |
> | for the last week | For The Last Week |

```js
function solution(s) {
    let l = s.length;
    let newS = s.toLowerCase();
    let str = '';
    for (let i = 0; i < l; i++) {
        str += (i === 0 || newS[i - 1] === ' ') ? newS[i].toUpperCase() : newS[i]
    }
    return str;
}
```
```js
// i[0]은 런타임 에러 났는데
// i.charAt(0)은 통과 되었다. 뭘까....
function solution(s) {
    return s.split(' ').map(i => i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()).join(' ')
}
```