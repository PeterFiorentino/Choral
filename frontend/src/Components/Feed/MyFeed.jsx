import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'

class MyFeed extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: props.user,
            myFeedData: []
        }
    }

    componentDidMount = () => {
        this.fetchMyFeedData()
    } 

    fetchMyFeedData = async () => {
        const {userId} = this.state
        try{
            const response = await axios.get(`/api/sessions/localfeed/${userId}`)
            console.log(response.data.payload.sessions)
            const sessionList = response.data.payload.sessions
            for(let sesh of sessionList){
                sesh.collaborations = await this.fetchCollaborators(sesh.id)
            }
            this.setState({
                myFeedData: sessionList
            })
        }catch(error){
            console.log('err =>', error)
        }  
    }
    fetchCollaborators = async (id) => {
        try{
            let response2 = await axios.get(`/api/collaborations/${id}`)
            console.log(response2)
            return response2.data.payload.collabs
        }catch(error){
            console.log('err =>', error)
        }  
    }
    render(){
        return(
            <>
                <div className='personal-feed'>
                    {this.state.myFeedData ? 
                    this.state.myFeedData.map((session) =>
                    <Post session={session} key={session.id}></Post>) : <></>}
                </div>
            </>
        )
    }
}




export default MyFeed