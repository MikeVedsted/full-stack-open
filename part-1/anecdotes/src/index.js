import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TopAnecdote = ({ points, anecdotes }) => {
  const indexOfGreatest = points.indexOf(Math.max(...points))
  return (
    <>
      <h1>Anecdote with the most votes:</h1>
      <p>{anecdotes[indexOfGreatest]}</p>
    </>
  )
}

const App = ({ anecdotes }) => {
  const initPoints = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initPoints)

  const handleVote = () => {
    const newPointState = [...points]
    newPointState[selected] += 1
    setPoints(newPointState)
  }

  const setRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick={handleVote} >Vote</button>
      <button onClick={setRandom} >New anecdote</button>
      <TopAnecdote points={points} anecdotes={anecdotes} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
