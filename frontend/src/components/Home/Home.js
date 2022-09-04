import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router'

const Home = () => {
  const Navigate = useNavigate();
  return (
    
      
      <div className="home-main">
        <div className="home-text text-anim">
          <p className='animation-text'> <span className='red'>Create.</span> <span className='white'>Organize.</span> <br />
          <span className='white'>Share.</span></p>
          <p className='animation-text desc'>A simple, lightweight and portable note App.</p>
        </div>
        <div className="button-div button-anim">
          <button className='login-btn' onClick={()=>{Navigate('/login')}}>My Account</button>
          <button className='notes-btn' onClick={()=>{Navigate('/notes')}}>Go to Notes</button>
        </div>
        <div className="note-image img-anim">
          <img src={require('./typing.webp')} alt="" />
        </div>
      </div>
    
  )
}

export default Home