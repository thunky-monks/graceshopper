const stripe = require('stripe')(process.env.STRIPE_API_KEY)(async () => {
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })
})()
