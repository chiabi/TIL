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

// // dispatching actions

// // log the initial state
// console.log(store.getState());

// // every time the state changes. log it
// // subscribe() returns a function for unregistering the linstener
// const unsubscribe = store.subscribe(() => 
//   console.log(store.getState())
// )

// store.dispatch(addTodo('Learn about actions'));
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// unsubscribe()
export default store;

/* ## 데이터 흐름
 * ----
 * 리덕스 앱에서의 데이터는 4단계의 생명주기를 따른다.
 * 1. store.dispathc(action)을 호출한다.
 * 2. 스토어는 지정한 리듀서 함수들을 호출한다.
 * 3. 루트 리듀서가 각 리듀서의 출력을 합쳐 하나의 상태 트리로 만든다.
 * 4. 리덕스 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장한다. 
 * 이 새 트리가 앱의 다음 상태이다.
 * store.subscribe(listener)를 통해 등록된 모든 리스너가 불러와진다.
 * 이들은 현재 상태를 얻기 위해 store.getState() 호출할 것이다.
 * React Redux로 바인딩 했다면 이 시점에 component.setState(newState)가 호출될 것이다.
 */