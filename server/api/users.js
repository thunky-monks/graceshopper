const router = require('express').Router()
// const {User} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.use('/:id/cart', checkUser, require('./cart'))

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
