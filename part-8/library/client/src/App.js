import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client';

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, CURRENT_USER, GET_RECOMMENDATIONS } from './queries'

const App = () => {
  const client = useApolloClient()
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER, { fetchPolicy: 'no-cache' })
  const [getRecommendations, recommendations] = useLazyQuery(GET_RECOMMENDATIONS, { fetchPolicy: 'no-cache' })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(o => o.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useEffect(() => {
    userResult.refetch()
  }, [token, userResult])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      alert(`added book with the title: ${addedBook.title}`)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    if (recommendations.called) {
      getRecommendations({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
  }, [booksResult])


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const handleRecommendations = () => {
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
