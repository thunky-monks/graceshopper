/*eslint-disable react/display-name*/
import React, {Component} from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeQuantity, addItem} from '../store/cart'

class GuestSmallProduct extends Component {
  render() {
    return (
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
          <Button
            animated="vertical"
            onClick={
              props.cart[props.id]
                ? props.changeQuantity(props.cart[props.id] + 1, props.id)
                : props.addItem(1, props.id)
            }
          >
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name="shop" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    )
  }
}
