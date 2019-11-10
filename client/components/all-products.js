/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import SmallProduct from './small-product'
import {ALL_PRODUCTS_HEADER} from '../strings'

export default connect(
  state => ({products: state.products}),
  dispatch => ({getAllProducts: () => dispatch(getAllProducts())})
)(
  class AllProducts extends React.Component {
    componentDidMount() {
      this.props.getAllProducts()
    }

    render() {
      console.log('logged in view')
      return (
        <div>
          <div className="productHeader">
            <h1>{ALL_PRODUCTS_HEADER}</h1>
          </div>
          <div className="all-view">
            {this.props.products.products.map(product => (
              <SmallProduct key={product.id} {...product} />
            ))}
          </div>
        </div>
      )
    }
  }
)
