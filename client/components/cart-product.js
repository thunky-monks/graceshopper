/*eslint-disable react/display-name*/
import React, {Component} from 'react'
import {Item, Input, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

import {changeQuantity} from '../store/cart'

export default connect(null, dispatch => ({
  changeQuantity: quantity => () => dispatch(changeQuantity(quantity))
}))(
  class CartProduct extends Component {
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

    render() {
      return (
        <Item>
          <Item.Image size="medium" src={this.props.imageURL} />
          <Item.Content verticalAlign="middle">
            <Item.Header>{this.props.name}</Item.Header>
            <Item.Meta>${this.props.price}</Item.Meta>
            <Input
              label="Quantity:"
              placeholder={this.state.quantity}
              onChange={this.handleChange}
            />
            <Button onClick={this.props.changeQuantity(this.state.quantity)}>
              Update
            </Button>
          </Item.Content>
        </Item>
      )
    }
  }
)
