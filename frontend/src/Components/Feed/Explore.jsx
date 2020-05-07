import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'


class Explore extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: props.user,
            feedData: []
        }
    }

    fetchFeedData = async () => {
        try{
            let response = await axios.get(`http://localhost:3001/api/sessions`)
            console.log(response.data.payload.sessions)
            const sessionList = response.data.payload.sessions
            for(let sesh of sessionList){
                sesh.collaborations = await this.fetchCollaborators(sesh.id)
            }
            this.setState({
                feedData: sessionList
            })
        }catch(error){
            console.log('err =>', error)
        }   
    }
    fetchCollaborators = async (id) => {
        try{
            let response2 = await axios.get(`http://localhost:3001/api/collaborations/${id}`)
            console.log(response2)
            return response2.data.payload.collabs
        }catch(error){
            console.log('err =>', error)
        }  
    }
    componentDidMount = () => {
        this.fetchFeedData()
    }
    render(){
        return(
            <>
                <div className='session-info2'>
                    {this.state.feedData ? 
                    this.state.feedData.map((session) =>
                    <Post session={session} key={session.id}></Post>) : <></>}
                </div>
            </>
        )
    }
}





export default Explore