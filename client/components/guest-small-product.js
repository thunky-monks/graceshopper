/*eslint-disable react/display-name*/
import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeQuantity, addItem} from '../store/cart'

export default class GuestSmallProduct extends Component {
  constructor(props) {
    super(props)
    this.addItemStorage = this.addItemStorage.bind(this)
  }

  addItemStorage(productId) {
    if (!localStorage.cart) {
      let prodQuantObj = {productId: 1}
      localStorage.setItem('cart', JSON.stringify(prodQuantObj))
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      if (localCart[productId]) {
        localCart[productId]++
      } else {
        localCart[productId] = 1
      }
      localStorage.setItem('cart', JSON.stringify(localCart))
    }
  }

  render() {
    return (
      <Card>
        <Link to={`/products/${this.props.id}`}>
          <Image src={this.props.imageURL} />
        </Link>
        <Card.Content>
          <Link to={`/products/${this.props.id}`}>
            <Card.Header>{this.props.name}</Card.Header>
          </Link>
          {/* <Card.Meta>MANUFACTURER GOES HERE</Card.Meta> */}
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="dollar sign" />
          {this.props.price}
          <br />
          <Button
            animated="vertical"
            onClick={this.addItemStorage(this.props.id)}
          >
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name="shop" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    )
  }
}
