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

  return (
    <main className="site-wrapper">
      <BrowserRouter>
        {/* Navbar appears on every page */}
        <PageNavBar setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setMyJourney={setMyJourney} myJourney={myJourney} />

        {/* Everything inside routes are separate pages */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Animal Routes */}
          <Route path="/animals" element={<AnimalsIndex setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setMyJourney={setMyJourney} myJourney={myJourney} />} />
          <Route path="/myjourney" element={<MyJourney setCurrentAnimal={setCurrentAnimal} currentAnimal={currentAnimal} setMyJourney={setMyJourney} myJourney={myJourney} />}/>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App