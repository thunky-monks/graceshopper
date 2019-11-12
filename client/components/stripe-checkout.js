import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';
const CURRENCY = 'USD'

const fromUSDToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)
const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={process.env.PUBLIC_STRIPE_KEY}
  />
)
export default Checkout

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
