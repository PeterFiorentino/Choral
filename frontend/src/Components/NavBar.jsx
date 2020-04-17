import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return(
        <div className= 'nav-bar'>
            <nav>
                <Link to= "/landing"> Home </Link>{" "}
                <Link to= "/profile"> Profile Page</Link>{" "}
                <Link to= "/collaborators">Collaborators</Link>{" "}
                <Link to= "/sessions"> Sessions</Link>{" "}
            </nav>
        </div>
    )
}

export default NavBar