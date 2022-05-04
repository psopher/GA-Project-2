// This components is going to display all animals in a list
import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

// Import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const MyJourney = ({ setCurrentAnimal, currentAnimal, setMyJourney, myJourney, filters, types, handleChange, filteredJourney }) => {

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
  }


  const removeFromJourney = () => {
    
    const filteredJourney = myJourney.filter((animal) => animal.id !== currentAnimal.id)
      
    setMyJourney(filteredJourney)

    if (filteredJourney.length > 0) {
      setCurrentAnimal(null)
    } else {
      navigate('../animals')
      setCurrentAnimal(null)
    }

  }

  const backToJourneyList = () => {
    setCurrentAnimal(null)
  }

  const resetJourney = () => {
    setMyJourney([])
    navigate('../animals')
  }

  return (
    <Container className='animal-list'>
      { myJourney.length > 0 ?
        currentAnimal ? 
          <>
            <Row className="show-container">
              <Col xs="12">
                <h1 className="show-title">{currentAnimal.name}</h1>
                <p className="latin-name">{currentAnimal.latinName}</p>
                <hr />
              </Col>
              <Col md="6">
                <img src={currentAnimal.image} alt={currentAnimal.name} />
              </Col>
              <Col md="6">
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
            </Row>
          </>
          :
          <>
            <Row>
              <div className="filter-container">
                {/* Types dropdown */}
                <select name="type" value={filters.type} onChange={handleChange}>
                  <option value="All">All</option>
                  {/* Loop through animalTypes */}
                  {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {/* Search field */}
                <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
              </div>
              {filteredJourney.map((animal, index) => {
                // console.log('animal ->', animal)
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
            </Row>
          </>
        :
        <>
          <h3>Start looking through animals, and your journey will be chronicled here</h3>
        </>
      }
    </Container>
  )
}

export default MyJourney