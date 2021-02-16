import React from 'react'

const Books = ({ show, books }) => {
  const style = { textAlign: 'left' }
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th style={style}>Title</th>
            <th style={style}>Author</th>
            <th style={style}>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books