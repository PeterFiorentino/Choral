import React, {Component} from 'react';
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'
import './LandingPage.css';

class LandingPage extends Component {
    constructor(){
        super()
        this.state = {
            login: false,
            signup: false,
            username: '',
            email: '',
            password: '',   
        }

    }

   handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        this.setState({
            [inputName]: inputValue
        })
        console.log(inputValue)
   }
   loginUser = () => {
        console.log('Logging in user')
   }
   signupUser = () => {
        console.log('Signing up user')
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

        let renderLoginForm = login ? (
            <LoginForm handleChange={this.handleChange} username={username} password={password} loginUser= {this.loginUser}/>
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