import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    console.log('testing this')
  }

  render() {
    return (
      <StripeCheckout
        stripekey={process.env.PUBLISH_STRIPE_KEY}
        token={this.onToken}
      />
    )
  }
}
