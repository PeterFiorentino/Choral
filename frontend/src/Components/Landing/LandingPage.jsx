import React, {Component} from 'react';
// import Typography from 'material-ui/core'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'
import './LandingPage.css';

class LandingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            login: false,
            signup: false,
            username: '',
            email: '',
            password: '',
            location: '',
            instrument: '',
            fav_genre: '',
            anthem: '',
            avatar: 'https://cdn.clipart.email/60dc0ace75203466caef979a0a5c4e24_17685-earphones-icon-cliparts-stock-vector-and-royalty-free-_450-450.jpeg',
            uploading: false  
        }

    }

   handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        this.setState({
            [inputName]: inputValue
        })
        // console.log(inputValue)
   }

   handleFile = (e) => {
       this.setState({
           [e.target.name]: e.target.files[0]
       })
   }

   loginUser = async () => {
    const {username, password} = this.state
    const {history} = this.props
    
       try{
        const response = await axios.post('/api/auth/login',{
            username: username, 
            password: password
        })
     
        const user = response.data.payload

        this.props.setUser(user)

        // history.push(`/profile/${user.id}`)
        history.push(`/feed`)       
    }   catch(error){
            console.log('err =>', error)
       } 
        
   }
   
   signupUser = async () => {
        const {username, email, password, location, instrument, fav_genre, anthem, avatar} = this.state

        try{
            this.setState({
                uploading: true
            })

            let avatarLocation = avatar
            if (avatar !== 'https://cdn.clipart.email/60dc0ace75203466caef979a0a5c4e24_17685-earphones-icon-cliparts-stock-vector-and-royalty-free-_450-450.jpeg') {
                const avatarData = new FormData()
                avatarData.append('image', avatar)
            
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                let avatarResponse = await axios.post('/upload/image', avatarData, config)
                avatarLocation = avatarResponse.data.imageUrl
            }

            await axios.post('/api/auth/signup',{
                username: username,
                email: email,
                password: password,
                location: location,
                instrument: instrument,
                fav_genre: fav_genre,
                anthem: anthem,
                avatar: avatarLocation
            })
         
            this.loginUser()
        } catch(error){
            console.log('err =>', error)
        }
   }

    displayLoginForm = () => {
        this.setState({
            login: !this.state.login,
            signup: false
        })
    }

    displaySignupForm = () => {
        this.setState({
            signup: !this.state.signup,
            login: false
        })
    }

    render(){
        const {login, signup, username, email, password, location, instrument, fav_genre, anthem} = this.state
        
        let renderLoginForm = login ? (
            <LoginForm handleChange={this.handleChange} username={username} password={password} loginUser= {this.loginUser} />
        ) :null

        let renderSignupForm = signup ? (
            <SignupForm handleChange={this.handleChange} handleFile={this.handleFile} username={username} email={email} password={password} location={location} instrument={instrument} fav_genre={fav_genre} anthem={anthem} signupUser={this.signupUser}/>
        ) :null
        
        return(
    
            <div className='main-page'>
                <h1 className='main-title'>Choral</h1>
                <h4 className='tag-line'>A remote musical playground</h4>
                <p id='landing-text' >Collaborate with strangers and friends alike to make the music you enjoy.<br/>Contribute to other musicians songs and create a new sound for people to add to.</p>
                <div className='login-signup'>
                    <button className='round-button' onClick={this.displayLoginForm}>Login</button>
                    <button className='round-button' onClick={this.displaySignupForm}>Sign up</button>
                    {renderLoginForm}
                    {renderSignupForm}
                    {this.state.uploading ? <p>signing you up...</p> : <></>}
                </div>
                <div className='background-image'>
                    <img id='img' alt='' src='https://cdn.wallpapersafari.com/24/86/2y6oVT.png'></img>
                </div>
            </div>
           
        )  
    }
}



export default LandingPage 