import React, {Component} from 'react'
import './Session.css'
import NavBar from '../NavBar/NavBar.jsx'

class Session extends Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <NavBar />
                <p>Sessions Page</p>
            </div>
        )
    }
}




export default Session