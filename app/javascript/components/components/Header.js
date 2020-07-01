import React from 'react'
import LogoBlack from '../images/micasa-logo-black.png'
import Logo from '../images/micasa-logo.png'
import { NavLink } from 'react-router-dom'

const Header = props => {
  return(
    <>
      <div id="header">
        <NavLink to="/"><img className="header-logo" src={Logo} /></NavLink>
        <div id="nav">
          {/*Only show All Listings and Sign In when guest is logged out*/}
          <NavLink className="header-link" to="/listings">All Listings</NavLink>
          {!props.logged_in &&
            <NavLink className="header-link" to={props.sign_in_route}>Sign In</NavLink>
          }
          {/*Show additional nav options when user is logged in*/}
          {props.logged_in &&
              <NavLink className="header-link" to="/listings/new">Create Listing</NavLink>
          }
          {props.logged_in &&
              <NavLink className="header-link" to="/user/favorites">Favorites</NavLink>
          }
          {props.logged_in &&
            <NavLink className="header-link" to={props.sign_out_route}>Sign Out</NavLink>
          }
        </div>
      </div>
    </>
  )
}

export default Header
