// // Action types
// export const ADD_TODO = 'ADD_TODO'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


let nextTodoId = 0

// Actiion creators
export const addTodo = text => ({
  type: 'ADD_TODO', 
  id: nextTodoId++, 
  text 
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO', 
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER', 
  filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// 액션을 보냈을 때 상태가 어떻게 변하는지를 명시하기 위해 리듀서를 정의해보자.
