import React from 'react'
import { connect } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const { filter } = props.filter

  const style = {
    marginBottom: 10
  }

  return (
    <label style={style}>
      Filter
      <input type='text'
        value={filter}
        onChange={({ target }) => props.setFilter(target.value)} />
      <button onClick={() => props.clearFilter()}>Clear</button>
    </label>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = { setFilter, clearFilter }
const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default connectedFilter
