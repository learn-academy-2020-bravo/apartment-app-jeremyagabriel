import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const Favorites = props => {
  const [favorites, setFavorites] = useState([])
  const [apts, setApts] = useState([])

  useEffect(() =>{
    getFavorites()},[])

  const getFavorites = () => {
    fetch("/favorites")
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(favs => {
      let favIds = favs.map(value=>value.listing)
      console.log(favIds)
      setFavorites(favIds)
    })
    .then(() => {
      return fetch("http://localhost:3000/apartments")
    })
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(apts => {
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
          if (favorites.includes(apt.id)) {
            let owner = false
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
