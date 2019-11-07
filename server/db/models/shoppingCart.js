const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  datePurchased: {
    type: Sequelize.DATE
  }
})

Cart.getUsersCart = function(userId) {
  const cartById = Cart.findOne({
    where: {
      datePurchased: null,
      userId: userId
    }
  })
  return cartById
}

module.exports = Cart
