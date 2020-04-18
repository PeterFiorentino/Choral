import React, {Component} from 'react'
import './Collaborators.css'
import NavBar from '../NavBar/NavBar.jsx'

class Collaborators extends Component {
    constructor(){
        super()
        this.state = {
            userName: '',
            collaborators: []
        }
    }
    render(){
        return(
            <div>
                <NavBar />
                <p>Collaborators Page</p>
            </div>
        )
    }
}



export default Collaborators