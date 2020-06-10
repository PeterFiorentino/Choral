import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import Navigation from './Components/Navigation/Navigation'
import LandingPage from './Components/Landing/LandingPage'
import ProfilePage from './Components/Profile/ProfilePage'
import Collaborators from './Components/Collaborators/Collaborators'
import FeedContainer from './Components/Feed/FeedContainer'
import Reef from './Components/Reef/Reef'
import AddReef from './Components/AddReef/AddReef'
import axios from 'axios'
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      user: null,
      isUserLoggedIn: false,
      wasInitialized: false
    }
  }
  
  componentDidMount = async () => {
    await this.checkLoginStatus()
    this.initialize()
    if (this.props.refreshRoute) {
      this.props.history.replace(this.props.refreshRoute)
    }
  }

  initialize = () => {
    this.setState({
      wasInitialized: true 
    })
  }
  setUser = (user) => {
    this.setState({
      user: user.id,
      isUserLoggedIn: true
    })
  }

  logOutUser = async () => {
    try{
      await axios.post(`/api/auth/logout`)
      this.setState({
        user: null,
        isUserLoggedIn: false
      })
      this.props.history.push('/landing')
    } catch(error){
      console.log('err =>', error)
    }
  }
  checkLoginStatus = async () => {
    try{
      const response = await axios.get('/api/auth/isUserLoggedIn')

      this.setUser(response.data.payload)
    } catch(error){
      console.log('err =>', error)
    }
  }

  renderLandingPage = (routeProps) => {
    return <LandingPage  {...routeProps} setUser={this.setUser} logOutUser={this.logOutUser}/>
  }

  renderProfilePage = (routeProps) => {
    return <ProfilePage {...routeProps} user={this.state.user} isUserLoggedIn={this.state.isUserLoggedIn}/>
  }

  renderCollaboratorsPage = (routeProps) => {
    return <Collaborators {...routeProps} user={this.state.user} isUserLoggedIn={this.state.isUserLoggedIn}/>
  }

  renderFeedPage = () => {
    return <FeedContainer user={this.state.user}  />
  }

  renderReefPageById = (routeProps) => {
    return <Reef user={this.state.user} isUserLoggedIn={this.state.isUserLoggedIn} {...routeProps} />
  }

  renderAddReefPage = () => {
    return <AddReef user={this.state.user}/>
  }

  render(){
    const {isUserLoggedIn, wasInitialized} = this.state
    // console.log('user =>', user)
    return (
      <div className="App">
        <div className= "nav">
          <Navigation user={this.state.user} logOutUser= {this.logOutUser} isUserLoggedIn = {isUserLoggedIn}/>
        </div>
        <div>
          <Switch>
            <Route exact path = "/" render= {this.renderLandingPage}/>
            <Route path = "/landing" render= {this.renderLandingPage}/>
            <PrivateRoute path = "/profile/:id" render = {this.renderProfilePage} isUserLoggedIn= {isUserLoggedIn} wasInitialized= {wasInitialized}/>
            <PrivateRoute path = "/collaborators" render = {this.renderCollaboratorsPage} isUserLoggedIn={isUserLoggedIn} wasInitialized={wasInitialized}/>
            <PrivateRoute path = "/feed" render = {this.renderFeedPage } isUserLoggedIn={isUserLoggedIn} wasInitialized={wasInitialized}/>
            <PrivateRoute path = "/reef/:id" render = {this.renderReefPageById} isUserLoggedIn={isUserLoggedIn} wasInitialized={wasInitialized}/>
            <PrivateRoute path = "/add" render = {this.renderAddReefPage} isUserLoggedIn={isUserLoggedIn} wasInitialized={wasInitialized}/>
          </Switch>
        </div>
        
      </div>
    );
  }
}
export default withRouter(App);
