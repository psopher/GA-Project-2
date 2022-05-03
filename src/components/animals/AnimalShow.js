import React, { useState, useEffect } from 'react'
import axios from 'axios'
// Below we will import useParams - this is a method that returns an object of placholders as keys
import { useParams, Link, useNavigate } from 'react-router-dom'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Import spinner
import Spinner from '../utilities/Spinner'

const AnimalShow = (setCurrentAnimal, currentAnimal, setMyJourney, myJourney) => {

  // Navigate
  const navigate = useNavigate()

  const { id } = useParams()

  // ? State
  const [ animal, setAnimal ] = useState(null)
  const [ errors, setErrors ] = useState(false)



  return (
    <>
      <h1>Showing an animal</h1>
      <Link to ="/">Back to Home</Link>
    </>
  )
}

export default AnimalShow