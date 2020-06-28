import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Button } from 'reactstrap'
import Logo from '../images/micasa-logo.png'

const Home = props => {
  return(
    <>
      <div className="home-jumbotron">
        <img className="home-jumbotron-logo" src={Logo} />
        <h2 className="home-jumbotron-subtitle">Find the apartment to call home.</h2>
        <a href="/listings"><Button style={{backgroundColor:"white", color:"black",fontSize:"20px",marginTop:"30px",border:"0px",fontWeight:"bold"}}>See Apartment Listings</Button></a>
      </div>
    </>
  )
}

export default Home
