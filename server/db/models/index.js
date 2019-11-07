const User = require('./user')
const Product = require('./product')
const Cart = require('./shoppingCart')
const ProductCart = require('./productCart')

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
