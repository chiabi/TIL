import { VisibilityFilters } from '../actions'

const visiblityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default: 
      return state
  }
}

export default visiblityFilter