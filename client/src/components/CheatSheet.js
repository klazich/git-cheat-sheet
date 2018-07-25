import React, { Component } from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'

import Category from './Category'

class CheatSheet extends Component {
  state = {
    snippets: [],
    categories: [],
  }

  componentDidMount() {
    fetch('/api/snippets.json')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          snippets: res.snippets,
          categories: res.categories,
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.categories.map((categoryName, i) => (
          <Category
            key={i}
            name={categoryName}
            snippets={this.state.snippets.filter(
              ({ category }) => category === categoryName
            )}
          />
        ))}
      </div>
    )
  }
}

export default CheatSheet
