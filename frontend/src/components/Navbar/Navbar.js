import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navbar.css'
import { clearNote } from '../../features/noteSlice';
const Navbar = (props) => {
    const dispatch = useDispatch();
    const [navClick, setnavClick] = useState(false)
    const Navigate = useNavigate();
    let Location = useLocation();

    const logout = () => {
        localStorage.clear('token');
        dispatch(clearNote())
        props.showAlert("Logged out","success")
        setnavClick(!navClick)

        Navigate('/login')
    }

    const navButton = () => {
        setnavClick(!navClick)
    }



    return (
        <div className='home-body'>

            <div className="home-navbar">
                <div className="home-logo">
                    <div>My <span className='n-r'>Notes</span></div>
                </div>
                <div className={`home-nav ${navClick ? "" : "h-nav v-nav"}`}>
                    <div className={`home-nav-links ${Location.pathname ===  ('/home')? "n-r" : ""}`} onClick={() => {
                        Navigate('/home')
                        setnavClick(!navClick)
                    }}>Home</div>
                    <div className={`home-nav-links ${Location.pathname === "/notes" ? "n-r" : ""}`} onClick={() => {
                        Navigate('/notes')
                        setnavClick(!navClick)
                    }}>Notes</div>
                    <div className={`home-nav-links ${Location.pathname === "/login" ? "n-r" : ""}`} onClick={() => {
                        Navigate('/login')
                        setnavClick(!navClick)
                    }
                    }>Login</div>
                    <div className={`home-nav-links ${Location.pathname === "/about" ? "n-r" : ""}`} onClick={() => {
                        Navigate('/about')
                        setnavClick(!navClick)
                    }}>About</div>
                </div>
                <div className={`home-account ${navClick ? "" : "h-nav v-nav"}`}>
                    <button className='account-btn' onClick={logout}>Logout</button>
                </div>

                <div onClick={navButton} className={`burger-line ${navClick?"rotate-burger":""}`}>
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                </div>

            </div>
            <div className="nav-greyline">

            </div>
        </div>
    )
}

export default Navbar