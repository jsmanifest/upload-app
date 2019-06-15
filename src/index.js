import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import App from './App'
import Review from './Review'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <App path='/' />
    <Review path='/review' />
  </Router>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
