import React from 'react';
import {Route, Switch} from 'react-router-dom'
import NavBar from './Components/NavBar'
import LandingPage from './Components/LandingPage'
import ProfilePage from './Components/ProfilePage'
import Sessions from './Components/Sessions'
import Collaborators from './Components/Collaborators'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className= "nav">
        <NavBar />
      </div>
      <div>
        <Switch>
          <Route exact path = "/" component= {LandingPage}/>
          <Route path = "/profile" render = {() => <ProfilePage /> } />
          <Route path = "/sessions" render = {() =>  <Sessions /> } />
          <Route path = "/collaborators" render = { () => <Collaborators />} />
        </Switch>
      </div>
      
    </div>
  );
}

export default App;
