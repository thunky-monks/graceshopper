import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  NotFound,
  EditProfile
} from './components';
import { me } from './store';

import { getAllProducts } from './store/product';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getAllProducts();
    localStorage.setItem('cart', JSON.stringify({}));
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route path="/product-not-found" component={NotFound} />
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={BigProduct} />
            <Route path="/users/:id/cart" component={CartView} />
            <Route path="/users/:id/edit" component={EditProfile} />
            <Route path="/home" component={UserHome} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={GuestAllProducts} />
            <Route path="/products/:id" component={GuestBigProduct} />
            <Route path="/cart" component={GuestCartView} />
          </Switch>
        )}

        <Route component={AllProducts} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    products: state.products,
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getAllProducts() {
      dispatch(getAllProducts());
    },
    getCart: userId => dispatch(getCart(userId))
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
