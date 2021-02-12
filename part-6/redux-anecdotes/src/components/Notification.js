import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message } = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: '20px 0'
  }

  return (
    <div style={message !== null ? style : { display: 'none' }}>
      {message}
    </div>
  )
}

export default Notification