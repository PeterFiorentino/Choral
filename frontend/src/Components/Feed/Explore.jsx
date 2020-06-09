import React,{Component} from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'


class Explore extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: props.user,
            exploreFeedData: []
        }
    }

    fetchExploreFeedData = async () => {
        try{
            let response = await axios.get(`/api/reefs`)
         
            const reefList = response.data.payload.reefs
            for(let reef of reefList){
                reef.collaborations = await this.fetchCollaborators(reef.id)
            }
            this.setState({
                exploreFeedData: reefList
            })
        }catch(error){
            console.log('err =>', error)
        }   
    }
    fetchCollaborators = async (id) => {
        try{
            let response2 = await axios.get(`/api/collaborations/${id}`)
       
            return response2.data.payload.collabs
        }catch(error){
            console.log('err =>', error)
        }  
    }
    componentDidMount = () => {
        this.fetchExploreFeedData()
    }
    render(){
        return(
            <>
                <div className='reef-info2'>
                    {this.state.exploreFeedData ? 
                    this.state.exploreFeedData.map((reef) =>
                    <Post reef={reef} key={reef.id}></Post>) : <></>}
                </div>
            </>
        )
    }
}





export default Explore