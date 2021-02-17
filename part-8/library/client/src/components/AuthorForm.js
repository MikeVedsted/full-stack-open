import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ authors }) => {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [year, setYear] = useState(1900)
  const [editAuthorBorn] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    const born = Number(year)
    editAuthorBorn({ variables: { name, born } })
  }

  return (
    <form onSubmit={submit} style={{ margin: '40px 0' }}>
      {error && <p>{error}</p>}
      <label htmlFor='name'>Name</label>
      <select id='name' onBlur={({ target }) => setName(target.value)}>
        {authors.map(author => (
          <option key={author.name} value={author.name}>{author.name}</option>
        ))}
      </select>
      <br />
      <label htmlFor='born'>Born in</label>
      <input id='born' type='number' value={year} onChange={({ target }) => setYear(target.value)} />
      <br />
      <button type='submit'>Update author</button>
    </form >
  )
}

export default AuthorForm
