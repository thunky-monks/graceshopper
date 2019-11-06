const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// router.param((id, req, res, next) => {
// findByPk
// call next if it exists
// call next with an error if it doesn't
// })

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    // if (singleProduct) {...}
    res.send(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const decreased = await Product.decrease(req.body.quantity, req.params.id)
    if (decreased) {
      res.send(decreased)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
