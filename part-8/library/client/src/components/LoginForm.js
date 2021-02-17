import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user', token)
    }
  }, [result.data]) // eslint-disable-line



  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }


  return (
    <form onSubmit={submit}>
      <label htmlFor='username'>Username</label>
      <input id='username' value={username}
        onChange={({ target }) => setUsername(target.value)} />
      <br />
      <label htmlFor='password'>Password</label>
      <input id='password' type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)} />
      <button type='submit'>Log in</button>
    </form>
  )
}

export default LoginForm
