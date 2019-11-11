import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import OrderHistoryPanel from './order-history-panel'
import {getOrderHistory} from '../store/order-history'
import {Accordion} from 'semantic-ui-react'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {activeIndex: -1}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getOrderHistory(this.props.user.id)
  }

  handleClick(e, titleProps) {
    console.log('>>>>>CLICKED!')
    const {index} = titleProps
    console.log('>>>INDEX', index)
    const {activeIndex} = this.state
    console.log('>>>ACTIVE INDEX', activeIndex)
    const newIndex = activeIndex === index ? -1 : index
    console.log('>>>NEW INDEX', newIndex)
    this.setState({activeIndex: newIndex})
  }

  render() {
    console.log(this.props)
    const {user} = this.props
    return (
      <div className="profile">
        {/* <img src="" /> */}
        <h2>{user.firstName + ' ' + user.lastName}</h2>
        {/* <i className="circular user icon" /> */}
        <h3>{user.email}</h3>
        <h3>Order History</h3>
        <Accordion>
          {this.props.orderHistory.map((order, i) => (
            <OrderHistoryPanel
              order={order}
              activeIndex={this.state.activeIndex}
              index={i}
              key={order.id}
              handleClick={this.handleClick}
            />
          ))}
          {/* {this.props.orderHistory.length ? (
            <OrderHistoryPanel order={this.props.orderHistory[0]} />
          ) : (
            ''
          )} */}
        </Accordion>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    orderHistory: state.orderHistory
  }
}

const mapDispatch = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistory(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
