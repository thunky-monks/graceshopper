/*eslint-disable react/display-name*/
import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default class GuestSmallProduct extends React.Component {
  constructor(props) {
    super(props);
    this.addItemStorage = this.addItemStorage.bind(this);
  }

  addItemStorage(productId) {
    if (!localStorage.cart) {
      let prodQuantObj = {};
      prodQuantObj[productId] = 1;
      localStorage.setItem('cart', JSON.stringify(prodQuantObj));
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart'));
      if (localCart[productId]) {
        localCart[productId]++;
      } else {
        localCart[productId] = 1;
      }
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
  }

  render() {
    return (
      <Card>
        <Link to={`/products/${this.props.id}`}>
          <Image className="small-card-image" src={this.props.imageURL} />
        </Link>
        <Card.Content>
          <Link to={`/products/${this.props.id}`}>
            <Card.Header id="small-card-header">{this.props.name}</Card.Header>
          </Link>
          {/* <Card.Meta>MANUFACTURER GOES HERE</Card.Meta> */}
          <Card.Description id="small-card-description">
            {this.props.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span id="price">
            <Icon name="dollar sign" />
            {this.props.price}
          </span>
          <span className="right floated">
            <Button
              animated="vertical"
              onClick={() => this.addItemStorage(this.props.id)}
            >
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
          </span>
        </Card.Content>
      </Card>
    );
  }
}
