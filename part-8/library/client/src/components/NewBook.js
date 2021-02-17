import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(1900)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const style = {
    form: { width: '800px', backgroundColor: 'deeppink', padding: '40px', borderRadius: '8px', margin: '40px 0' },
    header: { textAlign: 'center', color: 'white', margin: '0 0 30px' },
    label: { textAlign: 'center', float: 'right', height: '40px', margin: '10px 0', padding: '0', width: '200px', backgroundColor: 'LightGrey' },
    input: { textAlign: 'right', width: '600px', height: '40px', margin: '10px 0', padding: '0', border: 'none' },
    button: { width: '100%', height: '40px', border: 'none', backgroundColor: 'white' },
    genres: { width: '100%', margin: '0 0 10px', color: 'white' }
  }
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const pup = Number(published)
    addBook({ variables: { title, author, published: pup, genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <form style={style.form} onSubmit={submit}>
      <h2 style={style.header} >Add a book</h2>
      <div>
        <label style={style.label} htmlFor='title'>Title</label>
        <input style={style.input} id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <label style={style.label} htmlFor='author'>Author</label>
      <input style={style.input} id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />

      <label style={style.label} htmlFor='published'>Published</label>
      <input style={style.input} id='published' type='number' value={published} onChange={({ target }) => setPublished(target.value)} />

      <input style={style.input} value={genre} onChange={({ target }) => setGenre(target.value)} />
      <button style={style.label} onClick={addGenre} type="button">Add genre</button>

      <div style={style.genres}>
        Genres: {genres.join(' ')}
      </div>
      <button style={style.button} type='submit'>Add book</button>
    </form >
  )
}

export default NewBook