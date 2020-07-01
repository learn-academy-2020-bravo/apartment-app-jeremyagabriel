import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const Favorites = props => {
  // Array of apt Ids that were favorited by the current user
  const [favAptIds, setFavAptIds] = useState([])
  // Array of apartment objects fetched from API
  const [apts, setApts] = useState([])

  useEffect(() =>{
    getFavorites()},[])

  const getFavorites = () => {
    // Get JSON from the Favorite instances with user_id of current user
    fetch("/favorites")
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(favs => {
      // Pull only the apt id (i.e. listing) from each favorite object
      let favIds = favs.map(value=>value.listing)
      console.log(favIds)
      setFavAptIds(favIds)
    })
    .then(() => {
      return fetch("http://localhost:3000/apartments")
    })
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
      console.log(sortedApts)
      setApts(sortedApts)
    })
  }

  return(
    <>
      <Container style={{marginBottom:"50px"}}>
      <h3 style={{textAlign:"center",margin:"80px 0 10px 0"}}>Listings You're Following</h3>
        {apts.map((apt,index) => {
          {/* Map thru the apt objects and only return those where favorite user_id is the same as current user's id */}
          if (favAptIds.includes(apt.id)) {
            let owner = false
            {/*Set local variable to true if the apt's user_id is the same as the current user's id*/}
            if (apt.user_id === props.currentUserId) owner = true
            return(
              <div className="index-listing-container" key={index}>
                <NavLink className="index-listing-image-wrapper" to={`/listings/${apt.id}`}><img className="index-listing-image" src={apt.image_url} /></NavLink>
                <div className="index-listing-right">
                  {owner && <p className="owner-message">This is your listing</p>}
                  <NavLink className="index-listing-title" to={`/listings/${apt.id}`}>{ apt.subject }</NavLink>
                  <p className="index-listing-copy">
                  <strong>{apt.bedroom_count} Bedroom, {apt.bathroom_count} Bath</strong> <br/>
                  { apt.city}, { apt.state } <br/>
                  { apt.rent }
                  </p>
                </div>
              </div>
            )
          }
        })}
      </Container>
    </>
  )
}

export default Favorites
