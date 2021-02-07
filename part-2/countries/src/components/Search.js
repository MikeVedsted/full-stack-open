const Search = ({ searchString, setSearchString }) => <label>Find countries by name: <input type='text' value={searchString} onChange={(e) => setSearchString(e.target.value)} /></label>

export default Search
