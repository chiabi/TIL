const elNumber = document.getElementById('number');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');

// Action type
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action creator
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
});

const decrement = () => ({
  type: DECREMENT
});

// Initial Value
const initialState = {
  number: 0
}

// 리듀서
// 파라미터 기본값 지정: state = initialState
const counter = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case INCREMENT: 
      return {
        number: state.number + action.diff
      };
    case DECREMENT: 
      return {
        number: state.number - 1
      };
    default: 
      return state;
  }
}

// Store 만들기, createStore에 리듀서 함수를 넣어서 호출함
const { createStore } = Redux;
const store = createStore(counter);

// listener 함수 - 상태 변경시마다 호출시킬 함수
const render = () => {
  console.log(store.getState());
  elNumber.innerText = store.getState().number;
  console.log('실행');
}

// 스토어에서 구독을 하고, 뭔가 변화가 있다면, render 함수를 실행한다.
store.subscribe(render);

// 초기 렌더링
render();

// 버튼에 이벤트
// 스토어에 변화를 발생시키게 할 때 - dispatch 함수에 액션 객체를 넣어 호출
btnIncrement.addEventListener('click', () => {
  store.dispatch(increment(25));
});
btnDecrement.addEventListener('click', () => {
  store.dispatch(decrement());
});