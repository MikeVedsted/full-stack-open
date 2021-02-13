import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  let notificationID

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    clearTimeout(notificationID)
    setTimeout(() => {
      setNotification('')
    }, 10 * 1000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Navigation />
      <Notification message={notification} />
      <Switch>
        <Route exact path='/create' >
          <AnecdoteForm addNew={addNew} />
        </Route>
        <Route exact path='/about' >
          <About />
        </Route>
        <Route exact path='/anecdotes/:id' >
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route exact path='/' >
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
