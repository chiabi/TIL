# 리덕스

- `createStore(reducer, [preloadedState], [enhancer])`
  - 앱의 상태 트리 전체를 보관하는 Redux 스토어를 만든다.
  - 앱 내에는 단 하나의 스토어만 있어야 한다.
  - `reducers`(Function): 주어진 현재 상태 트리와 처리할 액션을 받아 다음 상태 트리를 반환하는 리듀싱 함수
  - `[preloadedState]`(any): 초기 상태
  - `[enhancer]`(Function): 스토어 인핸서, 서드파티 기능을 스토어에 추가하기 위해 지정할 수 있다. 
  - store(앱의 전체 상태를 가지고 있는 객체)를 반환한다. 이 객체의 상태를 바꾸는 유일한 방법은 액션을 보내는 것(dispatch), UI를 업데이트 하기 위해 상태를 구독할 수도 있다.(subscribe) 
  ```js
  import { createStore } from 'redux'

  // 리듀서
  function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([action.text])
      default: 
      return state
    }
  }

  const store = createStores(todos, ['Use Redux'])

  store.dispatch({
    type: 'ADD_TODO',
    text: 'Read the docs'
  })

  console.log(store.getState()) // ['Use Redux', 'Read the docs']
  ```
- `combineReducers(reducers)`
  - 서로 다른(독립된 부분으로 관리하고 싶어 분리한) 리듀싱 함수들을 값으로 가지는 객체를 받아서 `createStore`에 넘길 수 있는 하나의 리듀싱 함수로 바꿔주는 헬퍼 함수
  - `reducer`(Object): 하나로 합쳐질 각각의 리듀싱 함수들을 값으로 가지는 객체
  - reducers 객체 안의 모든 리듀서들을 실행해 하나의 상태 객체를 만드는 리듀서 함수를 반환한다.
  - 식별되지 않은 상태에서는 첫 인수로 주어진 state를 반환해야하며, `undefined`를 반환해서는 안된다.
  ```js
  // reducers/todos.js : todos 리듀서
  export default function todos(state = [], action) {
    switch(action.type) {
      case 'ADD_TODO':
        return state.concat([action.text])
      default: 
        return state
    }
  }

  // reducers/counter.js : counter 리듀서
  export default function counter(state = 0, action) {
    switch(action.type) {
      case 'INCREMENT': 
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  // reducers/index.js
  import { combineReducers } from 'redux'
  import todos from './todos'
  import counter from './counter'

  export default combineReducers({
    todos,
    counter
  })

  // App.js 스토어
  import { createStore } from 'redux'
  import reducer from './reducers/index'

  let store = createStore(reducer)
  console.log(store.getState()) // {counter: 0, todos: []}
  store.dispatch({
    type: 'ADD_TODO',
    text: 'Use Redux'
  })

  console.log(store.getState()) // {counter: 0, todos: ['Ues Redux']}
  ```
- `applyMiddleware(...middlewares)`
  - 미들웨어는 액션의 정보에 따라 무시하게 할 수 있고, 액션의 정보를 가로채 수정한 다음 리듀서로 전달할 수 있다. 비동기 작업시에 유용하다.
  - `redux-thunk`: 액션 생산자가 디스패치 함수를 통해 제어를 역전할 수 있게 한다. 액션 생산자는 `dispatch`를 인수로 받아 비동기적으로 호출할 수 있다.
  - `redux-promise`: Promise 비동기 액션을 보내고, 이 Promise가 결정되었을 때 보통의 액션을 보내게 해준다.
  - `...middlewares`(arguments): 미들웨어 API를 따르는 함수. 각 미들웨어는 `Store`의 `dispatch`와 `getState` 함수를 명명된 인수로 받으며 함수를 반환한다. 이 함수는 `next` 미들웨어의 dispatch 메소드를 받을 수 있으며, 잠재적으로 다른 인수와 함께, 아니면 다른 시점에, 또는 전혀 호출되지 않을 수도 있는, `next(action)`을 호출하는 `action`의 함수여야 한다.
  - 주어진 미들웨어를 적용하는 스토어 인핸서(함수)를 반환한다. 인핸서를 적용하는 가장 간단한 방법은 `createStore()`의 마지막 인수인 `enhancer`로 넘기는 것
  ```js
  // custom logger middleware
  import { createStore, applyMiddleware} from 'redux'
  import todos from './reducers'

  function logger({getState}) {
    return (next) => (action) => {
      console.log('will dispatch', action)

      // 미들웨어 체인에서 다음 디스패치 메소드를 호출한다.
      let returnValue = next(action)

      console.log('state after dispatch', getStatae())

      return returnValue
    }
  }

  let store = createStore(todos, ['Use Redux'], applyMiddleware(logger))

  store.dispatch({
    type: 'ADD_TODO',
    text: 'Understand the middleware'
  })
  ```
- bindActionCreatros(actionCreators, dispatch)
- compose(...functions)

Store
- .getState()
  - 애플리케이션의 현재 상태 트리를 반환. 스토어의 리듀서가 마지막으로 반환한 값과 같다.
- .dispatch(action)
  - 상태 변경을 일으키기 위한 유일한 방법.
- .subscribe(listner)
  - 변경 사항에 대한 리스너를 추가. 리스터는 액션이 보내져 상태 트리의 일부가 변경될 수 있을때마다 호출된다.
- .replaceReducer(nextReducer)