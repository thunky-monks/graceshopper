const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', (req, res, next) => {
  try {
    // const cartItems = await Cart.findAll()
    // res.json(cartItems)
    console.log(req.session)
    // res.json(req.session)
    // console.log(req.session)
  } catch (error) {
    next(error)
  }
})

module.exports = router
