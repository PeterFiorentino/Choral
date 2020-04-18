import React from 'react';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage'
import ProfilePage from './Components/Profile/ProfilePage'
import Collaborators from './Components/Collaborators/Collaborators'
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
          <Route path = "/collaborators" render = {() => <Collaborators />} />
          {/* <Route path = "/feed" render = {() => <Feed />} /> */}
        </Switch>
      </div>
      
    </div>
  );
}

export default App;
