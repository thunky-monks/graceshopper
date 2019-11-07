import React, {Component} from 'react'
import {CART_HEADER} from '../strings'
import {connect} from 'react-redux'

import CartProduct from './cart-product'

import {getCart, checkout} from '../store/cart'
import {Item, Button} from 'semantic-ui-react'

export default connect(
  state => ({products: state.products, cart: state.cart}),
  dispatch => ({
    // getCart: () => dispatch(getCart()),
    checkout: cart => () => dispatch(checkout(cart))
  })
)(
  class GuestCartView extends Component {
    constructor(props) {
      super(props)

      this.calcCart = this.calcCart.bind(this)
    }

    componentDidMount() {
      //   this.props.getCart()
      localStorage.setItem('erin', 100)
      // console.log(localStorage)
    }

    calcCart() {
      console.log('calculating the cart!')
      return this.props.products.products.filter(
        product => this.props.cart[product.id]
      )
    }

    render() {
      const theCart = this.calcCart()
      const theCartCount = theCart.reduce(
        (total, item) => total + this.props.cart[item.id],
        0
      )
      const theTotal = theCart
        .reduce(
          (total, item) => total + item.price * this.props.cart[item.id],
          0
        )
        .toFixed(2)

      console.log(this.props)
      return (
        <div>
          <div className="cartHeader">
            <h1>{CART_HEADER}</h1>
            <h1>THIS IS THE GUEST VIEW MUDAFUKA</h1>
          </div>
          <Item.Group>
            {theCart.map(product => (
              <CartProduct
                key={product.id}
                {...product}
                quantity={this.props.cart[product.id]}
              />
            ))}
          </Item.Group>

          <div className="checkout-container">
            <h3>
              Subtotal ({theCartCount} items): ${theTotal}
            </h3>
            <Button
              color="olive"
              onClick={this.props.checkout(this.props.cart)}
            >
              Checkout
            </Button>
          </div>
        </div>
      )
    }
  }
)
