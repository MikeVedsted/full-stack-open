import React from 'react'

const Notification = ({ message }) => {
  const style = { hide: { display: 'none' }, show: { padding: '10px', width: '400px', margin: '20px 0', border: '1px solid black' } }
  return (
    <div style={!message ? style.hide : style.show}>
      {message}
    </div>
  )
}

export default Notification
