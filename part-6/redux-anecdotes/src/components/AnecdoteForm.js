import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [anecdote, setAnecdote] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdoteObject = { content: anecdote, votes: 0 }
    props.addAnecdote(anecdoteObject)
    props.setNotification(`Successfully added ${anecdote}`, 5)
    setAnecdote('')
  }

  const style = {
    margin: '20px 0'
  }

  return (
    <form onSubmit={handleSubmit} style={style}>
      <label>
        Anecdote:
      <input type='text' name='Content' onChange={({ target }) => setAnecdote(target.value)} />
      </label>
      <button type='submit'>Submit</button>
    </form >
  )
}

const mapDispatchToProps = { addAnecdote, setNotification }

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm