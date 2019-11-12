/*eslint-disable react/display-name*/
import React from 'react';
import { Item } from 'semantic-ui-react';

export default props => {
  return (
    <Item>
      <Item.Image size="small" src={props.imageURL} />
      <Item.Content verticalAlign="middle">
        <Item.Header>{props.name}</Item.Header>
        <Item.Meta>Quantity: {props.product_cart.quantity}</Item.Meta>
        <Item.Meta>Price: ${props.product_cart.priceAtPurchase}</Item.Meta>
        <Item.Meta>
          Item total: $
          {(
            props.product_cart.priceAtPurchase * props.product_cart.quantity
          ).toFixed(2)}{' '}
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};
