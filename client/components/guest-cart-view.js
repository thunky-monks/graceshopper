import React, {Component} from 'react'
import {CART_HEADER} from '../strings'
import {connect} from 'react-redux'
import GuestCartProduct from './guest-cart-product'
import {guestCheckout} from '../store/cart'
// import Checkout from './stripe-checkout'
// import StripeCheckout from 'react'
import {Item, Button} from 'semantic-ui-react'

export default connect(
  state => ({products: state.products, cart: state.cart}),
  dispatch => ({
    // getCart: () => dispatch(getCart()),
    guestCheckout: cart => dispatch(guestCheckout(cart))
  })
)(
  class GuestCartView extends Component {
    constructor(props) {
      super(props)
      this.state = {
        guestCart: {}
      }
      this.calcCart = this.calcCart.bind(this)
      this.removeItem = this.removeItem.bind(this)
      this.clickCheckout = this.clickCheckout.bind(this)
    }

    componentDidMount() {
      let localStorageObj = JSON.parse(localStorage.getItem('cart'))
      this.setState({guestCart: localStorageObj})
    }

    removeItem(productId) {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      delete localCart[productId]
      localStorage.setItem('cart', JSON.stringify(localCart))
      this.setState({guestCart: localCart})
    }

    calcCart() {
      console.log('calculating the cart!')
      return this.props.products.products.filter(
        product => this.state.guestCart[product.id]
      )
    }

    clickCheckout(guestCart) {
      this.props.guestCheckout(guestCart)
      localStorage.clear()
      localStorage.setItem('cart', JSON.stringify({}))
      this.setState({guestCart: {}})
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

      console.log(this.state.guestCart)

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
                removeItem={this.removeItem}
              />
            ))}
          </Item.Group>

          <div className="checkout-container">
            <h3>
              Subtotal ({theCartCount} items): ${theTotal}
            </h3>
            <Button
              color="olive"
              onClick={() => this.clickCheckout(this.state.guestCart)}
            >
              Checkout
            </Button>
            {/* <Checkout onClick={console.log('TESTING THIS BUTTON')} /> */}
          </div>
        </div>
      )
    }
  }
)
