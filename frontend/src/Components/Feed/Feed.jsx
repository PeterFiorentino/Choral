import React, {Component} from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import './Feed.css'

class Feed extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <NavBar />
                <h1>Feed</h1>
            </div>
        )
    }
}





export default Feed