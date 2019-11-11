/*eslint-disable react/display-name*/

import React from 'react'
import {Accordion, Icon} from 'semantic-ui-react'
import {ORDER_HISTORY_PANEL_LABEL} from '../strings'

export default props => {
  // const activeIndex = props.activeIndex
  return (
    <div>
      <Accordion.Title
        active={props.activeIndex === 0}
        index={0}
        onClick={props.handleClick}
      >
        <Icon name="dropdown" />
        {ORDER_HISTORY_PANEL_LABEL(props.order)}
      </Accordion.Title>
      <Accordion.Content active={props.activeIndex === 0}>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </p>
      </Accordion.Content>
    </div>
  )
}
