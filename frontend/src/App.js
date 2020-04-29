import React from 'react';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage'
import ProfilePage from './Components/Profile/ProfilePage'
// import Collaborators from './Components/Collaborators/Collaborators'
import FeedContainer from './Components/Feed/FeedContainer'
import Session from './Components/Session/Session'
import AddSession from './Components/AddSession/AddSession'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className= "nav">
      </div>
      <div>
        <Switch>
          <Route exact path = "/landing" component= {LandingPage}/>
          <Route path = "/profile" render = {() => <ProfilePage /> } />
          {/* <Route path = "/collaborators" render = {() => <Collaborators />} /> */}
          <Route path = "/feed" render = {() => <FeedContainer />} />
          <Route path = "/session/:id" render = {(routeProps) => <Session {...routeProps} />} />
          <Route path = "/add" render = {() => <AddSession />} />
        </Switch>
      </div>
      
    </div>
  );
}

export default App;
