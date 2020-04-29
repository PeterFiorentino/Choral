import React,{Component} from 'react'
import Navigation from '../Navigation/Navigation.jsx'
import Post from '../Post/Post.jsx'
import axios from 'axios'
import './Profile.css'

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           loggedUser: {

               id: 2,

               username: '',
               email: '',
               avatar: '',
           },

        //    sessionData: [],

        }
    }
    componentDidMount = () => {
        this.fetchUserData()
        this.fetchUserSessionsAndCollaborators()
    }
    fetchUserData = async () => {
        const {loggedUser} = this.state
        try{
            const response = await axios.get(`http://localhost:3001/users/${loggedUser.id}`)
            const userData = response.data.payload.user
            // console.log(userData)
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

    fetchUserSessionsAndCollaborators = async () => {
        const {loggedUser} = this.state
        try {
            let response = await axios.get(`http://localhost:3001/sessions/user/${loggedUser.id}`)
            const sessionList = response.data.payload.session
            // console.log(sessionList)
            for (let sesh of sessionList){
               sesh.collaborations = await this.fetchCollaborators(sesh.id)   
            }
           
            this.setState({
                sessionData: sessionList
            })
            // console.log(this.state.sessionData)
        } catch(error){
            console.log('err =>', error)
        }  
    }

    fetchCollaborators = async (id) => {
        let response2 = await axios.get(`http://localhost:3001/collaborations/${id}`)
        // console.log(response2)
        return response2.data.payload.collabs
    }
 
    render(){
        const {loggedUser} = this.state

        // console.log(loggedUser)
        return(
            <>
            <div className='user-info'>
                <Navigation />
                <h1 className='title'>Choral</h1>
                <img src={loggedUser.avatar} height='300px' width= '300px' alt=''></img>
                <h3>{loggedUser.username}</h3>
            </div>
            
            <div className='session-info'>
                {this.state.sessionData ? 
                this.state.sessionData.map((session) =>
                <Post session={session} key={session.id}></Post>) : <></>}
            </div>
            </>
        )
    }
}



export default ProfilePage


