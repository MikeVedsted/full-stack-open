const SuccessMessage = ({ message }) => {

  const style = {
    color: 'ForestGreen',
    backgroundColor: 'LightGreen',
    fontSize: '20px',
    border: '3px solid ForestGreen',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px 0'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default SuccessMessage
