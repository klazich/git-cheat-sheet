import axios from 'axios'
import React, { Component } from 'react'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = { token: '' }
  }

  async componentDidMount() {
    try {
      const res = await axios.post('/api/register', {
        username: 'KevinLazich',
        password: 'abc123',
      })
      console.log(res.data)
      const token = await res.data.token
      this.setState('token', token)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h2>Test</h2>
        <p>{this.state.token}</p>
      </div>
    )
  }
}

export default Test
