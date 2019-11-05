const router = require('express').Router()
const {Cart, ProductCart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cartById = await Cart.findAll({
      where: {
        userId: req.user.id
      }
    })
    // const cartById = await Cart.findAll({where: {
    //   datePurchased: null}
    // })

    const cartItems = await ProductCart.findAll({
      where: {
        cartId: cartById[0].id
      }
    })
    res.json(cartItems)
    // console.log(req.user.id)
  } catch (error) {
    next(error)
  }
})

router.post('/newCart', async (req, res, next) => {
  try {
    const newCart = await Cart.create({userId: req.user.id})
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
