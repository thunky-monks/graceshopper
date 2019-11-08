import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {WEBSITE_HEADER} from '../strings'
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div id="Navbar">
    <nav>
      <div>
        <h1 id="SITE-HEADER">{WEBSITE_HEADER}</h1>
      </div>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Profile</Link>
          <Link to="/products">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to={`/users/${userId}/cart/`}>
            <ShoppingCartTwoToneIcon />
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Home</Link>
          <Link to="/cart">
            <ShoppingCartTwoToneIcon />{' '}
          </Link>
        </div>
      )}
    </nav>
    <hr color="black" />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
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
