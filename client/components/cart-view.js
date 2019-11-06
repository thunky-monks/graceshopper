import React, {Component} from 'react'
import {CART_HEADER} from '../strings'
import {connect} from 'react-redux'

import CartProduct from './cart-product'

import {getCart} from '../store/cart'
import {Item} from 'semantic-ui-react'

export default connect(
  state => ({products: state.products, cart: state.cart}),
  dispatch => ({getCart: () => dispatch(getCart())})
)(
  class CartView extends Component {
    componentDidMount() {
      this.props.getCart()
    }
    render() {
      return (
        <div>
          <div className="cartHeader">
            <h1>{CART_HEADER}</h1>
          </div>
          <Item.Group>
            {this.props.products
              .filter(product => this.props.cart[product.id])
              .map(product => (
                <CartProduct
                  key={product.id}
                  {...product}
                  quantity={this.props.cart[product.id]}
                />
              ))}
          </Item.Group>
        </div>
      )
    }
  }
)
