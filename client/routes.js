import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  BigProduct,
  CartView,
  GuestAllProducts,
  GuestBigProduct,
  GuestCartView,
  NotFound
} from './components'
import {me} from './store'

import {getAllProducts} from './store/product'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log(this.props.isLoggedIn)
    console.log(this.props.userId)
    this.props.loadInitialData()
    this.props.getAllProducts()
  }

  render() {
    const {isLoggedIn} = this.props
    // this.props.getCart(this.props.userId)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={BigProduct} /> */}
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={BigProduct} />
            <Route path="/users/:id/cart" component={CartView} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/products" component={GuestAllProducts} />
            <Route path="/products/:id" component={GuestBigProduct} />
            <Route path="/cart" component={GuestCartView} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our AllProducts component as a fallback */}
        <Route component={AllProducts} />
        <Route path="/product-not-found" component={NotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    products: state.products,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getAllProducts() {
      dispatch(getAllProducts())
    },
    getCart: userId => dispatch(getCart(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
