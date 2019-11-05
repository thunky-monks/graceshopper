const router = require('express').Router()
const {Cart, ProductCart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // const cartById = await Cart.findAll({
    //   where: {
    //     userId: req.user.id
    //   }
    // })
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
  } catch (error) {
    next(error)
  }
})

module.exports = router
