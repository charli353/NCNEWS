import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav id='nav'>
      <Link to="/">
      <h1>NC News</h1>
      </Link>
    </nav>
  )
}
