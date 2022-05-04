import React, { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Components
import Home from './components/Home'
import PageNavBar from './components/common/PageNavBar'
import NotFound from './components/common/NotFound'

import AnimalsIndex from './components/animals/AnimalsIndex'
import MyJourney from './components/animals/MyJourney'



const App = () => {

  const [ myJourney, setMyJourney ] = useState([])
  // const [ myJourneyIDs, setMyJourneyIDs ] = useState([])
  const [ currentAnimal, setCurrentAnimal ] = useState(null)
  const [ filters, setFilters ] = useState({
    type: 'All',
    searchTerm: '',
  })
  const [ filteredJourney, setFilteredJourney ] = useState([])
  const [ types, setTypes ] = useState([])


  // ? handleChange updates filter state
  const handleChange = (e) => {
    // console.log('handle change event target value ->', e.target.value)
    const newObj = {
      ...filters,
      [e.target.name]: e.target.value,
    }
    console.log('newObj ->', newObj)
    setFilters(newObj)
  }

  // ? useEffect that creates our types dropdown options
  useEffect(() => {
    // Checking there are types to loop through in the first place
    // On initial page load, types will be empty, so we don't need to create a list
    if (myJourney.length){
      const typeList = []
      myJourney.forEach(animal => typeList.includes(animal.type) ? '' : typeList.push(animal.type))
      setTypes(typeList)
    }
  }, [myJourney])

  // ? useEffect that filters the animals and adds them as a filteredTypes state
  useEffect(() => {
    // Only filter myJourney if there are animals to filter
    if (myJourney.length){
      // Generate search term
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      // Filter through animals and add matching types to filteredTypes state
      const filtered = myJourney.filter(animal => {
        return regexSearch.test(animal.name) && (animal.type === filters.type || filters.type === 'All')
      })
      setFilteredJourney(filtered)
    }
  }, [filters, myJourney])

  return (
    <main className="site-wrapper">
      <BrowserRouter>
        {/* Navbar appears on every page */}
        <PageNavBar setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setFilters={setFilters} />

        {/* Everything inside routes are separate pages */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Animal Routes */}
          <Route path="/animals" element={<AnimalsIndex setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setMyJourney={setMyJourney} myJourney={myJourney} />} />
          <Route path="/myjourney" element={<MyJourney setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setMyJourney={setMyJourney} myJourney={myJourney}  filters={filters} types={types} handleChange={handleChange} filteredJourney={filteredJourney} />}/>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App