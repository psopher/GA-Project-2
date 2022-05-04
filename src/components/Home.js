import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="hero text-center">
      <div className="hero-container bg-light">
        <h1 className='display-3'>🦒 A Day at the Zoo 🦒</h1>
        <p className='lead'>Come see your favorite animals!</p>
        <Link to="/animals" className='btn btn-primary'>Discover animals</Link>
      </div>
    </div>
  )
}

export default Home