import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return(
        <div className= 'nav-bar'>
            <nav>
                <NavLink to= "/landing"> Home </NavLink>{" "}
                <NavLink to= "/profile"> Profile Page</NavLink>{" "}
                <NavLink to= "/collaborators">Collaborators</NavLink>{" "}
                <NavLink to= "/feed"> Feed</NavLink>{" "}
                <NavLink to= "/landing"> Log out</NavLink>{" "}
            </nav>
        </div>
    )
}

export default NavBar