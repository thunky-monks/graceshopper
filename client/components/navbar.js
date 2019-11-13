import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { WEBSITE_HEADER } from '../strings';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

const StyledBadge1 = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge);

function calcCartTotal(cart) {
  let total = 0;
  for (let i in cart) {
    if (i > 0) {
      total += cart[i];
    }
  }
  return total;
}

const Navbar = ({ handleClick, isLoggedIn, userId, cart }) => (
  <div>
    {isLoggedIn ? (
      <div className="nav">
        <h2 id="SITE-HEADER">{WEBSITE_HEADER}</h2>
        <div className="ui secondary menu">
          {/* The navbar will show these links after you log in */}
          <Link to="/home" class="item">
            <AccountCircleIcon />
          </Link>
          <Link class="item" to="/products">
            Home
          </Link>
          <div className="right menu">
            <a className="item" href="#" onClick={handleClick}>
              Logout
            </a>
            <Link className="item" to={`/users/${userId}/cart/`}>
              <IconButton aria-label="cart">
                <StyledBadge1
                  badgeContent={calcCartTotal(cart)}
                  color="primary"
                >
                  <ShoppingCartIcon />
                </StyledBadge1>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 id="SITE-HEADER">{WEBSITE_HEADER}</h2>
        <div className="ui secondary menu">
          <Link class="item" to="/products">
            Home
          </Link>
          <div className="right menu">
            <Link class="item" to="/login">
              Login
            </Link>
            <Link class="item" to="/signup">
              Sign Up
            </Link>
            <Link className="item" to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge1 badgeContent={4} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge1>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
