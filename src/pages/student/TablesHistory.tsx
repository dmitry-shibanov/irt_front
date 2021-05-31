import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
class TablesHistoryList extends Component {
    
    render() {
        return (
            <ListGroup>
  <ListGroup.Item>No style</ListGroup.Item>
  <ListGroup.Item variant="primary">Primary</ListGroup.Item>
  <ListGroup.Item action variant="secondary">
    Secondary
  </ListGroup.Item>
  <ListGroup.Item action variant="success">
    Success
  </ListGroup.Item>
  <ListGroup.Item action variant="danger">
    Danger
  </ListGroup.Item>
  <ListGroup.Item action variant="warning">
    Warning
  </ListGroup.Item>
  <ListGroup.Item action variant="info">
    Info
  </ListGroup.Item>
  <ListGroup.Item action variant="light">
    Light
  </ListGroup.Item>
  <ListGroup.Item action variant="dark">
    Dark
  </ListGroup.Item>
</ListGroup>
        )
    }
}

export default TablesHistoryList;