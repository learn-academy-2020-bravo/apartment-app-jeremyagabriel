import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Redirect, NavLink } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const ApartmentProfile = props => {
  // Success is true when delete is successful
  const [success, setSuccess] = useState(false)
  // Error is true when delete is unsuccessful
  const [error, setError] = useState(false)
  // Editable is true when current user owns current apt
  const [editable, setEditable] = useState(false)
  // Empty obj is filled upon the show fetch of current apt
  const [currentApt, setCurrentApt] = useState({})
  // Modal is true when first delete button is clicked
  const [modal, setModal] = useState(false)
  // Favorited is toggled true/false upon the post or delete fetch to Favorite model
  const [favorited, setFavorited] = useState(false)
  // Array of just apt Ids favorited by the current user
  const [favAptIds, setFavAptIds] = useState([])
  // Favorite model id of the current apt showing
  const [favId, setFavId] = useState()
  // Apt id of the current apt showing
  const [aptId, setAptId] = useState()
  // Function to toggle delete modal
  const toggle = () => setModal(!modal)

  // Trigger 'get' for favorites and apartments upon mount
  useEffect(() =>{
    getApartment()
  },[])

  async function getApartment () {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch("/favorites")
      let favData = await favResponse.json()
      // Declare array to hold only favorited apt ids to be used in both if-statements below
      let favAptIdsArray
      if(favResponse.ok) {
        console.log("favData:", favData)
        favData.map(value=> {
          // Determine the favorite id (for use in favorite delete call) if current apt is currently favorited
          if (value.listing == props.match.params.id) setFavId(value.id)
        })
        // Create array of just the ids of the apts favorited by current user
        favAptIdsArray = favData.map(value=>value.listing)
        console.log("favAptIdsArray:",favAptIdsArray)
        setFavAptIds(favAptIdsArray)
      }

      // Fetch the apartment JSON specific to apt id
      let aptResponse = await fetch(`/apartments/${props.match.params.id}`)
      let aptData = await aptResponse.json()
      if(aptResponse.ok) {
        console.log("aptData",aptData)
        // Set editable to true if the apt belows to the current user
        if (props.currentUserId === aptData.user_id) setEditable(true)
        // Set state of the current apt to access data later
        setCurrentApt(aptData)
        setAptId(aptData.id)
        // Set favorited to true if the current user's array of favorited apt id's includes the apt displayed
        if (favAptIdsArray.includes(aptData.id)) setFavorited(true)
      }
    } catch (err) {
        console.log(err)
    }
  }

  // Post apt id of favorited to Favorite model
  const addToFavorites = () => {
    fetch("http://localhost:3000/favorites", {
      body: JSON.stringify({listing: aptId}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) {
        // If favorite post request is successful, set favorited to true
        setFavorited(true)
      }
    })
    .then(() => {
      // Call the apartment API call again to update frontend data
      getApartment()
    })
  }

  // Delete apt id from favorited from Favorite model
  const removeFromFavorites = () => {
    fetch(`/favorites/${favId}`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        // If favorite delete request is successful, set favorited to false
        setFavorited(false)
      }
    })
    .then(() => {
      // Call the apartment API call again to update frontend data
      getApartment()
    })
  }

  // On click for the follow/following button
  const handleFavorite = e => {
    e.preventDefault()
    if (!favAptIds.includes(currentApt.id)) addToFavorites()
    else removeFromFavorites()
  }

  // On click for the delete button within the modal
  const handleDelete = e => {
    e.preventDefault()
    deleteApt()
  }

  // Delete JSON of current apt from database
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
        <h3 className="apt-profile-title" style={{textAlign:"center", margin:"80px 0 10px 0"}}>Apartment Profile</h3>

        {/*Image carousel from React package install*/}
        <Carousel>
          <div>
              <img src={currentApt.image_url}/>
          </div>
        </Carousel>
        <ListGroup style={{marginBottom:"50px"}}>
          <ListGroupItem>
            {/*Conditional render for how follow button looks between toggles*/}
            <Button color={favorited ? "success" : "secondary"} onClick={handleFavorite}>
              {favorited && "Following"}
              {!favorited && "Follow"}
            </Button>
            {/*Conditional render when listing belongs to current user*/}
            {editable && <p className="profile-owner-message">This is your listing</p>}
            {/*Apt details below*/}
            <ListGroupItemHeading style={{fontWeight:"bold",fontSize:"30px"}}>{ currentApt.subject }</ListGroupItemHeading>
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

          {/*Only show edit or delete buttons if listing belongs to current user*/}
          {editable &&
            <div className="edit-buttons-wrapper">
              <NavLink to={`/listings/${currentApt.id}/edit`}> <Button style={{marginRight:"10px",border:"0px"}}>Edit Listing</Button></NavLink>

              <Button style={{backgroundColor:"#ff726f",border:"0px"}} type="submit" onClick={ toggle }>Delete Listing</Button>
            </div>
          }
        </ListGroup>
      </Container>

      {/*Modal window upon clicking the first delete button*/}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Are you sure you want to delete your listing?
        </ModalBody>
        <ModalFooter>
          {/*Redirect back to listings page if delete is successful*/}
          <NavLink to="/listings">
            <Button color="danger" onClick={handleDelete}>Delete Listing</Button>{' '}
            {success && <Redirect to="/listings" />}
          </NavLink>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ApartmentProfile
