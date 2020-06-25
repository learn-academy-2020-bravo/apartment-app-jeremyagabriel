import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Nav, NavItem, NavLink } from 'reactstrap'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import NewApartment from './pages/NewApartment'
import ApartmentIndex from './pages/ApartmentIndex'
import ApartmentProfile from './pages/ApartmentProfile'
import EditApartment from './pages/EditApartment'
import Home from './pages/Home'
import Header from './components/Header'

const App = props => {

  return (
    <Router>
      <Header
        logged_in={props.logged_in}
        sign_in_route={props.sign_in_route}
        sign_out_route={props.sign_out_route}
      />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/listings" render={() => <ApartmentIndex />} />
        <Route exact path="/listings/new" render={() => <NewApartment />} />

        <Route exact path="/listings/:id" render={(props) => <ApartmentProfile {...props} />} />

        <Route exact path="/listings/:id/edit" render={(props) => <EditApartment {...props} /> } />
        }
      </Switch>
    </Router>
  )
}

export default App
