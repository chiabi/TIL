# React.PureComponent

- 15.3.0 (July 29, 2016) [#7195](https://github.com/facebook/react/pull/7195)

[공식문서](https://reactjs.org/docs/react-api.html#reactpurecomponent)

`React.PureComponent`는 `React.Component`와 비슷하지만, `shouldComponent()`를 prop 과 state 의 얕은 비교로 실행한다는 점에서 다르다. (`React.Component`는 `shouldComponent()`를 실행하지 않는다.)

만약 React 컴포넌트의 `render()` 함수가 동일한 props 와 state 주어진 경우 동일한 결과를 낸다면(부작용이 없다면, 순수함수라면), 성능 향상을 위해 `React.PureComponent`를 사용할 수 있다.

`React.PureComponent`의 `shouldComponent()`는 객체를 얕게 비교한다.  
만약 복잡한 데이터 구조를 포함하고 있다면, 더 깊은 차이에 대해 잘못 된

오직 단순한 props 와 state 를 가질 때 `PureComponent`를 extend 하라, 또는 깊은 데이터 구조가 변경된 것을 안다면 `forceUpdate()`를 사용하라. 아니면 불변객체(immutable objects)를 사용해 중첩된 데이터를 빠르게 비교하는 것을 고려하라.

또한, `React.PureComponent`의 `shouldComponent()`는 전체 컴포넌트 하위 트리에 대한 prop 업데이트를 건너뛰므로 모든 자식 컴포넌트가 순수한지 확인하라.

- [리액트(React) 이해 기초 - Component vs PureComponent vs Functional Component](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp)
- [리액트 라이프 사이클 (번역)](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
