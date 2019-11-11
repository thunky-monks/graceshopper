import React, {Component} from 'react'
import {CART_HEADER} from '../strings'
import {connect} from 'react-redux'
import GuestCartProduct from './guest-cart-product'

// import {getCart, checkout} from '../store/cart'
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
      this.state = {
        guestCart: {}
      }
      this.calcCart = this.calcCart.bind(this)
    }

    componentDidMount() {
      let localStorageObj = JSON.parse(localStorage.getItem('cart'))
      this.setState({guestCart: localStorageObj})
    }

    calcCart() {
      console.log('calculating the cart!')
      return this.props.products.products.filter(
        product => this.state.guestCart[product.id]
      )
    }

    render() {
      //COME BACK TO THIS AND UNDERSTAND THIS FUNCTION
      const theCart = this.calcCart()
      const theCartCount = theCart.reduce(
        (total, item) => total + this.state.guestCart[item.id],
        0
      )
      const theTotal = theCart
        .reduce(
          (total, item) => total + item.price * this.state.guestCart[item.id],
          0
        )
        .toFixed(2)

      return (
        <div>
          <div className="cartHeader">
            <h1>{CART_HEADER}</h1>
          </div>
          <Item.Group>
            {theCart.map(product => (
              <GuestCartProduct
                key={product.id}
                {...product}
                quantity={this.state.guestCart[product.id]}
              />
            ))}
          </Item.Group>

          <div className="checkout-container">
            <h3>
              Subtotal ({theCartCount} items): ${theTotal}
            </h3>
            <Button
              color="olive"
              onClick={this.props.checkout(this.state.guestCart)}
            >
              Checkout
            </Button>
          </div>
        </div>
      )
    }
  }
)
