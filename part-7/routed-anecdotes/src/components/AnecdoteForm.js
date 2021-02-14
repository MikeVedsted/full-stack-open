import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const history = useHistory('text')
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')


  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0
    }
    props.addNew(newAnecdote)
    history.push('/')
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.field} />
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          url for more info
          <input {...info.field} />
        </div>
        <button type='submit'>Create</button>
        <button type='reset' onClick={reset}>Reset</button>
      </form>

    </div>
  )
}

export default AnecdoteForm