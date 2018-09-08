# React.PureComponent 

[공식문서](https://reactjs.org/docs/react-api.html#reactpurecomponent)

`React.PureComponent`는 `React.Component`와 비슷하지만, `shouldComponent()`를 prop과 state의 얕은 비교로 실행한다는 점에서 다르다. (`React.Component`는 `shouldComponent()`를 실행하지 않는다.)

만약 React 컴포넌트의 `render()` 함수가 동일한 props와 state 주어진 경우동일한 결과