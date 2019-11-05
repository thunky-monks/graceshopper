const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll()
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

module.exports = router
