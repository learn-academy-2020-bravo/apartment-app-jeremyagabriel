import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Button } from 'reactstrap'

const Home = props => {
  return(
    <>
      <div
        className="home-jumbotron"
        style={{
          backgroundColor: "#00cf88",
          color: "white",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2>Find the apartment to call home.</h2>
        <a href="/listings"><Button style={{backgroundColor:"white", color:"black",fontSize:"20px",marginTop:"30px",border:"0px"}}>See Apartment Listings</Button></a>
      </div>
    </>
  )
}

export default Home
