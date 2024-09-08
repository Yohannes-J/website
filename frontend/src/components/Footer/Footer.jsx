import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='tomatologofooter' src={assets.logo} alt="" />
            <p>Real Website.</p>
            <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <h2>Account number 1000565188244</h2>
            <ul>
              <li>+251-943-82-56-49</li>
              <li>mebra5649@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 © yohannesjohn126@gmail.com - All rights reserved.</p>
    </div>
  )
}

export default Footer