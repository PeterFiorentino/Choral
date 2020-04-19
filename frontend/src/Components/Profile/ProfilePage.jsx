import React,{Component} from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import axios from 'axios'
import './Profile.css'

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           loggedUser: {
               id: 1,
               username: '',
               email: '',
               avatar: '',
           },
           sessionData: []
        }
    }
    componentDidMount = () => {
        this.fetchUserData()
        this.fetchUserSessions()
    }
    fetchUserData = async () => {
        const {loggedUser} = this.state
        try{
            const response = await axios.get(`http://localhost:3001/users/${loggedUser.id}`)
            const userData = response.data.payload.user
            console.log(userData)
            this.setState({
                loggedUser: {
                    username: userData.username,
                    email: userData.email,
                    avatar: userData.avatar
                }  
            })
        }catch(error){
            console.log('err =>', error)
        } 
    }
    fetchUserSessions = async () => {
        const {sessionData, loggedUser} = this.state
        try {
            const response = await axios.get(`http://localhost:3001/sessions/user/${loggedUser.id}`)
            const sessionList = response.data.payload
            console.log(sessionList)
        } catch(error){
            console.log('err =>', error)
        }
    }

    render(){
        const {loggedUser} = this.state
        // console.log(loggedUser)
        return(
            <div className='profile-page'>
                <NavBar />
                <h1 className='title'>Choral</h1>
                <img src={loggedUser.avatar} height='300px' width= '300px'></img>
                <h3>{loggedUser.username}</h3>
            </div>
        )
    }
}



export default ProfilePage