import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addAnecdote = async anecdote => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const addVote = async (anecdote) => {
  const update = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, update)
  return res.data
}

export default { getAll, addAnecdote, addVote }