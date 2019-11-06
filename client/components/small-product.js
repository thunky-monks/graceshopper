/*eslint-disable react/display-name*/
import React from 'react'
import {Menu, Dropdown, Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const options = [
  {key: 1, text: '1', value: 1},
  {key: 2, text: '2', value: 2},
  {key: 3, text: '3', value: 3},
  {key: 4, text: '4', value: 4},
  {key: 5, text: '5', value: 5},
  {key: 6, text: '6', value: 6},
  {key: 7, text: '7', value: 7},
  {key: 8, text: '8', value: 8},
  {key: 9, text: '9', value: 9},
  {key: 10, text: '10', value: 10}
]

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
      <Menu compact>
        <Dropdown text="Quantity" options={options} simple item />
      </Menu>
      <Button animated="vertical">
        <Button.Content hidden>Add to Cart</Button.Content>
        <Button.Content visible>
          <Icon name="shop" />
        </Button.Content>
      </Button>
    </Card.Content>
  </Card>
)
