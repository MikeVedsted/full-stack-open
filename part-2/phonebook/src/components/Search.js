const Search = ({ searchString, setSearchString }) => {
  return (
    <label>
      Filter persons:
      <input type='text' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
    </label>
  )
}

export default Search
