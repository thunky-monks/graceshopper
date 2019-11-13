/*eslint-disable react/display-name*/
import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeQuantity, addItem } from '../store/cart';

export default connect(
  state => ({
    cart: state.cart,
    user: state.user
  }),
  dispatch => ({
    changeQuantity: (userId, quantity, productId) => () => {
      dispatch(changeQuantity(userId, quantity, productId));
    },
    addItem: (userId, quantity, productId) => () => {
      dispatch(addItem(userId, quantity, productId));
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
                  props.user.id,
                  props.cart[props.id] + 1,
                  props.id
                )
              : props.addItem(props.user.id, 1, props.id)
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
));
