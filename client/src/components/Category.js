import React, { Component } from 'react'
import { Grid, Container, Header, Divider } from 'semantic-ui-react'

import Snippet from './Snippet'

class Category extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Header as="h2" textAlign={'right'} block={true}>
          {this.props.name}
        </Header>
        <Grid columns="equal">
          {this.props.snippets.map(snip => (
            <Snippet
              key={snip._id}
              description={snip.description}
              command={snip.command}
            />
          ))}
        </Grid>
        <Divider hidden />
      </Container>
    )
  }
}

export default Category
