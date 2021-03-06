import React from 'react';
import { CART_HEADER } from '../strings';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CartProduct from './cart-product';

import { getCart, checkout } from '../store/cart';
import { Item, Button } from 'semantic-ui-react';
import Checkout from './stripe-checkout';

export default connect(
  state => ({
    products: state.products,
    cart: state.cart,
    user: state.user,
    isLoggedIn: !!state.user
  }),
  dispatch => ({
    getCart: () => dispatch(getCart()),
    checkout: (userId, cart) => () => dispatch(checkout(userId, cart))
  })
)(
  class CartView extends React.Component {
    constructor(props) {
      super(props);

      this.calcCart = this.calcCart.bind(this);
    }

    calcCart() {
      return this.props.products.products.filter(
        product => this.props.cart[product.id]
      );
    }

    render() {
      if (+this.props.match.params.id !== this.props.user.id)
        return <Redirect to="/products" />;
      const theCart = this.calcCart();
      const theCartCount = theCart.reduce(
        (total, item) => total + this.props.cart[item.id],
        0
      );
      const theTotal = theCart
        .reduce(
          (total, item) => total + item.price * this.props.cart[item.id],
          0
        )
        .toFixed(2);
      return (
        <div className="shopping-cart">
          <div className="cartHeader">
            <h1>{CART_HEADER}</h1>
          </div>
          <Item.Group>
            {theCart.map(product => (
              <CartProduct
                key={product.id}
                {...product}
                quantity={this.props.cart[product.id]}
                userId={this.props.match.params.id}
              />
            ))}
          </Item.Group>
          <div className="checkout-container">
            <h3>
              Subtotal ({theCartCount} items): ${theTotal}
            </h3>
            <Checkout
              checkout={this.props.checkout}
              cart={this.props.cart}
              isLoggedIn={this.props.isLoggedIn}
              userId={this.props.user.id}
            />
          </div>
        </div>
      );
    }
  }
);
