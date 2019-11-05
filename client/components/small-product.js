/*eslint-disable react/display-name*/
import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'

export default props => (
  <Card>
    <Image src={props.imageURL} />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      {/* <Card.Meta>MANUFACTURER GOES HERE</Card.Meta> */}
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name="dollar sign" />
      {props.price}
    </Card.Content>
  </Card>
)
