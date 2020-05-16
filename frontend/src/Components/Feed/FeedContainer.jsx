import React, {Component} from 'react'
import Navigation from '../Navigation/Navigation.jsx'
import MyFeed from '../Feed/MyFeed.jsx'
import Explore from '../Feed/Explore.jsx'
import './FeedContainer.css'

class FeedContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : props.user,
            myFeed: false,
            explore: true,
        }
    }
    
   toggleMyFeed = () => {
        this.setState({
            myFeed: !this.state.myFeed,
            explore: false
        })
   }

   toggleExplore = () => {
        this.setState({
            explore: !this.state.explore,
            myFeed: false
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
                <h1>Choral</h1>
                <button className='round-button' onClick={this.toggleMyFeed}>My Feed</button>
                <button className='round-button' onClick={this.toggleExplore}>Explore</button>
                {renderMyFeed}
                {renderExplorePage}
            </div>
        )
    }
}





export default FeedContainer