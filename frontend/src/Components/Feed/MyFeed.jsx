import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'

class MyFeed extends Component {
    constructor(){
        super()
        this.state = {
            userId: '',
            feedData: []
        }
    }
    
    render(){
        return(
            <div>
                <p>My Feed</p>
            </div>
        )
    }
}




export default MyFeed