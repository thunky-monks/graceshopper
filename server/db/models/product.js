const Sequelize = require('sequelize')
const db = require('../db')

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
    // 0.015
    // store this as PENNIES, and INTEGER
    // maximum
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
  // call this inventory
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
      // maximum
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'http://www.cpsglobalgroup.com/wp-content/uploads/2017/11/placeholder.jpg',
    validate: {
      isUrl: true
    }
  }
})

// class versus prototype methods
Product.decrease = async function(num, id) {
  const product = await this.findByPk(id)
  let updated
  if (product) {
    updated = await product.update({quantity: product.quantity - num})
    return product
  }
}

module.exports = Product
