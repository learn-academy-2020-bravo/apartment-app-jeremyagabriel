import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

const Header = props => {
  return(
    <>
      <h1 style={{textAlign:"center"}}>Apartment Finder</h1>
      <Nav style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/listings">See All Listings</NavLink>
        </NavItem>
        {props.logged_in &&
            <NavItem>
              <NavLink href="/listings/new">Create Listing</NavLink>
            </NavItem>
        }
        {props.logged_in &&
          <NavItem>
            <NavLink href={props.sign_out_route}>Sign Out</NavLink>
          </NavItem>
        }
        {!props.logged_in &&
          <NavItem>
          <NavLink href={props.sign_in_route}>Sign In</NavLink>
          </NavItem>
        }
      </Nav>
    </>
  )
}

export default Header
