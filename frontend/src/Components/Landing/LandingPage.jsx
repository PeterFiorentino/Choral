import React, {Component} from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'
import {Route, Redirect} from 'react-router-dom'
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
            avatar: '',  
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

   loginUser = async () => {
    const {username, password} = this.state
    const {history} = this.props
    console.log('Logging in user')
       try{
        const response = await axios.post('/api/auth/login',{
            username: username, 
            password: password
        })
        console.log('res =>', response)
        const user = response.data.payload
        console.log(user)

        this.props.setUser(user)
        console.log(user)

        history.push(`/profile/${user.id}`)       
    }   catch(error){
            console.log('err =>', error)
       } 
        
   }
   
   signupUser = async () => {
        console.log('Signing up user')
        const {username, email, password, avatar} = this.state
        try{
            const response = await axios.post('/api/auth/signup',{
                username: username,
                email: email,
                password: password,
                avatar: avatar
            })
            console.log('res =>',response)
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
        const {login,signup, username, email, password} = this.state
        const user = this.props.user
        let renderLoginForm = login ? (
            <LoginForm handleChange={this.handleChange} username={username} password={password} loginUser= {this.loginUser} />
        ) :null

        let renderSignupForm = signup ? (
            <SignupForm handleChange={this.handleChange} username={username} email={email} password={password} signupUser={this.signupUser}/>
        ) :null
        
        return(
            <div className='main-page'>
                <h1 id='main-title'>Choral</h1>
                <div className='login-signup'>
                    <button onClick={this.displayLoginForm}>Login</button>
                    {renderLoginForm}
                    <button onClick={this.displaySignupForm}>Sign up</button>
                    {renderSignupForm}
                </div>
            </div>
        )
    }
}



export default LandingPage 