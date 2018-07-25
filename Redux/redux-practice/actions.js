// Action types
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// Actiion creators
export function addTodo(text) {
  return { type: ADD_TODO, text }
}
export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

// 액션을 보냈을 때 상태가 어떻게 변하는지를 명시하기 위해 리듀서를 정의해보자.
