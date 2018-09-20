# 순수리액트

> [러닝리액트](http://www.hanbit.co.kr/store/books/look.php?p_code=B3942115529) 책을 보면서 정리한 내용입니다.

## 1. 페이지 설정

- React: 뷰를 만들기 위한 라이브러리
- ReactDOM: UI를 실제로 브라우저에 렌더링할 때 사용하는 라이브러리

[React CDN](https://reactjs.org/docs/cdn-links.html)  
다음은 브라우저에서 리액트를 사용하기 위한 최소한의 요구사항  
리액트 관련 코드는 항상 페이지에서 리액트 관련 라이브러리를 읽어 들인 다음에 위치해야 한다.
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Parcel Sandbox</title>
</head>
<body>
  <div class="react-container"></div>

  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <script>
    // 순수 리액트와 자바스크립트 코드
  </script>
</body>
</html>
```

## 2. 가상 DOM