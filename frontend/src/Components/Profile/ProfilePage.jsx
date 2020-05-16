import React,{Component} from 'react'
import ProfileCard from '../Profile/ProfileCard.jsx'
import Post from '../Post/Post.jsx'
import FollowButton from '../Profile/FollowButton.jsx'
import axios from 'axios'
import './Profile.css'
 
// Logged User Id is taken from params id and User Signed In is taken 
class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           displayedUser: {
               id: props.match.params.id,
               username: '',
               email: '',
               avatar: '',
               location:'',
               instrument:'',
               fav_genre: '',
               anthem: '',
           },
           loggedUser: props.user,
           isUserLoggedIn: props.isUserLoggedIn,
           isFollowingUser: false,
           displayInfo: true
        }
    }
    componentDidMount = () => {
        this.fetchUserData()
        this.fetchUserSessionsAndCollaborators()
        console.log(this.props)
        // Adding a callback to check if user is following the displayed User
    }
   
    fetchUserData = async () => {
        const {displayedUser} = this.state
        console.log(displayedUser)
        try{
            const response = await axios.get(`/api/users/${displayedUser.id}`)
            const userData = response.data.payload.user
            console.log(userData)
            this.setState({
                displayedUser: {
                    id: this.state.displayedUser.id,
                    username: userData.username,
                    email: userData.email,
                    avatar: userData.avatar,
                    location: userData.location,
                    instrument: userData.instrument,
                    fav_genre: userData.fav_genre,
                    anthem: userData.anthem
                },
                isOwner: (this.state.loggedUser.toString() === displayedUser.id)  
            })
        }catch(error){
            console.log('err =>', error)
        } 
    }

    fetchUserSessionsAndCollaborators = async () => {
        const {displayedUser} = this.state
        console.log(displayedUser)
        try {
            let response = await axios.get(`/api/sessions/user/${displayedUser.id}`)
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
        const {displayedUser, loggedUser} = this.state
        console.log('logInState =>', this.state.isUserLoggedIn)
        console.log('followState =>', this.state.isFollowingUser)
        console.log('This button follows the user', displayedUser)

        try{
            const response = await axios.post(`/api/follow/${loggedUser}/follows/${displayedUser.id}`, {
                is_following: loggedUser,
                being_followed: displayedUser.id
            })
            console.log('response =>', response)
            this.setState({
                isFollowingUser: true 
            })
        }catch(error){
            console.log('err =>', error)
        }
    }

    unfollowUser = async () => {
        console.log('logInState =>', this.state.isUserLoggedIn)
        console.log('followState =>', this.state.isFollowingUser)
        console.log('This button unfollows the user')
        this.setState({
            isFollowingUser: false
        })
        console.log(`Are still following ${this.state.displayedUser.username}`, this.state.isFollowingUser)
        // const response = await axios.
    }

    checkFollowState = async () => {
        console.log('Am I following this person ?', this.state.isFollowingUser)
    }

    toggleInfo = () => {
        this.setState({
            displayInfo: !this.state.displayInfo
        })
    }

    render(){
        const {displayedUser, loggedUser, isUserLoggedIn, isFollowingUser} = this.state
        return(
            <>
            <h1 className='title'>Choral</h1>
            <div className='user-info'>
                <img id='profile-picture' src={displayedUser.avatar} ></img>
                <ProfileCard
                    displayedUser={displayedUser}
                    loggedUser={loggedUser}
                    toggleInfo={this.toggleInfo}
                    displayInfo={this.state.displayInfo}
                />
            </div>
            <div>
                <FollowButton
                    displayedUser= {displayedUser}
                    loggedUser = {loggedUser}
                    isUserLoggedIn= {isUserLoggedIn} 
                    isFollowingUser= {isFollowingUser}
                    followUser= {this.followUser}
                    unfollowUser= {this.unfollowUser}/>
            </div>
            <div className='session-info'>
                {this.state.sessionData ? 
                this.state.sessionData.map((session) =>
                    <Post session={session} key={session.id} canDelete={this.state.isOwner}></Post>
                ) : <></>}
            </div>
            </>
        )
    }
}



export default ProfilePage


