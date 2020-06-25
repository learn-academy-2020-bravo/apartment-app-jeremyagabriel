import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const ApartmentProfile = props => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [editable, setEditable] = useState(false)
  const [currentApt, setCurrentApt] = useState({})

  useEffect(() =>{
    getApartment()},[])

  const getApartment = () => {
    fetch(`/apartments/${props.match.params.id}`)
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(apt => {
      setCurrentApt(apt)
    })
    .then(() => {
      // if (props.match.params.id === currentApt.id) setEditable(true)
      // console.log("editable:",editable)
    })
  }

  const handleDelete = e => {
    e.preventDefault()
    deleteApt()
  }

  const deleteApt = () => {
    fetch(`http://localhost:3000/apartments/${currentApt.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(response => {
        if (response.ok) setSuccess(true)
        else setError(true)
    })
  }

  return(
    <>
      <Container>
        <h3 style={{textAlign:"center"}}>Apartment Profile</h3>
        <ListGroup>
          <ListGroupItem>
            {/*<img src={ currentApt.image_url } style={{height:"200px", width:"200px",objectFit:"cover"}} /> <br/><br/>*/}
            <ListGroupItemHeading>{ currentApt.subject }</ListGroupItemHeading>
            <ListGroupItemText>
              { currentApt.bedroom_count } Bedroom, { currentApt.bathroom_count } Bath <br/><br/>
              { currentApt.street_number } <br/>
              { currentApt.city}, { currentApt.state } <br/><br/>
              <strong>{ currentApt.rent }</strong> <br/><br/>
              { currentApt.description } <br/><br/>
              <strong>Building Manager:</strong> { currentApt.building_manager} <br/>
              <strong>Phone:</strong> { currentApt.phone } <br/>
              <strong>Contact Hours:</strong> { currentApt.hours }
            </ListGroupItemText>
          </ListGroupItem>

            <div>
              <a href={`/listings/${currentApt.id}/edit`}> <Button style={{marginRight:"10px",border:"0px"}}>Edit Listing</Button></a>

              <a href="/listings">
                <Button style={{backgroundColor:"#ff726f",border:"0px"}} type="submit" onClick={ handleDelete }>Delete Listing</Button>
                {success && <Redirect to="/listings" />}
              </a>
            </div>

        </ListGroup>
      </Container>
    </>
  )
}

export default ApartmentProfile
