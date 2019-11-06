/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getSingleProducts} from '../store/product'
import {BIG_PRODUCTS_HEADER} from '../strings'
import {Item, Button, Input} from 'semantic-ui-react'

export default connect(
  state => ({products: state.products}),
  dispatch => ({
    getSingleProducts: productId => dispatch(getSingleProducts(productId))
  })
)(
  class extends React.Component {
    componentDidMount() {
      this.props.getSingleProducts(this.props.match.params.id)
    }

    render() {
      console.log(this.props)
      return (
        <div>
          <div className="productHeader">
            <h1>hello</h1>
          </div>
          <div className="single-big-view">
            <Item>
              <Item.Image
                size="medium"
                src={this.props.products.singleProduct.imageURL}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  {this.props.products.singleProduct.name}
                </Item.Header>
                <Item.Meta>
                  Price: ${this.props.products.singleProduct.price}
                </Item.Meta>
                <Item.Meta> </Item.Meta>
              </Item.Content>
            </Item>
          </div>
        </div>
      )
    }
  }
)

{
  /* <Item.Group>
           {this.props.products
             .filter(product => this.props.cart[product.id])
             .map(product => (
               <CartProduct
                 key={product.id}
                 {...product}
                 quantity={this.props.cart[product.id]}
               />
             ))}
         </Item.Group> */
}

// {
