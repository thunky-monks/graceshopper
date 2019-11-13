import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { checkout } from '../store/cart';
import { connect } from 'react-redux';

export default connect(
  state => ({ cart: state.cart }),
  dispatch => ({
    checkout: (userId, cart) => dispatch(checkout(userId, cart))
  })
)(
  class Checkout extends Component {
    successPayment = () => {
      alert('Payment Successful');
    };

    errorPayment = () => {
      alert('Payment Error');
    };
    onToken = token => {
      if (this.props.isLoggedIn) {
        this.props.checkout(this.props.userId, this.props.cart);
        this.successPayment();
      } else {
        axios
          .put('/api/carts/checkout', this.props.guestCart)
          .then(this.successPayment())
          .catch('Payment error');
        this.props.clickCheckout();
      }
    };

    render() {
      return (
        <StripeCheckout
          stripeKey="pk_test_KN27EtqY7xQBhWBzXv8V4ezk00O5ZntEg7"
          token={this.onToken}
          label="Pay with card"
          panelLabel="Checkout"
        />
      );
    }
  }
);
