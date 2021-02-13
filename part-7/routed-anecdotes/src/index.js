import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const WithRouter = () => (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(<WithRouter />, document.getElementById('root'))