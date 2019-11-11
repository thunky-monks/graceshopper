const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (products) res.json(products)
    else res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    if (singleProduct) res.send(singleProduct)
    else res.status(404).send('404')
  } catch (err) {
    next(err)
  }
})
