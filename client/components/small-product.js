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
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { recentlyAdded: 0 };
      this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
      if (this.props.cart[this.props.id]) {
        this.props.changeQuantity(
          this.props.user.id,
          this.props.cart[this.props.id] + 1,
          this.props.id
        );
      } else this.props.addItem(this.props.user.id, 1, this.props.id);
      this.setState({ recentlyAdded: this.props.id });
    }

    render() {
      return (
        <Card>
          <Link to={`/products/${this.props.id}`}>
            <Image className="small-card-image" src={this.props.imageURL} />
          </Link>
          <Card.Content>
            <Link to={`/products/${this.props.id}`}>
              <Card.Header id="small-card-header">
                {this.props.name}
              </Card.Header>
            </Link>
            <Card.Description id="small-card-description">
              {this.props.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span id="price">
              <Icon name="dollar sign" />
              {this.props.price}
              {this.state.recentlyAdded === this.props.id ? (
                <span> Added to cart!</span>
              ) : (
                ''
              )}
            </span>
            <span className="right floated">
              <Button animated="vertical" onClick={this.clickHandler}>
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            </span>
          </Card.Content>
        </Card>
      );
    }
  }
);
