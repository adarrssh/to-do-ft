import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div className='container'>
      <h1>About us</h1>
      <p id='aboutus-text'>
      This is a simple note making app made with MERN stack <br />
      If you want to add a new feature to this  app <br />
       then you can make a request at the <a href="https://github.com/adarrssh/to-do-ft">Github</a>  repo of this website
      </p>
    </div>
  )
}

export default About