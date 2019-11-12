import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  successPayment = () => {
    alert('Payment Successful');
  };

  errorPayment = () => {
    alert('Payment Error');
  };
  onToken = token => {
    if (this.props.isLoggedIn) {
      console.log('logged in user checking out with stripe');
      console.log('checking props:', this.props.userId, this.props.cart);
      let cart = this.props.cart;
      axios
        .post(`/api/users/${this.props.userId}/cart/checkout`, { cart })
        .then()
        .catch('Payment error');
      // this.props.checkout(this.props.userId, this.props.cart);
    } else {
      axios
        .put('/api/carts/checkout', this.props.guestCart)
        .then()
        .catch('Payment error');
      this.props.clickCheckout();
    }
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

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id,
//     userId: state.user.id,
//     products: state.products,
//     cart: state.cart
//   }
// }

// export default connect(mapState, mapDispatch)(Checkout)

// const CURRENCY = 'USD'

// const fromUSDToCent = amount => amount * 100

// const onToken = (amount, description) => token =>
//   axios
//     .post(PAYMENT_SERVER_URL, {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromUSDToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment)

// const Checkout = ({name, description, amount}) => (
//   <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromUSDToCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={process.env.PUBLIC_STRIPE_KEY}
//   />
// )
// export default Checkout

// import React from 'react'
// import StripeCheckout from 'react-stripe-checkout'

// export default class Checkout extends React.Component {
//   onToken = (token, addresses) => {
//     console.log('testing this')
//   }

//   render() {
//     return (
//       <StripeCheckout
//         stripekey={process.env.PUBLISH_STRIPE_KEY}
//         token={this.onToken}
//       />
//     )
//   }
// }
