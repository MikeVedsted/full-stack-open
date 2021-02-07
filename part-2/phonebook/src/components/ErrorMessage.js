const ErrorMessage = ({ message }) => {

  const style = {
    color: 'LightCoral',
    backgroundColor: 'LightPink',
    fontSize: '20px',
    border: '3px solid LightCoral',
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

export default ErrorMessage
