const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  datePurchased: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  }
})

module.exports = Cart
