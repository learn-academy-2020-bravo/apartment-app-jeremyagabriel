import React from 'react'
import { Button } from 'reactstrap'

const SignInModal = props => {
  return
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
        <h2>Sign up to see apartment details!</h2>
        <a href="/listings"><Button style={{backgroundColor:"white", color:"black",fontSize:"20px",marginTop:"30px",border:"0px"}}>Sign Up</Button></a>
      </div>
    </>
  )
}

export default SignInModal
