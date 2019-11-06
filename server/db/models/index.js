const User = require('./user')
const Product = require('./product')
const Cart = require('./shoppingCart')
const db = require('../db')
const Sequelize = require('sequelize')

// put this in a separate file
const ProductCart = db.define('product_cart', {
  // you don't need productId and cartId
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // maybe add a hook for if quantity tries to get to 0, you can just remove the instance
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

ProductCart.changeQuantity = async function(cart, quantity) {
  const updated = await cart.update({quantity})

  return updated
}

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
