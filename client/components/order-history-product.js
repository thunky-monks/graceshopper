/*eslint-disable react/display-name*/
import React from 'react'
import {Item} from 'semantic-ui-react'

export default props => {
  return (
    <Item>
      <Item.Image size="small" src={props.imageURL} />
      <Item.Content verticalAlign="middle">
        <Item.Header>{props.name}</Item.Header>
        <Item.Meta>Quantity: {props.quantity}</Item.Meta>
        <Item.Meta>Price: ${props.price}</Item.Meta>
        <Item.Meta>
          Item total: ${(props.price * props.quantity).toFixed(2)}{' '}
        </Item.Meta>
      </Item.Content>
    </Item>
  )
}
