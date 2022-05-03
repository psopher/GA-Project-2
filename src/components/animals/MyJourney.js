// This components is going to display all cheeses in a list
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

// Import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// Import spinner
import Spinner from '../utilities/Spinner'

const MyJourney = (setCurrentAnimal, currentAnimal, setMyJourney, myJourney) => {
  return (
    <>
      <h1>My Journey!</h1>
      <Link to ="/">Back to Home</Link>
    </>
  )
}

export default MyJourney