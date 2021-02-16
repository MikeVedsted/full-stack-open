import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

const WithApollo = () => {
  return (
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<WithApollo />, document.getElementById('root'))
