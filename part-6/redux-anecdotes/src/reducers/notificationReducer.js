const initialState = { message: null }
let messageId

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.data }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: null }
    default: return state
  }
}

export const setNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(messageId)
    messageId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
    dispatch({ type: 'SET_NOTIFICATION', data: message })

  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default reducer
