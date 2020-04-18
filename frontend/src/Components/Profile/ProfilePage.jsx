import React,{Component} from 'react'
import './Components/Profile/ProfilePage.css'

class ProfilePage extends Component {
    constructor(){
        super()
        this.state = {
            userLoggedIn: ''
        }
    }
    render(){
        return(
            <div>
                <p>Profile Page</p>
            </div>
        )
    }
}



export default ProfilePage