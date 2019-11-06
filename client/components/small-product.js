/*eslint-disable react/display-name*/
import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default props => (
  <Card>
    <Link to={`/products/${props.id}`}>
      <Image src={props.imageURL} />
    </Link>
    <Card.Content>
      <Link to={`/products/${props.id}`}>
        <Card.Header>{props.name}</Card.Header>
      </Link>
      {/* <Card.Meta>MANUFACTURER GOES HERE</Card.Meta> */}
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name="dollar sign" />
      {props.price}
      <br />
      <Button animated="vertical">
        <Button.Content hidden>Add</Button.Content>
        <Button.Content visible>
          <Icon name="shop" />
        </Button.Content>
      </Button>
    </Card.Content>
  </Card>
)
