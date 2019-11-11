/*eslint-disable react/display-name*/

import React from 'react'
import {Accordion, Icon, Item} from 'semantic-ui-react'
import {ORDER_HISTORY_PANEL_LABEL} from '../strings'
import OrderHistoryProduct from './order-history-product'

export default props => {
  // const activeIndex = props.activeIndex
  return (
    <div>
      <Accordion.Title
        active={props.activeIndex === props.index}
        index={props.index}
        onClick={props.handleClick}
      >
        <Icon name="dropdown" />
        {ORDER_HISTORY_PANEL_LABEL(props.order)}
      </Accordion.Title>
      <Accordion.Content active={props.activeIndex === props.index}>
        <Item.Group>
          {props.order.products.map(product => (
            <OrderHistoryProduct {...product} key={product.id} />
          ))}
        </Item.Group>
      </Accordion.Content>
    </div>
  )
}
