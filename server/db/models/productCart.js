const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('product_cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})
