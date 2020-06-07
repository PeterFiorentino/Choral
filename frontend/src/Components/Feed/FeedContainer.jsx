import React, {Component} from 'react'
import MyFeed from '../Feed/MyFeed.jsx'
import Explore from '../Feed/Explore.jsx'
import './FeedContainer.css'

class FeedContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : props.user,
            myFeed: false,
            myFeedSelectedColor: 'white',
            explore: true,
            exploreSelectedColor: 'lightcoral'
        }
    }
    
   toggleMyFeed = () => {
        this.setState({
            myFeed: true,
            myFeedSelectedColor: 'lightcoral',
            explore: false,
            exploreSelectedColor: 'white'
        })
   }

   toggleExplore = () => {
        this.setState({
            explore: true,
            exploreSelectedColor: 'lightcoral',
            myFeed: false,
            myFeedSelectedColor: 'white'
        })
   }

    render(){
        const {myFeed, explore, user} = this.state 
        // console.log(userId)
        let renderMyFeed = myFeed ? (
            <div>
                <MyFeed user={user}/>
            </div>
        ): null
        let renderExplorePage = explore ? (
            <div>
                <Explore user={user}/>
            </div>
        ):null

        return(
            <div>
                {/* <h1 className='main-title'>Choral</h1> */}
                <button className='round-button' onClick={this.toggleMyFeed} style={{backgroundColor:`${this.state.myFeedSelectedColor}`}}>My Feed</button>
                <button className='round-button' onClick={this.toggleExplore} style={{backgroundColor:`${this.state.exploreSelectedColor}`}}>Explore</button>
                {renderMyFeed}
                {renderExplorePage}
            </div>
        )
    }
}





export default FeedContainer