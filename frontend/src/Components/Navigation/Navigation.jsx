import React from 'react'
import {Link} from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
    return(
        <div className= 'navigation'>
            <nav id='links'>
                <Link to= "/landing"> Home </Link>{" "}
                <Link to= "/profile"> Profile Page </Link>{" "}
                <Link to= "/collaborators"> Collaborators  </Link>{" "}
                <Link to= "/feed"> Feed </Link>{" "}
                <Link to= "/landing"> Log out </Link>{" "}
            </nav>
        </div>
    )
}

export default Navigation