import React, {Component} from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    constructor(){
        super()
        this.state = {
            userName: '',
            password: '',
        }
    }
    render(){
        return(
            <div className='main-page'>
                <p>Landing</p>
                <div>
                    <button>Log In</button>
                    <button>Sign up</button>
                </div>
            </div>
        )
    }
}



export default LandingPage 