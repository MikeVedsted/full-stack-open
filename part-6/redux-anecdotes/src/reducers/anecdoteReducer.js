import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      const anecdoteToUpdate = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'ADD_ANECDOTE':
      const anecdote = action.data
      return state.concat(anecdote)
    case 'SET_INITIAL_ANECDOTES':
      const anecdotes = action.data
      return state.concat(anecdotes)
    default: return state
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const { id } = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE', data: newAnecdote
    })
  }
}

export const setInitialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_INITIAL_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
