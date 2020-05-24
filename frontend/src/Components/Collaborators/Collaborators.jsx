import React, {Component} from 'react'
import './Collaborators.css'
import Navigation from '../Navigation/Navigation.jsx'

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
                <Navigation />
                <h1 className='main-title'>Choral</h1>
                <h3>Collaborators</h3>
            </div>
        )
    }
}



export default Collaborators