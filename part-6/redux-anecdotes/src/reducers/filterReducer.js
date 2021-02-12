
const initialState = { filter: '' }

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      const filter = action.data
      return { ...state, filter: filter }
    case 'CLEAR_FILTER':
      return { ...state, filter: '' }
    default: return state
  }
}

export const setFilter = (filter) => {
  return { type: 'SET_FILTER', data: filter }
}

export const clearFilter = () => {
  return { type: 'CLEAR_FILTER' }
}

export default reducer
