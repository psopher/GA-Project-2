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

const AnimalsIndex = (setCurrentAnimal, currentAnimal, setMyJourney, myJourney) => {

  // Navigate
  const navigate = useNavigate()

  const [ animals, setAnimals ] = useState([])
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {

    const getAnimals = async () => {
      try {
        const { data } = await axios.get('https://zoo-animal-api.herokuapp.com/animals/rand/10')
        // console.log(data)
        setAnimals(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAnimals()

  }, [navigate])



  return (
    <Container className='animal-list'>
      <Row>
        {animals.map(animal => {
          const { id, name, animal_type: type, image_link: image } = animal
          return (
            <>
              <Col key={id} md="6" lg="6" className='animal mb-6'>
                <Link to={`/animals/${id}`}>
                  <Card>
                    <Card.Img variant="top" src={image} />
                    <Card.Body className='bg-light'>
                      <Card.Title className='text-center mb-0'>{name} - {type}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </>
          )
        })}
      </Row>
    </Container>
  )
}

export default AnimalsIndex