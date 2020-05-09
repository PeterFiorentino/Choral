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
            explore: false,
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
                <h2>My Feed</h2>
                <MyFeed />
            </div>
        ): null
        let renderExplorePage = explore ? (
            <div>
                <h2>Explore</h2>
                <Explore user={user}/>
            </div>
        ):null

        return(
            <div>
                <h1>Feed</h1>
                    <button onClick={this.toggleMyFeed}>My Feed</button>
                    {renderMyFeed}
                    <button onClick={this.toggleExplore}>Explore</button>
                    {renderExplorePage}
            </div>
        )
    }
}





export default FeedContainer