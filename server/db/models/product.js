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

Product.decrease = async function(num, id) {
  const product = await this.findByPk(id)
  let updated
  if (product) {
    updated = await product.update({quantity: product.quantity - num})
    return product
  }
}

Product.updateInventory = async function(cart) {
  const products = await this.findAll({
    where: {
      id: Object.keys(cart)
    }
  })
  console.log('all products', products)
  console.log('cart', cart)
  for (let i in cart) {
    // if (true) {
    console.log('cart at i', cart[i])
    const theProduct = products.find(product => product.id === i)
    console.log('theProduct', theProduct)
    // console.log('products at i quantity', theProduct.quantity)
    theProduct.quantity -= cart[i]
    await theProduct.save()
    // }
  }
  console.log('products', products)
}

module.exports = Product
