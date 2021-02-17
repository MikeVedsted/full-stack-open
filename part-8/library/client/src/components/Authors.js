import React from 'react'

import AuthorForm from './AuthorForm'

const Authors = ({ show, authors }) => {
  const style = { textAlign: 'left' }
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th style={style}>Name</th>
            <th style={style}>Born</th>
            <th style={style}>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || 'Unknown'}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <AuthorForm authors={authors} />
    </div>
  )
}

export default Authors