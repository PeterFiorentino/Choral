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
               location:'',
               instrument:'',
               fav_genre: '',
               anthem: '',
           },
           loggedUser: props.user,
           isUserLoggedIn: props.isUserLoggedIn,
           isFollowingUser: null,
           changePic: false,
           avatar: '',
           newAvatar: ''
        }
    }
    componentDidMount = () => {
        this.getFollowRelation()
        console.log(this.state.isFollowingUser)
        this.fetchUserData()
        this.fetchUserSessionsAndCollaborators()       
        console.log(this.props)
        // Adding a callback to check if user is following the displayed User
    }

    // componentDidUpdate = () => {
    //     this.getFollowRelation()
    // }

    fetchUserData = async () => {
        const {displayedUser} = this.state
     
        try{
            const response = await axios.get(`/api/users/${displayedUser.id}`)
            const userData = response.data.payload.user

            this.setState({
                displayedUser: {
                    id: this.state.displayedUser.id,
                    username: userData.username,
                    email: userData.email,
                    location: userData.location,
                    instrument: userData.instrument,
                    fav_genre: userData.fav_genre,
                    anthem: userData.anthem
                },
                isOwner: (this.state.loggedUser.toString() === displayedUser.id),
                avatar: userData.avatar,
                newAvatar: null, 
            })
        }catch(error){
            console.log('err =>', error)
        } 
    }

    getFollowRelation = async () => {
        const {displayedUser, loggedUser} = this.state
        try{
            const response = await axios.get(`/api/follows/${loggedUser}/follows/${displayedUser.id}`)
            if(response.data.payload === null){
                this.setState({
                    isFollowingUser: false
                })
            } else {
                this.setState({
                    isFollowingUser: response.data.payload.active_status
                })
            }
           
        } catch(error) {
            console.log('err => ', error)
        }
    }

    followButton = async () => {
        const {displayedUser, loggedUser} = this.state
        const response = await axios.get(`/api/follows/${loggedUser}/follows/${displayedUser.id}`)
        if(response.data.payload === null) {
            this.followUser()
        } else if (response.data.payload.active_status === false) {
            this.refollowUser()
        } else if (response.data.payload.active_status === true){
            this.unfollowUser()
        }
    }

    unfollowUser = async () => {
        const {displayedUser, loggedUser} = this.state
        try{
            const response = await axios.patch(`/api/follows/${loggedUser}/unfollow/${displayedUser.id}`)
            const unfollowed = response.data.payload.active_status
            this.setState({
                isFollowingUser: unfollowed
            })
        } catch(error) {
            console.log('err => ', error)
        }

    }

    refollowUser = async () => {
        const {displayedUser, loggedUser} = this.state
        try{
            const response = await axios.patch(`/api/follows/${loggedUser}/refollow/${displayedUser.id}`)
            const refollowed = response.data.payload.active_status
            this.setState({
                isFollowingUser: refollowed
            })
        } catch(error) {
            console.log('err => ', error)
        }
    }

    fetchUserSessionsAndCollaborators = async () => {
        const {displayedUser} = this.state

        try {
            let response = await axios.get(`/api/sessions/user/${displayedUser.id}`)
            const sessionList = response.data.payload.session
    
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

        try{
            await axios.post(`/api/follows/${loggedUser}/follows/${displayedUser.id}`, {
                user_id: loggedUser,
                followed_id: displayedUser.id
            })
            this.setState({
                isFollowingUser: true 
            })
        }catch(error){
            console.log('err =>', error)
        }
    }

    checkFollowState = async () => {
        console.log('Am I following this person ?', this.state.isFollowingUser)
    }

    toggleInfo = () => {
        this.setState({
            displayInfo: !this.state.displayInfo
        })
    }

    changePic = () => {
        this.setState({
            changePic: !this.state.changePic
        })
    }

    handleNewPic = (event) => {
        this.setState({
            newAvatar: event.target.files[0]
        })
    }

    uploadNewPic = async (event) => {
        event.preventDefault()
        
        const { newAvatar, loggedUser } = this.state

        const avatarData = new FormData()
        avatarData.append('image', newAvatar)
            
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        let avatarResponse = await axios.post('http://localhost:3001/upload/image', avatarData, config)
        let avatarLocation = avatarResponse.data.imageUrl

        await axios.patch(`/api/users/${loggedUser}`, {avatar: avatarLocation})

        this.setState({
            avatar: avatarLocation,
            changePic: false
        })
    }

    render(){
        const {avatar, displayedUser, loggedUser, isUserLoggedIn, isFollowingUser, isOwner} = this.state
        return(
            <>
            {/* <h1 className='main-title'>Choral</h1> */}
            <div className='user-info'>
                <div className='profile-pic-container'>
                    <img id='profile-picture' src={avatar} ></img>
                    {isOwner ? <p onClick={this.changePic} style={{margin:'0px'}}>edit</p> : <></>}
                    {this.state.changePic ?
                        <form onSubmit={this.uploadNewPic}> 
                            <br/>
                            <input
                                required
                                type='file'
                                accept='image/*'
                                name='avatar'
                                placeholder='new avatar'
                                onChange={this.handleNewPic}
                            />
                            <br/><br/>
                            <button className='round-button'>change</button>
                            <br/><br/>
                        </form>
                    : <br/>}
                </div>
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
                    followButton= {this.followButton}/>
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


