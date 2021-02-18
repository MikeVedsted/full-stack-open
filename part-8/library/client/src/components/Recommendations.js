const Recommendations = ({ show, books, user }) => {
  const style = { table: { tableLayout: 'fixed' }, header: { textAlign: 'left', width: '240px', overflow: 'hidden' } }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommended reading</h2>
      <p>Hi {user.username}</p>
      <p>We have the following books in you favorite genre: <strong>{user.favoriteGenre ? user.favoriteGenre : null}</strong></p>
      <table>
        <thead>
          <tr>
            <th style={style.header}>Title</th>
            <th style={style.header}>Author</th>
            <th style={style.header}>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b =>
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

export default Recommendations
