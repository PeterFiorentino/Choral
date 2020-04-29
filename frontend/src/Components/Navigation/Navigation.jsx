import React from 'react'
import {Link} from 'react-router-dom'
import { Nav, Navbar } from "react-bootstrap"
import './Navigation.css'

const Navigation = () => {
    return(
        <Navbar bg='light'>
            <Navbar.Brand>CHORAL</Navbar.Brand>
            <Nav.Link as='div'><Link to= "/profile"> Profile </Link></Nav.Link>
            <Nav.Link as='div'><Link to= "/add"> Add Session </Link></Nav.Link>
            <Nav.Link as='div'><Link to= "/feed"> Feed </Link></Nav.Link>
        </Navbar>
    )
}

export default Navigation