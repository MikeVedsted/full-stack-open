import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { filter, anecdotes } = props
  anecdotes.sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = anecdotes.filter(b => b.content.toLowerCase().includes(filter.toLowerCase()))

  const handleVote = (anecdote, content) => {
    props.vote(anecdote)
    props.setNotification(`You voted for ${content}`, 5)
  }

  const style = {
    margin: '10px 0'
  }

  return (
    filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id} style={style} >
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote, anecdote.content)}>vote</button>
        </div>
      </div>
    )
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter.filter,
  }
}

const mapDispatchToProps = { vote, setNotification }

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList
