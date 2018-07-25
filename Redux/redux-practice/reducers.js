// 무언가 일어나서(액션) 그 결과 애플리케이션의 상태가 어떻게 바뀌는지를 특정한다.
// 데이터는 UI 상태와 분리하도록 하자

// 리듀서는 순수함수이다. : (previousState, action) => newState

// 리듀서 내에서 절대로 하지 말아야할 것 들
// - 인수들 변경(mutate)
// - API 호출이나 라우팅 전환같은 사이드 이펙트
// - Date.now()나 Math.random() 같은 순수하지 않은 함수 호출

// 계산만 가능하다

import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

const { SHOW_ALL } = VisiblityFilters
// const initialState = {
//   visibilityFilter: VisiblityFilters.SHOW_ALL,
//   todos: []
// }

// function todoApp(state, action) {
//   if ( typeof state === 'undefined') {
//     return initialState
//   }

//   return state
// }

// ES6의 default arguments 문법을 사용해 더 간단하게 작성한다.
// 1. state를 변경하지 않는다. 
// 2. default 케이스에 대해 이전의 state를 반환한다.


// 리덕스 앱을 만드는 기본 패턴: 리듀서 조합
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO: 
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default: 
      return state
  }
}

function visiblityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default: 
      return state
  }
}

// function todoApp(state = {}, action) {
//   return {
//     visiblityFilter: visiblityFilter(state.visiblityFilter, action),
//     todos: todos(state.todos.action)
//   }
//   // switch (action.type) {
//   //   case SET_VISIBILITY_FILTER: 
//   //     return Object.assign({}, state, {
//   //       visibilityFilter: action.filter
//   //     });
//   //   case ADD_TODO: 
//   //     return Object.assign({}, state, {
//   //       todos: todos(state.todos, action)
//   //     })
//   //   case TOGGLE_TODO: 
//   //     return Object.assign({}, state, {
//   //       todos: todos(state.todos, action)
//   //     })
//   //   default:
//   //     return state;
//   // }
// }

/* ※ Object.assign() 
 * 메서드는 열거 가능한 모든 속성의 값을 하나 이상의 소스 객체에서
 * 타겟 객체로 복사하는데 사용된다. 대상 객체를 반환한다.
 * 그러므로 기존의 객체를 변경시키지 않는 새로운 객체를 반환하고 
 * 싶다면 첫번째 인자는 반드시 빈객체여야 한다.
 */


// 리덕스가 제공하는 combineReducers() 유틸리티 메소드를 사용하면, 다음과 같이 todoApp을 재작성할 수 있다.
const todoApp = combineReducers({
  visiblityFilter,
  todos
})

export default todoApp
