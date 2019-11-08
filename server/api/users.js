const router = require('express').Router()
// const {User} = require('../db/models')
module.exports = router

const checkUser = (req, res, next) => {
  console.log('SERVER SAYS REQ.USER.ID:', req.user.id)
  console.log('SERVER SAYS REQ.PARAMS.ID:', req.user.id)
  if (req.user.id === req.params.id) next()
  else res.sendStatus(503)
}

router.use(':id/cart', checkUser, require('./cart'))

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
