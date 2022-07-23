import React from 'react'
import {NavLink} from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Pi dogs</h1>
      <button>
        <NavLink to="/home">Home</NavLink>
      </button> 
    </div>
  )
}

export default LandingPage