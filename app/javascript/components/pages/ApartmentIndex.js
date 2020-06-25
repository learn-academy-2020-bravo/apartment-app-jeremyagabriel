import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Container } from 'reactstrap'

const ApartmentIndex = props => {
  const [apts, setApts] = useState([])

  useEffect(() =>{
    getApartments()},[])

  const getApartments = () => {
    fetch("/apartments")
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(apts => {
      let sortedApts = apts.sort((a,b) => {
        if (a.id === b.id) return 0
        else if (a.id > b.id) return 1
        else return -1
      })
      setApts(sortedApts)
    })
  }
  return(
    <>
      <Container>
      <h3 style={{textAlign:"center",margin:"10px"}}>Apartment Listings</h3>
      <ListGroup>
        {apts.map((apt,index) => {
          return(
            <ListGroupItem key={index}>
              <ListGroupItemHeading><a href={`/listings/${apt.id}`}>{ apt.subject }</a></ListGroupItemHeading>
              <ListGroupItemText>
              <strong>{apt.bedroom_count} Bedroom, {apt.bathroom_count} Bath</strong> <br/>
              { apt.city}, { apt.state } <br/>
              { apt.rent }
              </ListGroupItemText>
            </ListGroupItem>
          )
        })}
      </ListGroup>
      </Container>
    </>
  )
}

export default ApartmentIndex
