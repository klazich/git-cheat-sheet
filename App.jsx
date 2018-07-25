import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

// import Test from './components/Test'

class App extends Component {
  state = {
    token: '',
    error: null,
  }

  componentDidMount() {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: 'kevin', password: 'abc123' }),
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ token: res.token })
      })
  }

  render() {
    const { token } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* testing ... */}
        <p className="App-intro">
          <code>{token}</code>
        </p>
        {/* ... end testing */}
      </div>
    )
  }
}

export default App
