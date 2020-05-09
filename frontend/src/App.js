import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import Navigation from './Components/Navigation/Navigation'
import LandingPage from './Components/Landing/LandingPage'
import ProfilePage from './Components/Profile/ProfilePage'
import Collaborators from './Components/Collaborators/Collaborators'
import FeedContainer from './Components/Feed/FeedContainer'
import Session from './Components/Session/Session'
import AddSession from './Components/AddSession/AddSession'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: null,
      isUserLoggedIn: false
    }
  }
  
  componentDidMount = () => {
    this.checkLoginStatus()
  }

  setUser = (user) => {
    console.log('setting user to =>', user.id)
    this.setState({
      user: user.id,
      isUserLoggedIn: true
    })
  }

  logOutUser = async () => {
    try{
      await axios.post(`/api/auth/logout`)
      console.log('Logging out user')
      this.setState({
        user: null,
        isUserLoggedIn: false
      })
      this.props.history.push('/landing')
    }catch(error){
      console.log('err =>', error)
    }
  }
  checkLoginStatus = async () => {
    try{
      const response = await axios.get('/api/auth/isUserLoggedIn')
      console.log(response.data.payload)
      this.setUser(response.data.payload)
    }catch(error){
      console.log('err =>', error)
    }
    console.log('Checking if user is logged in')
  }

  renderLandingPage = (routeProps) => {
    return <LandingPage  {...routeProps} setUser={this.setUser} logOutUser={this.logOutUser}/>
  }

  renderProfilePage = (routeProps) => {
    return <ProfilePage {...routeProps} user={this.state.user} isUserLoggedIn={this.state.isUserLoggedIn}/>
  }

  renderCollaboratorsPage = (routeProps) => {
    return <Collaborators {...routeProps} />
  }

  renderFeedPage = () => {
    return <FeedContainer user={this.state.user}  />
  }

  renderSessionPageById = (routeProps) => {
    return <Session user={this.state.user} isUserLoggedIn={this.state.isUserLoggedIn} {...routeProps} />
  }

  renderAddSessionPage = () => {
    return <AddSession user={this.state.user}/>
  }

  render(){
    const {isUserLoggedIn, user} = this.state
    // console.log('user =>', user)
    return (
      <div className="App">
        <div className= "nav">
          <Navigation user={this.state.user} logOutUser= {this.logOutUser} isUserLoggedIn = {isUserLoggedIn}/>
        </div>
        <div>
          <Switch>
            <Route path = "/landing" render= {this.renderLandingPage}/>
            <PrivateRoute path = '/profile/:id' render = {this.renderProfilePage} isUserLoggedIn= {isUserLoggedIn}/>
            <PrivateRoute path = "/collaborators" render = {this.renderCollaboratorsPage} isUserLoggedIn={isUserLoggedIn} />
            <PrivateRoute path = "/feed" render = {this.renderFeedPage } isUserLoggedIn={isUserLoggedIn} />
            <Route path = "/session/:id" render = {this.renderSessionPageById} isUserLoggedIn={isUserLoggedIn}/>
            <PrivateRoute path = "/add" render = {this.renderAddSessionPage} isUserLoggedIn={isUserLoggedIn} />
          </Switch>
        </div>
        
      </div>
    );
  }
}
export default withRouter(App);
