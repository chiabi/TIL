import { connect } from 'react-redux'
import { toggleTodo } from '../actions/actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions/actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      // throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: id => dispatch(toggleTodo(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)