const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  datePurchased: {
    type: Sequelize.DATE,
    // validate: {
    //   isDate: true
    // },
    defaulValue: null
  }
  // active: {
  //   type: Sequelize.BOOLEAN,
  //   defaulValue: true
  // }
})

module.exports = Cart
