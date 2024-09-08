import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order luxry materials here</h2>
            <p>Choose the materials for your home</p>
            <a href="#explore-menu"><button className='buttonwl'>View Products</button></a>
        </div>
    </div>
  )
}

export default Header