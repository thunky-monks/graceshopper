const Sequelize = require('sequelize');
const db = require('../db');
const ProductCart = require('./productCart');
const Product = require('./product');

const Cart = db.define('cart', {
  datePurchased: {
    type: Sequelize.DATE
  }
});

Cart.getUsersCart = function(userId) {
  const cartById = Cart.findOne({
    where: {
      datePurchased: null,
      userId: userId
    },
    include: [{ model: Product }]
  });
  return cartById;
};
Cart.prototype.addPriceAtPurchase = async function() {
  console.log('HELLO LALALALA');
  const contents = await ProductCart.findAll({
    where: {
      cartId: this.id
    }
  });
  await Promise.all(
    contents.map(content => {
      const p = this.products.find(product => product.id === content.productId);
      content.priceAtPurchase = p.price;
      return content.save();
    })
  );
};

module.exports = Cart;
