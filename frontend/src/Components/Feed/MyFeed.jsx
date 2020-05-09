import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'

class MyFeed extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: props.user,
            feedData: []
        }
    }
    fetchFeedData = async () => {
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}




export default MyFeed