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
            const response = await axios.get(`api/reefs/localfeed/${userId}`)
            // const response = await axios.get(`api/sessions/localfeed/2`) 

            const reefList = response.data.payload

            for(let reef of reefList){
                reef.collaborations = await this.fetchCollaborators(reef.id)
            }

            this.setState({
                myFeedData: reefList
            })
        } catch(error){
            console.log('err =>', error)
        }  
    }
    fetchCollaborators = async (id) => {
        try{
            let response2 = await axios.get(`/api/collaborations/${id}`)
           
            return response2.data.payload.collabs
        } catch(error){
            console.log('err =>', error)
        }  
    }
    
    render(){
        return(
            <>
                <div className='personal-feed'>
                    {this.state.myFeedData ? 
                    this.state.myFeedData.map((reef) =>
                    <Post reef={reef} key={reef.id}></Post>) : <></>}
                </div>
            </>
        )
    }
}




export default MyFeed