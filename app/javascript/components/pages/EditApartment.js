import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const EditApartment = props => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
      street_number: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      building_manager: "",
      phone: "",
      hours: "",
      image_url: "",
      subject: "",
      description: "",
      rent: "",
      bedroom_count: "",
      bathroom_count: ""
  })

  useEffect(() =>{
    getApartment()},[])

  const getApartment = () => {
    fetch(`/apartments/${props.match.params.id}`)
    .then(response => {
      if(response.ok) return response.json()
    })
    .then(apt => {
      setForm({
        ...form,
        street_number: apt.street_number,
        city: apt.city,
        state: apt.state,
        zip: apt.zip,
        country: apt.country,
        building_manager: apt.building_manager,
        phone: apt.phone,
        hours: apt.hours,
        image_url: apt.image_url,
        subject: apt.subject,
        description: apt.description,
        rent: apt.rent,
        bedroom_count: apt.bedroom_count,
        bathroom_count: apt.bathroom_count
      })
    })
  }

  const updateApartment = apt => {
    fetch(`http://localhost:3000/apartments/${props.match.params.id}`, {
      body: JSON.stringify(apt),
      headers:{
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => {
      if (response.ok) setSuccess(true)
      else setError(true)
    }).catch(error => {
      console.log("error:",error)
    })
  }

  const handleChange = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
    updateApartment(form)
  }

  return(
    <>
      <Container>
        <h3 style={{textAlign:"center"}}>Edit your apartment listing.</h3>
        <Form>
          <FormGroup>
            <Label htmlFor="street_number">Address</Label>
            <Input type="text" name="street_number" value={ form.street_number } onChange={ handleChange } placeholder="" />
          </FormGroup>
          <Row form>
            <Col md={7}>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input type="text" name="city"  value={ form.city } onChange={ handleChange } placeholder="" />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input type="text" name="state"  placeholder="" value={ form.state } onChange={ handleChange }/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label htmlFor="zip">Zip</Label>
                <Input type="text" name="zip" placeholder="" value={ form.zip } onChange={ handleChange }/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Input type="text" name="country"  placeholder="" value={ form.country } onChange={ handleChange }/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="building_manager">Building Manager</Label>
                <Input type="text" name="building_manager"  placeholder="" value={ form.building_manager } onChange={ handleChange } />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="text" name="phone" placeholder="" value={ form.phone } onChange={ handleChange } />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label htmlFor="hours">Contact Hours</Label>
                <Input type="text" name="hours" placeholder="" value={ form.hours } onChange={ handleChange } />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label htmlFor="rent">Rent</Label>
                <Input type="text" name="rent" placeholder="" value={ form.rent } onChange={ handleChange } />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label htmlFor="bedroom_count">Bedroom(s)</Label>
                <Input type="text" name="bedroom_count" placeholder="" value={ form.bedroom_count } onChange={ handleChange } />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label htmlFor="bathroom_count">Bathroom(s)</Label>
                <Input type="text" name="bathroom_count" placeholder="" value={ form.bathroom_count } onChange={ handleChange } />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label htmlFor="image_url">Image URL</Label>
                <Input type="text" name="image_url" placeholder="" value={ form.image_url } onChange={ handleChange } />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input type="text" name="subject" placeholder="" value={ form.subject } onChange={ handleChange } />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input type="textarea" name="description" value={ form.description } onChange={ handleChange } />
          </FormGroup>

          {error && <h6 color="red">Please enter the form correctly</h6>}

          <a href={`/listings/${props.match.params.id}`}>
            <Button name="submit" onClick = { handleSubmit }>Submit</Button>
            {success && <Redirect to={`/listings/${props.match.params.id}`} />}
          </a>
        </Form>
      </Container>
    </>
  )
}

export default EditApartment
