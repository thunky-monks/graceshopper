/*eslint-disable react/display-name*/
import React from 'react';
import { connect } from 'react-redux';
import { getSingleProducts } from '../store/product';
import { Item, Input, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    getSingleProducts: productId => dispatch(getSingleProducts(productId))
  })
)(
  class GuestBigProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quantity: 1
      };
      this.handleChange = this.handleChange.bind(this);
      this.addItemStorage = this.addItemStorage.bind(this);
    }

    handleChange(event) {
      this.setState({ quantity: event.target.value });
    }

    componentDidMount() {
      this.props.getSingleProducts(this.props.match.params.id);
    }

    addItemStorage(productId, quantity) {
      if (!localStorage.cart) {
        let prodQuantObj = {};

        prodQuantObj[productId] = +quantity;
        localStorage.setItem('cart', JSON.stringify(prodQuantObj));
      } else {
        let localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart[productId]) {
          localCart[productId] += +quantity;
        } else {
          localCart[productId] = +quantity;
        }
        localStorage.setItem('cart', JSON.stringify(localCart));
      }
    }

    render() {
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
            label="quantity:"
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
          <Button
            animated="vertical"
            onClick={() =>
              this.addItemStorage(
                this.props.products.singleProduct.id,
                this.state.quantity
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
          </div>
        </div>
      );
    }
  }
);
