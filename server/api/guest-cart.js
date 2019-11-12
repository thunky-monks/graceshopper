const router = require('express').Router()
const {Cart, ProductCart, Product} = require('../db/models')

router.put('/checkout', async (req, res, next) => {
  try {
    console.log('about to update inventory')
    await Product.updateInventory(req.body.cart)
    res.json('Updated Inventory')
  } catch (error) {
    next(error)
  }
})

module.exports = router
