// import axios from 'axios'
import React, { Component } from 'react'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      error: null,
    }
  }

  async componentDidMount() {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: 'kevin', password: 'abc123' }),
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error })
        else this.setState({ data: res.token })
      })
  }

  render() {
    const { token } = this.state
    return (
      <div>
        <h2>Test</h2>
        <p>{token}</p>
      </div>
    )
  }
}

export default Test
