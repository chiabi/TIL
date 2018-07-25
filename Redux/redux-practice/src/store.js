// 스토어
// getState()를 통해 상태에 접근한다.
// dispatch(action)을 통해 상태를 업데이트 한다.
// subscribe(listener)를 통해 리스너를 등록한다.
// subscribe(listener)에 의해 반환 된 함수를 통해 리스너를 등록 취소한다.

// 리덕스에서는 단 하나의 스토어만 가질 수 있다.
// 데이터를 다루는 로직을 쪼개고 싶다면, 리듀서 조합을 사용할 수 있다.

// 스토어 만들기: combineReducers를 통해 조합한 리듀서를 import하고, createStore()에 넣는다.
import { createStore } from 'redux';
import todoApp from './reducers'
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// dispatching actions

// log the initial state
console.log(store.getState());

// every time the state changes. log it
// subscribe() returns a function for unregistering the linstener
const unsubscribe = store.subscribe(() => 
  console.log(store.getState())
)

store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscribe()
export default store;