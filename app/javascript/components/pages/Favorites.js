import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const Favorites = props => {
  // Array of apartment objects favorited by current user
  const [favApts, setFavApts] = useState([])

  useEffect(() =>{
    getFavApartments()},[])

  async function getFavApartments () {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch("/favorites")
      let favData = await favResponse.json()
      // Declare array to hold only favorited apt ids to be used in both if-statements below
      let favAptIdsArray
      if(favResponse.ok) {
        console.log("favData:", favData)
        // Create array of just the ids of the apts favorited by current user
        favAptIdsArray = favData.map(value=>value.listing)
        console.log("favAptIdsArray:",favAptIdsArray)
      }

      // Fetch the apartment JSON specific to apt id
      let aptResponse = await fetch(`/apartments`)
      let aptData = await aptResponse.json()
      if(aptResponse.ok) {
        console.log("aptData",aptData)
        let sortedAptData = aptData.filter((apt,index) => {
          return favAptIdsArray.includes(apt.id)
        })
        .sort((a,b) => {
          if (a.id === b.id) return 0
          else if (a.id > b.id) return 1
          else return -1
        })
        // Set state of the current apt to access data later
        setFavApts(sortedAptData)
      }
    } catch (err) {
        console.log(err)
    }
  }

  return(
    <>
      <Container style={{marginBottom:"50px"}}>
      <h3 style={{textAlign:"center",margin:"80px 0 10px 0"}}>Listings You're Following</h3>
        {favApts.map((apt,index) => {
          {/* Map thru the apt objects and only return those where favorite user_id is the same as current user's id */}
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
        })}
      </Container>
    </>
  )
}

export default Favorites
