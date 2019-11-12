import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Checkout extends Component {
  successPayment = () => {
    alert('Payment Successful');
  };

  errorPayment = () => {
    alert('Payment Error');
  };
  onToken = token => {
    axios
      .put('/api/carts/checkout', this.props.guestCart)
      .then()
      .catch('Payment error');
    this.props.clickCheckout();
  };

  render() {
    console.log(this.props.guestCart);
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
