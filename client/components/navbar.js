import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {WEBSITE_HEADER} from '../strings'
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const Navbar = ({handleClick, isLoggedIn}) => (
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
            <Link class="item" to="/cart">
              <ShoppingCartTwoToneIcon />
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 id="SITE-HEADER">{WEBSITE_HEADER}</h2>
        <div className="ui secondary menu">
          {/* The navbar will show these links before you log in */}
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
            <Link class="item" to="/cart">
              <ShoppingCartTwoToneIcon />{' '}
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
