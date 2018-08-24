# 값

> [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch1.md) 책과 원문을 보면서 정리한 내용입니다.

## 1. 배열

자바스크립트의 배열은 어떤 타입의 값이라도 담을 수 있다.

배열 값에 `delete` 연산자를 적용하면 slot을 제거할 수 있지만, 그 배열은 빈 slot을 가진 배열이 되므로 `length`프로퍼티 값은 변경되지 않는다.

마찬가지로 다음과 같은 코드는 실행은 되지만 중간의 '빈 슬롯'에 의해 혼란을 부추길 수 있다. 이때 빈 슬롯의 값은 `undefined`인 것 같지만 명시적으로 `arr[1] = undefined`로 설정한 것과 똑같지 않다.
```js
var arr = [];
arr.length; // 0
arr[0] = 1;
// arr[1]은 누락되었다.
arr[2] = "string";

arr.length; // 3
arr; // [1, <1 empty item>, 'string']
arr[1]; // undefined
arr[1] = undefined;
arr; // [ 1, undefined, 'string' ]
```

문자열 타입의 키/프로퍼티를 써야하는 경우는 객체를 사용하자.  
배열이 객체이기는 하지만, 문자열 타입의 키/프로퍼티를 쓰게되면,
+ 문자열 값이 숫자인 경우(10진수) 숫자로 타입이 바뀐다.
+ 이 외의 문자열 키/프로퍼티는 배열 length에 반영되지 않는다.
```js
arr['10'] = 'boo';
arr; // [ 1, undefined, 'string', <7 empty items>, 'boo' ]
arr.length; // 11;

arr['f'] = 'foo';
arr; // [ 1, undefined, 'string', <7 empty items>, 'boo', f: 'foo' ]
arr.length; // 11;
```

