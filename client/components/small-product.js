/*eslint-disable react/display-name*/
import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeQuantity, addItem} from '../store/cart'

export default connect(
  state => ({
    user: state.user,
    cart: state.cart
  }),
  dispatch => ({
    changeQuantity: (quantity, productId, userId) => () => {
      dispatch(changeQuantity(quantity, productId, userId))
    },
    addItem: (quantity, productId, userId) => () => {
      dispatch(addItem(quantity, productId, userId))
    }
  })
)(props => (
  <Card>
    <Link to={`/products/${props.id}`}>
      <Image className="small-card-image" src={props.imageURL} />
    </Link>
    <Card.Content>
      <Link to={`/products/${props.id}`}>
        <Card.Header id="small-card-header">{props.name}</Card.Header>
      </Link>
      {/* <Card.Meta>MANUFACTURER GOES HERE</Card.Meta> */}
      <Card.Description id="small-card-description">
        {props.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <span id="price">
        <Icon name="dollar sign" />
        {props.price}
      </span>
      <span className="right floated">
        <Button
          animated="vertical"
          onClick={
            props.cart[props.id]
              ? props.changeQuantity(
                  props.cart[props.id] + 1,
                  props.id,
                  props.user.id
                )
              : props.addItem(1, props.id, props.user.id)
          }
        >
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </span>
    </Card.Content>
  </Card>
))
