import React, {Component} from 'react';
import './Components/Landing/LandingPage.css';

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
            <div>
                <p>Landing</p>
            </div>
        )
    }
}



export default LandingPage 