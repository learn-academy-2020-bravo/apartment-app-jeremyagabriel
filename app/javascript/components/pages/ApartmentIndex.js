import React, { useState, useEffect } from 'react'
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const ApartmentIndex = props => {
  // Array of apartment objects fetched from API
  const [apts, setApts] = useState([])
  // Modal is true to open the sign in modal for logged out guests
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  useEffect(() =>{
    getApartments()
  },[])

  const getApartments = () => {
    fetch("/apartments")
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(apts => {
      // Order the array of apartments by apt id
      let sortedApts = apts.sort((a,b) => {
        if (a.id === b.id) return 0
        else if (a.id > b.id) return 1
        else return -1
      })
      // Set state with the sorted data
      console.log(sortedApts)
      setApts(sortedApts)
    })
  }

  return(
    <>
      <Container style={{marginBottom:"50px"}}>
      <h3 style={{textAlign:"center",margin:"80px 0 10px 0",}}>Apartment Listings</h3>
        {apts.map((apt,index) => {
          let owner = false
          if (apt.user_id === props.currentUserId) owner = true
          return(
            <div className="index-listing-container" key={index}>
              {props.logged_in &&
                <NavLink className="index-listing-image-wrapper" to={`/listings/${apt.id}`}><img className="index-listing-image" src={apt.image_url} /></NavLink>
              }
              {!props.logged_in &&
                <img style={{cursor:"pointer"}} onClick={toggle} className="index-listing-image" src={apt.image_url} />
              }
              <div className="index-listing-right">
                {owner && <p className="owner-message">This is your listing</p>}
                {props.logged_in &&
                  <NavLink className="index-listing-title" to={`/listings/${apt.id}`}>{ apt.subject }</NavLink>
                }
                {!props.logged_in &&
                  <h4 className="index-listing-title" style={{cursor:"pointer"}} onClick={toggle}>{ apt.subject }</h4>
                }
                <p className="index-listing-copy">
                  <strong>{apt.bedroom_count} Bedroom, {apt.bathroom_count} Bath</strong> <br/>
                  { apt.city}, { apt.state } <br/>
                  { apt.rent }
                </p>
              </div>
            </div>
          )
        })}
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Apartment Profile</ModalHeader>
          <ModalBody>
            Sign in or create an account to see more apartment details!
          </ModalBody>
        <ModalFooter>
          <a href="/users/sign_in"><Button color="info">Sign In</Button></a>
          <a href="/users/sign_up"><Button color="secondary">Sign Up</Button></a>{' '}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ApartmentIndex
