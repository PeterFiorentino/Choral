import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return(
        <div className= 'nav-bar'>
            <nav>
                <Link to= "/landing"> Home </Link>{" "}
                <Link to= "/profile"> Profile Page</Link>{" "}
                <Link to= "/collaborators">Collaborators</Link>{" "}
                <Link to= "/feed"> Feed</Link>{" "}
                <Link to= "/logout"> Log out</Link>{" "}
            </nav>
        </div>
    )
}

export default NavBar