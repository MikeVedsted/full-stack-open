import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const style = { table: { tableLayout: 'fixed' }, header: { textAlign: 'left', width: '240px', overflow: 'hidden' } }
  const [filter, setFilter] = useState('all genres')
  const filteredBooks = filter === 'all genres' ? books : books.filter(b => b.genres.includes(filter))
  let genres = ['all genres']

  books.forEach(book => {
    book.genres.map(genre => genres.includes(genre) ? null : genres = genres.concat(...book.genres))
  });

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setFilter(genre)} >{genre}</button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th style={style.header}>Title</th>
            <th style={style.header}>Author</th>
            <th style={style.header}>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Books