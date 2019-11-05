const User = require('./user')
const Product = require('./product')
const Cart = require('./shoppingCart')
const db = require('../db')
const Sequelize = require('sequelize')

const ProductCart = db.define('product_cart', {
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
      min: 1
    }
  }
})

User.hasMany(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: {model: ProductCart}})
Product.belongsToMany(Cart, {through: {model: ProductCart}})

module.exports = {
  User,
  ProductCart,
  Product,
  Cart
}
