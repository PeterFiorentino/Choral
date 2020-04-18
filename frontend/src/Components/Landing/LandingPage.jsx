import React, {Component} from 'react';
import {Link, useHistory} from 'react-router-dom'
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import './LandingPage.css';

class LandingPage extends Component {
    constructor(){
        super()
        this.state = { 
            username: '',
            password: '',
        }

    }

    render(){
        return(
            <div className='main-page'>
                <h1>Choral</h1>
                <div className='login-signup'>
                    <LoginButton />
                    <SignupButton />
                </div>
            </div>
        )
    }
}



export default LandingPage 