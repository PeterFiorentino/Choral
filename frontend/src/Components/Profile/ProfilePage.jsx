import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'
import ProfilePic from '../Profile/ProfilePic.jsx'
import './Profile.css'

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           loggedUser: {
               id: props.match.params.id,
               username: '',
               email: '',
               avatar: '',
           },
        }
    }
    componentDidMount = () => {
        this.fetchUserData()
        this.fetchUserSessionsAndCollaborators()
        // console.log(this.props)
    }
   
    fetchUserData = async () => {
        const {loggedUser} = this.state
        console.log(loggedUser)
        try{
            const response = await axios.get(`/api/users/${loggedUser.id}`)
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

    fetchUserSessionsAndCollaborators = async () => {
        const {loggedUser} = this.state
        console.log(loggedUser)
        try {
            let response = await axios.get(`/api/sessions/user/${loggedUser.id}`)
            const sessionList = response.data.payload.session
            console.log(sessionList)
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
        let response2 = await axios.get(`/api/collaborations/${id}`)
        console.log(response2)
        return response2.data.payload.collabs
    }
    followUser = async () => {
        console.log('This button follows the user')
    }
    render(){
        const {loggedUser} = this.state
        return(
            <>
            <div className='user-info'>
                <h1 className='title'>Choral</h1>
                <ProfilePic loggedUser = {loggedUser}/>
                <br></br>
                <button onClick={this.followUser}>Follow</button>
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


