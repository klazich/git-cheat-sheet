import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'

// import logo from './logo.svg'
import './App.css'

import CheatSheet from './components/CheatSheet'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={CheatSheet} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
