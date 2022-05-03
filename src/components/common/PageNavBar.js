import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

// Import React Components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

// Import helpers
import { userIsAuthenticated } from '../../helpers/auth'

const PageNavBar = ({ setCurrentAnimal, currentAnimal, setMyJourney, myJourney }) => {

  // Navigate
  const navigate = useNavigate()

  useEffect(() => {

    console.log('current animal ->', currentAnimal)

  }, [currentAnimal])

  const resetCurrentAnimal = () => {
    console.log('reset current animal fires')

    setCurrentAnimal(null)
  }

  return (
    <Navbar bg="dark" expand="sm">
      <Container>
        {/* Icon image in upper left */}
        <Navbar.Brand as={Link} to="/">🦒</Navbar.Brand>
        {/* Handling the toggle between mobile and desktop */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar collapses in mobile formats */}
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to="/animals" onClick={resetCurrentAnimal}>Animals</Nav.Link>
          {/* TO DO: My journey will only appear if there are animals you have seen*/}
          <Nav.Link as={Link} to="/myjourney" onClick={resetCurrentAnimal}>My Journey</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default PageNavBar