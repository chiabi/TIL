# Word a10n (abbreviation)

> #정규표현식, #str.replace(regExp, function)

date: 18.05.26

* [문제링크](https://www.codewars.com/kata/word-a10n-abbreviation/javascript)

> The word i18n is a common abbreviation of internationalization in the developer community, used instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.

> Write a function that takes a string and turns any and all "words" (see below) within that string of length 4 or greater into an abbreviation, following these rules:

> A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "elephant ride" => "e6t r2e").

## 1. 풀이

```js
function abbreviate(string) {
  const wRe = /\w/g;
  const arr = string.match(/\w+|\W+/g);
  return arr.reduce((acc, i) => {
    if (wRe.test(i)) {
      if (i.length >= 4) {
        return acc + i[0] + i.slice(1, -1).length + i[i.length - 1];
      } else {
        return acc + i;
      }
    } else {
      return acc + i;
    }
  }, '');
}
```

정규표현식 써서 `str.match()`메소드로 문자열과 문자열이 아닌 걸로 배열에 담은 뒤에 `arr.reduce()`메소드 내부에서 if문을 통해 조건을 걸어 4자 이상은 축약 표현으로 받은 뒤 다시 문자열로 모두 합쳐지도록 했다.

## 2. 다른 사람 풀이

### 2-1. 정규표현식, str.replace(regExp, function)

작성자: wthit56, Xcellion

```js
var find = /[a-z]{4,}/gi;
function replace(match) { return match[0] + (match.length - 2) + match[match.length - 1]; }

function abbreviate(string) {
  return string.replace(find, replace);
}
```

작성자: laoris, ameliejyc, FeNN1337, elle wong, dentednerd, Janet138 (plus 4 more warriors)
```js
function abbreviate(string) {
  return string.replace(/\w{4,}/g, function(word) {
    return word[0] + (word.length - 2) + word.slice(-1);
  });
}
```

음 문자열이니까 `replace()`를 쓰는 방법도 있구나;;  
정규표현식에서 `{0}` 이 패턴을 사용하는 방법을 기억해둬야겠다.  

+ 문자열 앞 뒤 하나씩 제거한 문자열의 길이 구하는 법
  ```js
  str.splice(1, -1).length
  str.length - 2 // 이게 더 효율적으로 보인다.
  ```
+ 문자열 맨 뒤의 문자열 구하기
  ```js
  str.slice(-1);
  str[str.length - 1];
  ```

#### 2-1-1. str.replace(regexp|substr, newSubStr|function)

> + regexp (pattern)  
>   - 정규식(RegExp) 객체 또는 리터럴. 
>   - 이 정규식에 매칭되는 부분들은 두번째 파라미터의 반환값으로 교체된다.
> + substr (pattern)  
>   - 새로운 문자열에 의해서 교체당할 문자열(String).  
>   - 정규식이 아닌 글자 그대로의 문자열로 처리된다. 
>   - 오직 첫 번째 일치되는 문자열만이 교체된다.
> + newSubStr (replacement)  
>   - 첫번째 파라미터를 대신할 문자열(String). 
>   - 여러가지 대체 패턴들이 지원된다. 
> + function (replacement)  
>   - 첫번째 파라미터를 대신할 새로운 문자열을 생성하기 위해 호출될 function.