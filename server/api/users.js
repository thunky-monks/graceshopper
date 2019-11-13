const router = require('express').Router();
const { User, Cart, Product } = require('../db/models');
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

router.put('/:id', checkUser, async (req, res, next) => {
  try {
    const { email, firstName, lastName, address } = req.body;
    const theUser = await User.findByPk(req.params.id);
    const updatedUser = await theUser.update({
      email,
      firstName,
      lastName,
      address
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

//FOR ADMINS?
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email', 'firstName', 'lastName', 'address']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
