import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Nav, NavItem, NavLink } from 'reactstrap'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import NewApartment from './pages/NewApartment'
import ApartmentIndex from './pages/ApartmentIndex'
import ApartmentProfile from './pages/ApartmentProfile'
import EditApartment from './pages/EditApartment'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Header from './components/Header'

const App = props => {
  // Set state of of current user id pulled from Rails
  const [currentUserName, setCurrentUserName] = useState(props.user.user_name)
  const [currentUserId, setCurrentUserId] = useState(props.user.id)

  return (
    <Router>
      <Header
        logged_in={props.logged_in}
        sign_in_route={props.sign_in_route}
        sign_out_route={props.sign_out_route}
      />
      <Switch>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/listings" render={() => <ApartmentIndex logged_in={props.logged_in} currentUserId={currentUserId}/>} />

        {!props.logged_in &&
          <Switch>
            <Route exact path="/listings/*" render={() => <Redirect to="/listings" />} />

            <Route path="/user/*" render={() => <Redirect to="/" /> } />
          </Switch>
        }

        {props.logged_in &&
          <Switch>
            <Route exact path="/listings/new" render={() => <NewApartment />} />

            <Route exact path="/listings/:id" render={(props) => <ApartmentProfile {...props} currentUserId={currentUserId}/>} />

            <Route exact path="/listings/:id/edit" render={(props) => <EditApartment {...props} currentUserId={currentUserId} /> } />

            <Route exact path="/user/favorites" render={(props) => <Favorites {...props} currentUserId={currentUserId} /> } />
          </Switch>
        }

      </Switch>
    </Router>
  )
}

export default App
