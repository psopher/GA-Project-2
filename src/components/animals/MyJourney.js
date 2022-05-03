// This components is going to display all animals in a list
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

// Import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// Import spinner
import Spinner from '../utilities/Spinner'

const MyJourney = ({ setCurrentAnimal, currentAnimal, setMyJourney, myJourney }) => {

  // Navigate
  const navigate = useNavigate()


  const handleClick = (event) => {
    
    const { id, name, type, image, latinName, habitat, diet, geoRange } = event
    const newAnimal = {
      id: id,
      name: name,
      type: type,
      image: image,
      latinName: latinName,
      habitat: habitat,
      diet: diet,
      geoRange: geoRange,
    }
    setCurrentAnimal(newAnimal)

    // console.log('current animal ->', currentAnimal)

  }


  const removeFromJourney = () => {
    console.log('remove from journey fires')
    
    const filteredJourney = myJourney.filter((animal) => animal.id !== currentAnimal.id)
      
    setMyJourney(filteredJourney)

    if (filteredJourney.length > 0) {
      console.log('filtered journey is greater than zero')

      setCurrentAnimal(null)
    } else {
      console.log('filtered journey is less than zero')
      navigate('../animals')
      setCurrentAnimal(null)
    }

  }

  const backToJourneyList = () => {
    console.log('back to journey list fires')

    setCurrentAnimal(null)
  }

  const resetJourney = () => {
    console.log('back to journey list fires')

    setMyJourney([])
    navigate('../animals')

  }

  return (
    <Container className='animal-list'>
      <Row>
        { myJourney.length > 0 ?
          currentAnimal ? 
            <>
              <Col xs="12">
                <h1>{currentAnimal.name}</h1>
                <hr />
              </Col>
              <Col md="6">
                <img src={currentAnimal.image} alt={currentAnimal.name} />
              </Col>
              <Col md="6">
                <h4><span>🏛</span> Latin Name</h4>
                <p>{currentAnimal.latinName}</p>
                <hr />
                <h4><span>🏞</span> Habitat</h4>
                <p>{currentAnimal.habitat}</p>
                <hr />
                <h4><span>🧬</span> Animal Type</h4>
                <p>{currentAnimal.type}</p>
                <hr />
                <h4><span>🌎</span> Geographic Range</h4>
                <p>{currentAnimal.geoRange}</p>
                <hr />
                <h4><span>🥦</span> Diet</h4>
                <p>{currentAnimal.diet}</p>
                <hr />
                <div className="buttons-wrapper mb-4">
                  <Button variant="primary" onClick={backToJourneyList}>Back to Journey</Button>
                  <Button variant="danger" onClick={removeFromJourney}>Remove from Journey</Button>
                </div>
              </Col>
            </>
            :
            <>
              {myJourney.map((animal, index) => {
                console.log('animal ->', animal)
                const { id, name, type, image } = animal
                
                return (
                  <Col key={index} md="6" lg="6" className='animal mb-6'>
                    <Link to={'#'} >
                      <Card onClick={() => handleClick(animal)}>

                        <Card.Img variant="top" src={image}  />
                        <Card.Body className='bg-light'>
                          <Card.Title className='text-center mb-0'>{name} - {type}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
              <div className="buttons-wrapper mb-4 reset">
                <Button variant="danger" onClick={resetJourney}>Reset Journey</Button>
              </div>
            </>
          :
          <>
            <h3>Start looking through animals, and your journey will be chronicled here</h3>
          </>
        }
      </Row>
    </Container>
  )
}

export default MyJourney