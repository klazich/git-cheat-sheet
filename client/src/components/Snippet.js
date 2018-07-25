import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

const { Row, Column } = Grid

class Snippet extends Component {
  render() {
    return (
      <Row>
        <Column width={7} />
        <Column width={5} textAlign={'right'}>
          <p>{this.props.description}.</p>
        </Column>
        <Column width={4} color={'black'}>
          <code>$ {this.props.command}</code>
        </Column>
      </Row>
    )
  }
}

export default Snippet
