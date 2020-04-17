import React from 'react';
import {Route, Switch} from 'react-router-dom'
import NavBar from './Components/NavBar'
import LandingPage from './Components/LandingPage'
// import ProfilePage from './Components/ProfilePage'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className= "nav">
        <NavBar />
      </div>
    </div>
  );
}

export default App;
