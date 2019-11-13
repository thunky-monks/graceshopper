const router = require('express').Router();
const { Cart, Product } = require('../db/models');
const { checkUser } = require('../utils');
module.exports = router;

router.use('/:id/cart', checkUser, require('./cart'));

router.get('/:id/history', checkUser, async (req, res, next) => {
  try {
    const allOrders = await Cart.findAll({
      where: {
        userId: req.params.id
      },
      include: [{ model: Product }]
    });
    res.json(allOrders);
  } catch (error) {
    next(error);
  }
});
