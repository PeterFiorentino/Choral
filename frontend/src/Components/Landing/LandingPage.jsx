import React, {Component} from 'react';
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import axios from 'axios'
import './LandingPage.css';

class LandingPage extends Component {
    constructor(){
        super()
        this.state = { 
            userId: '',
            username: 'ojones311',
            password: '',   
        }

    }
    handleLoginForm = (e) => {
        
    }
     handleSignupForm = () => {

     }
    gatherAllUsers = async () => {
        try{
            let response = await axios.get('http://localhost:3001/users')
            console.log(response.data.payload)
            return response.data.payload
        }catch(error){
            console.log('err =>', error)
        }
    }
    signUpUser = () => {

    }
    componentDidMount = () => {
        this.gatherAllUsers()
    }
    
    render(){
        const {isLoggedIn, userId, username, password} = this.state
        return(
            <div className='main-page'>
                <h1 id='main-title'>Choral</h1>
                <div className='login-signup'>
                    <LoginButton isLoggedIn = {isLoggedIn} userId={userId} username= {username} password={password} />
                    <SignupButton />
                </div>
            </div>
        )
    }
}



export default LandingPage 