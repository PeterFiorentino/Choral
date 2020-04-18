import React,{Component} from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import './Profile.css'

class ProfilePage extends Component {
    constructor(){
        super()
        this.state = {
           loggedUser: {},
        }
    }
    render(){
        return(
            <div>
                <NavBar />
                <p>Profile Page</p>
            </div>
        )
    }
}



export default ProfilePage