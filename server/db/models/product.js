const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'No description available.'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'http://dummyimage.com/278x250.png/5fa2dd/ffffff',
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
});

Product.updateInventory = async function(cart) {
  const products = await this.findAll({
    where: {
      id: Object.keys(cart)
    }
  });
  await Promise.all(
    products.map(product => {
      product.quantity -= cart[product.id];
      return product.save();
    })
  );
};

module.exports = Product;
