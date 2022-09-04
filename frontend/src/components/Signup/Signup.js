import React, { useState } from 'react'
import axios from "axios";
import "./Signup.css";
// import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
var validator = require("email-validator");
const Signup = (props) => {

  const [loading, setLoading] = useState(false)

  const Navigate=useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    if (loading) {
      console.log(loading);
      return (
      <div className='acc-load'>
        <h1>Loading...</h1>
      </div>
      )
    }

    


    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }


    //register function 
    const register = (e) => {
        e.preventDefault();
        const { name, email, password } = user
        if (name && email && password) {
          if(validator.validate(email)){
            setLoading(true);
            axios.post("https://to-do-bk.herokuapp.com/api/auth/register", user)
            .then(res => {
              setLoading(false)
              props.showAlert("Account created Successfully","success")
              console.log(res);
              localStorage.setItem('token', res.data.authtoken); 
              Navigate("/login")
            })
            .catch(err => {
              setLoading(false)
              props.showAlert("Some Error occured","danger")
              console.log(err);
            })
          }else{
            props.showAlert("Not a valid email","warning")
          }
        }
        else {
            props.showAlert("invalid input","warning")

        };
    }

  return (
    <>
      <div className='r-body'>

        <div className='r-main' >


          <div className='r-heading'>
            <h1>Register</h1>
          </div>
          <div className="form-div">
            <div className="inp">
              <input type="text" name="name" value={user.name || ""} onChange={handleChange} placeholder="FullName" />
            </div>
            <div className="inp">
              <input type="text" name="email" value={user.email || ""} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="inp">
              <input type="password" name="password" value={user.password || ""} onChange={handleChange} placeholder="password" />
            </div>
            <div className="inp">
              <button className='submit' type="submit" onClick={register}>Register</button>
              <p>Aleardy a user? <span onClick={() => Navigate('/login')}>login</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup