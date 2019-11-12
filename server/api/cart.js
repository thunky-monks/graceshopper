const router = require('express').Router()
const {Cart, ProductCart, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  // console.log('REQ PARAMS ID', req.paramsId)
  try {
    const cartById = await Cart.getUsersCart(req.params.id)
    const cartItems = await ProductCart.findAll({
      where: {
        cartId: cartById.id
      }
    })
    if (!cartItems) res.sendStatus(404)
    else {
      res.json(cartItems)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const activeCart = await Cart.getUsersCart(req.user.id)
    activeCart.update({datePurchased: new Date()})
    await Product.updateInventory(req.body.cart)
    await Cart.create({userId: req.user.id})
    res.json(activeCart)
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const activeCart = await Cart.getUsersCart(req.user.id)
    const {productId, quantity} = req.body
    const newProduct = await ProductCart.create({
      productId,
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
    console.log('req-user-id:', req.user.id)
    console.log('req.params.id:', req.params.id)
    const activeCart = await Cart.getUsersCart(req.user.id)
    const cartItem = await ProductCart.findOne({
      where: {productId: req.body.productId, cartId: activeCart.id}
    })
    const updatedCart = await cartItem.update({quantity: req.body.quantity})
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
