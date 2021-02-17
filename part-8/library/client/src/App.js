import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER, GET_RECOMMENDATIONS } from './queries'

const App = () => {
  const client = useApolloClient()
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)
  const [getRecommendations, recommendations] = useLazyQuery(GET_RECOMMENDATIONS, { fetchPolicy: 'no-cache' })

  useEffect(() => {
    const token = localStorage.getItem('library-user')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    console.log('hope this works....')
    if (recommendations.called) {
      console.log('did it?')
      getRecommendations({})
      getRecommendations({ variables: { genre: userResult.data.me.favoriteGenre } })
      console.log('Maybe!', recommendations.data)
    }
  }, [booksResult])


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleRecommendations = () => {
    console.log('trigger')
    setPage('recommend')
    getRecommendations({ variables: { genre: userResult.data.me.favoriteGenre } })
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <LoginForm
          setToken={setToken} setError={setError}
        />
      </div>
    )
  }

  if (authorsResult.loading || booksResult.loading || recommendations.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={handleRecommendations}>Recommended</button>
        <button onClick={() => logout()}>Log out</button>
      </div>
      {error && <p>{error}</p>}
      <Authors
        show={page === 'authors'}
        authors={authorsResult.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={booksResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={setError}
      />

      <Recommendations
        show={page === 'recommend'}
        books={recommendations.data ? recommendations.data.allBooks : []}
        user={userResult.data.me}
      />
    </div>
  )
}

export default App
