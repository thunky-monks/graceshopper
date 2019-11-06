const router = require('express').Router()
const {Cart, ProductCart} = require('../db/models')

// could go into a different file or folder
// middleware functions

// function isUser(req, res, next) {
// check for user
// next if they exist
// throw an error, or next(error) if they don't
// }

// security, guarding your gates - gatekeeper middleware
// PUT, POST, DELETE - only the users we WANT are able to access them
// users must be protected

// identifying more RESTful routes
// /api/carts
// /api/users/:id/cart
router.get('/', async (req, res, next) => {
  try {
    // const cartById = await Cart.findAll({
    //   where: {
    //     userId: req.user.id
    //   }
    // })

    // eager load your join table
    const cartById = await Cart.getUsersCart(req.user.id)

    const cartItems = await ProductCart.findAll({
      where: {
        cartId: cartById.id
      }
    })
    if (!cartItems) res.sendStatus(404)
    else {
      res.json(cartItems)
      // console.log(req.user.id)
    }
  } catch (error) {
    next(error)
  }
})

// setting datePurchased to true rendering a cart to become an order
// update your inventory in your products table
// setting final price in your ORDER, final quantity per each item in your join table

router.post('/checkout', async (req, res, next) => {
  try {
    const activeCart = await Cart.getUsersCart(req.user.id)

    activeCart.update({datePurchased: new Date()})

    const newCart = await Cart.create({userId: req.user.id})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const activeCart = await Cart.getUsersCart(req.user.id)

    const {id, quantity} = req.body
    // activeCart.addProducts(...)
    const newProduct = ProductCart.create({
      productId: id,
      quantity,
      cartId: activeCart.id
    })

    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    const activeCart = await Cart.getUsersCart(req.user.id)
    const cartItem = await ProductCart.findOne({
      where: {productId: req.body.productId, cartId: activeCart.id}
    })
    // cartItem.update(...)
    const updatedCart = await ProductCart.changeQuantity(
      cartItem,
      req.body.quantity
    )
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const activeCart = await Cart.getUsersCart(req.user.id)
    const product = await ProductCart.findOne({
      where: {
        productId,
        cartId: activeCart.id
      }
    })

    if (!product) res.sendStatus(404)
    else {
      product.destroy()
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
