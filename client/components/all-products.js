/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import SmallProduct from './small-product'
import {ALL_PRODUCTS_HEADER} from '../strings'

export default connect(
  state => ({products: state.products, user: state.user}),
  dispatch => ({getAllProducts: () => dispatch(getAllProducts())})
)(
  class AllProducts extends React.Component {
    componentDidMount() {
      this.props.getAllProducts()
    }

    render() {
      return (
        <div>
          <div className="productHeader">
            <h2>{ALL_PRODUCTS_HEADER}</h2>
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
