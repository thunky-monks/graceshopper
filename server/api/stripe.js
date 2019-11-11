const stripe = require('stripe')(STRIPE_API_KEY)
// const stripe = require('stripe')(stripeApiKey);

;(async () => {
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })
})()
