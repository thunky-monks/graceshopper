const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  datePurchased: {
    type: Sequelize.DATE
    // validate: {
    //   isDate: true
    // },
    // defaulValue: null
  }
  // active: {
  //   type: Sequelize.BOOLEAN,
  //   defaulValue: true
  // }
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

Cart.changeQuantity = async function(cart, num, id) {
  const updated = await cart.update({quantity: cart.quantity + num})

  return updated
}

module.exports = Cart
