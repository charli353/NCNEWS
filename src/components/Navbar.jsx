import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav id='nav'>
      <section id='navtitle'>
      <Link to="/">
      <h1 id='anchorhome'>NC News</h1>
      </Link>
      </section>
      <Link to='/login/users/:username' id='login'>
        <h3>{localStorage.loggedin}</h3>
      </Link>
    </nav>
  )
}
