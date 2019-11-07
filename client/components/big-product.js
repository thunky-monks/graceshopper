/*eslint-disable react/display-name*/
import React from 'react'
import {connect} from 'react-redux'
import {getSingleProducts} from '../store/product'
import {Item, Input, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {changeQuantity} from '../store/cart'

export default connect(
  state => ({products: state.products}),
  dispatch => ({
    getSingleProducts: productId => dispatch(getSingleProducts(productId)),
    changeQuantity: (quantity, productId) => () =>
      dispatch(changeQuantity(quantity, productId))
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
      console.log(this.props)
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
                <Item.Description>
                  {this.props.products.singleProduct.description}
                </Item.Description>
                <br />

                <Item.Meta>
                  Price: ${this.props.products.singleProduct.price}
                </Item.Meta>
                <Item.Meta> </Item.Meta>
              </Item.Content>
            </Item>
          </div>
          <br />
          <Input
            label="Quantity:"
            placeholder={this.state.quantity}
            onChange={this.handleChange}
          />
          <Button
            onClick={this.props.changeQuantity(
              +this.state.quantity,
              this.props.id
            )}
          >
            Update
          </Button>
          <br />
          <br />

          <Button animated="vertical">
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
          </div>
        </div>
      )
    }
  }
)
