// const stripe = require('stripe')(process.env.STRIPE_API_KEY)

// (async () => {

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         name: 'T-shirt',
//         description: 'Comfortable cotton t-shirt',
//         images: ['https://example.com/t-shirt.png'],
//         amount: 500,
//         currency: 'usd',
//         quantity: 1,
//       }],
//       success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//       cancel_url: 'https://example.com/cancel',
//     });

//     const charge = await stripe.charges.create({
//         //     amount: 1000,
//         //     currency: 'usd',
//         //     source: 'tok_visa',
//         //     receipt_email: 'jenny.rosen@example.com'
//         //   })
//   })();
// })
