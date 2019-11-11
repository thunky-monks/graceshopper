/*eslint-disable react/display-name*/
import React, {Component} from 'react'
import {Item, Input, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeQuantity, removeItem} from '../store/cart'

export default connect(null, dispatch => ({
  changeQuantity: (quantity, productId) => () =>
    dispatch(changeQuantity(quantity, productId)),
  removeItem: productId => () => dispatch(removeItem(productId))
}))(
  class CartProduct extends Component {
    constructor(props) {
      super(props)
      this.state = {
        quantity: this.props.quantity
      }
      this.handleChange = this.handleChange.bind(this)
      this.calculateItemTotal = this.calculateItemTotal.bind(this)
    }

    handleChange(event) {
      this.setState({quantity: event.target.value})
    }

    calculateItemTotal() {
      return (this.props.price * this.props.quantity).toFixed(2)
    }

    render() {
      return (
        <Item>
          <Item.Image size="small" src={this.props.imageURL} />
          <Item.Content verticalAlign="middle">
            <Item.Header>{this.props.name}</Item.Header>
            <Item.Meta>Price: ${this.props.price}</Item.Meta>
            <Item.Meta>Item total: ${this.calculateItemTotal()} </Item.Meta>
            <Input
              label="Quantity:"
              placeholder={this.state.quantity}
              onChange={this.handleChange}
            />
            <Button
              primary
              onClick={this.props.changeQuantity(
                +this.state.quantity,
                this.props.id
              )}
            >
              Update
            </Button>
          </Item.Content>
          <Button
            color="red"
            onClick={this.props.removeItem(this.props.id)}
            className="removeCartButton"
          >
            Remove from Cart
          </Button>
        </Item>
      )
    }
  }
)
