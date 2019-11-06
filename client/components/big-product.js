/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getSingleProducts} from '../store/product'
import {BIG_PRODUCTS_HEADER} from '../strings'

export default connect(
  state => ({products: state.products}),
  dispatch => ({getSingleProducts: id => dispatch(getSingleProducts(id))})
)(
  class extends React.Component {
    componentDidMount() {
      this.props.getSingleProducts()
    }

    render() {
      console.log(this.props)
      return (
        <div>
          <div className="productHeader">
            <h1>hello</h1>
          </div>
          <div className="single-big-view" />
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

{
  /* <Item>
         <Item.Image size=“medium” src={this.props.imageURL} />
         <Item.Content verticalAlign=“middle”>
           <Item.Header>{this.props.name}</Item.Header>
           <Item.Meta>${this.props.price}</Item.Meta>
           <Input
             label=“Quantity:”
             placeholder={this.state.quantity}
             onChange={this.handleChange}
           />
           <Button onClick={this.props.changeQuantity(this.state.quantity)}>
             Update
           </Button>
         </Item.Content>
       </Item> */
}
