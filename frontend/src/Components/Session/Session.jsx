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
                <h1>Session</h1>
            </div>
        )
    }
}




export default Session