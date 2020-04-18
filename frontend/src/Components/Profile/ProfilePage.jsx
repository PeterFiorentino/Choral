import React,{Component} from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import './Profile.css'

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           loggedUser: {
               id: '',
               username: '',
               email: '',
               avatar: '',
           },
        }
    }

    render(){
        return(
            <div className='profile-page'>
                <NavBar />
                <h1 className='title'>Choral</h1>
                
            </div>
        )
    }
}



export default ProfilePage