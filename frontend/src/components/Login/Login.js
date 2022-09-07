import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNoteItems } from '../../features/noteSlice';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';


const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    email: "guest",
    password: "guest"
  })

  if (loading) {
    console.log(loading);
    return (
    <div className='acc-load'>
      <Spinner/>
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

  const login = (e) => {
    e.preventDefault();
    const { email, password } = user

    if(localStorage.getItem('token')){
      props.showAlert("Your are already loggedIn","warning")
    }else if (email && password) {
      setLoading(true);
      axios.post("https://to-do-bk.herokuapp.com/api/auth/login", user)
        .then((res) => {
          console.log(res.data.authtoken);
          setLoading(false)
          localStorage.setItem('token', res.data.authtoken)
          props.showAlert("Login Successful", "success")
          dispatch(getNoteItems());
          Navigate('/notes')
        })
        .catch((err) => {
          setLoading(false)
          props.showAlert("Error","danger")
          console.log(err);
        })
      // setLoginAlert(false)
    } else {
      props.showAlert("Invalid Credentials", "warning")
    }
  }
  return (
    <>

      <div className='l-body' >
        <div className="l-main">
          <div className="l-heading">
            <h1>Login</h1>
          </div>
          <div className="form-div">
            <div className="inp">
              <input type="text" name="email" value={user.email || ""} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="inp">
              <input type="password" name="password" value={user.password || ""} onChange={handleChange} placeholder="password" />
            </div>
            <div className="inp">
              <button className='submit' type="submit" onClick={login}>login</button>
              <p>Don't have an account? <span onClick={() => Navigate('/signup')}>Register</span></p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Login