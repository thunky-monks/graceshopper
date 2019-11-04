const crypto = require('crypto')
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
    allowNull: false,
    defaultValue:
      'http://www.cpsglobalgroup.com/wp-content/uploads/2017/11/placeholder.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product