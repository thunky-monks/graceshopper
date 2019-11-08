/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getSingleProducts} from '../store/product'
import {Item, Input, Button, Icon} from 'semantic-ui-react'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import {changeQuantity, addItem} from '../store/cart'

export default connect(
  state => ({
    products: state.products,
    cart: state.cart
  }),
  dispatch => ({
    getSingleProducts: productId => dispatch(getSingleProducts(productId)),
    changeQuantity: (quantity, productId) => () =>
      dispatch(changeQuantity(quantity, productId)),
    addItem: (quantity, productId) => () => {
      dispatch(addItem(quantity, productId))
    }
  })
)(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        quantity: this.props.quantity
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
      this.setState({quantity: event.target.value})
    }
    componentDidMount() {
      this.props.getSingleProducts(this.props.match.params.id)
    }

    render() {
      console.log('ID', this.props.match.params.id)
      console.log(this.props.products.products)
      if (
        !this.props.products.products.some(
          product => product.id === +this.props.match.params.id
        )
      )
        return <Redirect to="/products" />
      return (
        <div className="single-big-view">
          <div>
            <Item>
              <Item.Image
                size="large"
                src={this.props.products.singleProduct.imageURL}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header id="singleViewHeader">
                  {this.props.products.singleProduct.name}
                </Item.Header>
                <br />
                <br />
                <Item.Description>
                  <div id="big-view-description"> Description:</div>
                  {this.props.products.singleProduct.description}
                </Item.Description>
                <br />

                <Item.Meta>
                  <div id="big-view-description">Price: </div>
                  <Icon name="dollar sign" />
                  {this.props.products.singleProduct.price}
                </Item.Meta>
                <Item.Meta> </Item.Meta>
              </Item.Content>
            </Item>
          </div>
          <br />
          <Input
            label="Quantity:"
            placeholder="Quantity"
            onChange={this.handleChange}
          />
          <Button
            animated="vertical"
            onClick={
              this.props.cart[this.props.products.singleProduct.id]
                ? this.props.changeQuantity(
                    this.props.cart[this.props.products.singleProduct.id] +
                      +this.state.quantity,
                    this.props.products.singleProduct.id
                  )
                : this.props.addItem(
                    +this.state.quantity,
                    this.props.products.singleProduct.id
                  )
            }
          >
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name="shop" />
            </Button.Content>
          </Button>
          <br />
          <br />
          <div>
            <Button icon labelPosition="left">
              <Icon name="left arrow" />
              <Link to="/products">Back</Link>
            </Button>
            <br />
            <br />
          </div>
        </div>
      )
    }
  }
)
