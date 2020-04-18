import React from 'react';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage'
import ProfilePage from './Components/Profile/ProfilePage'
import Sessions from './Components/Session/Session'
import Collaborators from './Components/Collaborators/Collaborators'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className= "nav">
      </div>
      <div>
        <Switch>
          <Route exact path = "/" component= {LandingPage}/>
          <Route path = "/profile" render = {() => <ProfilePage /> } />
          <Route path = "/session" render = {() =>  <Sessions /> } />
          <Route path = "/collaborators" render = {() => <Collaborators />} />
        </Switch>
      </div>
      
    </div>
  );
}

export default App;
