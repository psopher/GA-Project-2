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

const AnimalsIndex = ({ setCurrentAnimal, currentAnimal, setMyJourney, myJourney }) => {

  // Navigate
  const navigate = useNavigate()

  const [ animals, setAnimals ] = useState([])
  const [ animalsListed, setAnimalsListed ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ selected, setSelected] = useState([])
  const [ single, setSingle ] = useState(false)


  useEffect(() => {

    const getAnimals = async () => {
      try {
        const { data } = await axios.get('https://zoo-animal-api.herokuapp.com/animals/rand/10')
        setAnimals(data)

      } catch (err) {
        console.log(err)
      }
    }
    getAnimals()

  }, [navigate, currentAnimal])

  const handleClick = (event) => {
    
    const { id, name, animal_type: type, image_link: image, latin_name: latinName, habitat, diet, geo_range: geoRange } = event
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

    const filteredJourney = myJourney.filter((animal) => animal.id !== newAnimal.id)
    setMyJourney([...filteredJourney, newAnimal])

    // console.log('current animal ->', currentAnimal)

  }

  useEffect(() => {

    // console.log('current animal ->', currentAnimal)
    // console.log('my journey ->', myJourney)

  }, [ currentAnimal, myJourney ])

  const removeFromJourney = () => {
    console.log('remove from journey fires')
    
    const filteredJourney = myJourney.filter((animal) => animal.id !== currentAnimal.id)
      
    setMyJourney(filteredJourney)
    
    setCurrentAnimal(null)

  }

  const backToAnimalsList = () => {
    console.log('back to animals list fires')

    setCurrentAnimal(null)
  }


  return (
    <Container className='animal-list'>
      <Row>
        { currentAnimal ? 
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
                <Button variant="primary" onClick={backToAnimalsList}>Back to Animals</Button>
                <Button variant="danger" onClick={removeFromJourney}>Remove from Journey</Button>
              </div>
            </Col>
          </>
          :
          <>
            {animals.map((animal, index) => {
              const { id, name, animal_type: type, image_link: image } = animal
              
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
          </>
        }
      </Row>
    </Container>
  )
}

export default AnimalsIndex