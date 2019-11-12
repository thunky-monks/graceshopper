import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export default class Checkout extends Component {
  successPayment = () => {
    alert('Payment Successful')
  }

  errorPayment = () => {
    alert('Payment Error')
  }
  onToken = token => {
    axios
      .put('/api/carts/checkout', this.props.guestCart)
      .then('Payment successfull')
      .catch('Payment error')
  }

  render() {
    console.log(this.props.guestCart)
    return (
      <StripeCheckout
        stripeKey="pk_test_KN27EtqY7xQBhWBzXv8V4ezk00O5ZntEg7"
        token={this.onToken}
        label="Pay with 💳"
        panelLabel="Checkout"
      />
    )
  }
}

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
