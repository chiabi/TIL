# Forwarding Refs

컴포넌트의 `ref` 를 하위 컴포넌트에 자동으로 전달하는 기술  
부모 컴포넌트에서 `ref` 로 직접 DOM 접근이 가능하다

네이티브 `button` DOM 엘리먼트를 렌더링하는 `FancyButton` 컴포넌트

```js
function FancyButton(props) {
  return <button className="FancyButton">{props.children}</button>;
}
```

`ref fowarding` 은 일부 컴포넌트가 수신한 `ref`를 받아 하위 단계로 전달할 수 있는(pass it further down = "foward" it) opt-in(선택) 기능이다.

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref}className="FancyButton">
    {props.children}
  </button>;
))

// 이제 DOM button으로 직접 ref를 받을 수 있다.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>
```

- `React.createRef()`를 호출해 React ref 를 생성하고 `ref` 변수에 할당한다.
- `ref`를 JSX 속성으로 지정해 `<FancyButton ref={ref}>`에 전달한다.
- React 는 `ref`를 `forwardRef` 내의 함수(`(props, ref) => ...`)의 두번째 인자로 전달한다.
- 이 `ref` 인자를 JSX 속성으로 지정해 `<button ref={ref}>`에 보낸다.
- ref 가 첨부되면, `ref.current`는 `<button>` DOM 노드를 가리키게 된다.

`FancyButton` 은 `React.forwardRef` 를 사용해 전달 된 `ref` 를 가져온 다음 렌더링 하는 DOM `button` 으로 전달한다.

이렇게 하면, `FancyButton`을 사용하는 컴포넌트가 기본 DOM 노드에 대한 참조를 가져올 수 있으며, 필요한 경우 DOM 버튼을 직접 사용한 것처럼 접근할 수 있다.
