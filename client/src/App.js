import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'

import logo from './logo.svg'
import './App.css'

import Home from './components/Home'
import Hello from './components/Hello'
import About from './components/About'
import Stuff from './components/Stuff'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <ul>
              <li>
                <Link to="/hello">Hello</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/stuff">Stuff</Link>
              </li>
            </ul>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/hello" component={Hello} />
              <Route
                path="/hello/goodmorning"
                render={() => {
                  return <h1>Goodmorning</h1>
                }}
              />
              <Route path="/stuff" component={Stuff} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
