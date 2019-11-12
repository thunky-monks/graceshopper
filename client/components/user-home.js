import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderHistoryPanel from './order-history-panel';
import { editUser } from '../store/user';
import { getOrderHistory } from '../store/order-history';
import { Accordion, Icon } from 'semantic-ui-react';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory(this.props.user.id);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div className="profile">
        <span className="right floated">
          <Link to={`/users/${user.id}/edit`}>
            <Icon id="edit-icon" name="edit outline" />
          </Link>
        </span>
        <h2>{user.firstName + ' ' + user.lastName}</h2>
        <h2>{user.email}</h2>
        <h3>Order History</h3>
        <Accordion>
          {this.props.orderHistory
            .filter(order => order.datePurchased)
            .map((order, i) => (
              <OrderHistoryPanel
                order={order}
                activeIndex={this.state.activeIndex}
                index={i}
                key={order.id}
                handleClick={this.handleClick}
              />
            ))}
        </Accordion>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    orderHistory: state.orderHistory
  };
};

const mapDispatch = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderHistory(userId)),
    editUser: user => () => dispatch(editUser(user))
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
