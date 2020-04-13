import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import trackArray from './assets/tracks.js'
import colors from './assets/colors.js'

class App extends React.Component {
  state = {
    ...trackArray
  }

  componentDidMount() {
    const tracks = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    for (let track in tracks) {
      if (tracks[track].approved) {
        let newStateElement = tracks[track]
        newStateElement.color = colors[track]
        this.setState({
          [track]: newStateElement
        })
      } else {
        let newStateElement = tracks[track]
        newStateElement.color = 'gray'
        audioElements[track].muted = true
        this.setState({
          [track]: newStateElement
        })
      }
    }
  }

  playAll = () => {
    const audioElements = document.getElementsByClassName('audio-element')
    for (let index = 0; index < audioElements.length; index ++) {
      audioElements[index].play()
    }
  }

  pauseAll = () => {
    const audioElements = document.getElementsByClassName('audio-element')
    for (let index = 0; index < audioElements.length; index ++) {
      audioElements[index].pause()
    }
  }

  stopAll = () => {
    const audioElements = document.getElementsByClassName('audio-element')
    for (let index = 0; index < audioElements.length; index ++) {
      audioElements[index].load()
    }
  }

  muteTrack = (index) => {
    const audioElements = document.getElementsByClassName('audio-element')
    if (audioElements[index].muted === false) {
      audioElements[index].muted = true
      let newStateElement = this.state[index]
      newStateElement.color = 'gray' 
      this.setState({
        [index]: newStateElement
      })
    } else {
      audioElements[index].muted = false
      let newStateElement = this.state[index]
      newStateElement.color = colors[index]
      this.setState({
        [index]: newStateElement
      })
    }
  }

  checkPool = (index) => {
    let tracks = this.state
    for (let track in tracks) {
      if (tracks[track].checking === true && track !== index.toString()) {
        const audioElements = document.getElementsByClassName('audio-element')
        audioElements[track].muted = true
        let newStateElement = this.state[track]
        newStateElement.color = 'gray'
        newStateElement.checking = false
        this.setState({
          [track]: newStateElement
        })
      }
    }
    const audioElements = document.getElementsByClassName('audio-element')
    if (audioElements[index].muted === true) {
      audioElements[index].muted = false
      let newStateElement = this.state[index]
      newStateElement.color = colors[index]
      newStateElement.checking = true
      this.setState({
        [index]: newStateElement
      })
    } else {
      audioElements[index].muted = true
      let newStateElement = this.state[index]
      newStateElement.color = 'gray'
      newStateElement.checking = false
      this.setState({
        [index]: newStateElement
      })
    }
  }

  merge = (index) => {
    let newStateElement = this.state[index]
    newStateElement.checking = false
    newStateElement.approved = true
    this.setState({
      [index]: newStateElement
    })
  }

  unmerge = (index) => {
    const audioElements = document.getElementsByClassName('audio-element')
    audioElements[index].muted = true
    let newStateElement = this.state[index]
    newStateElement.approved = false
    newStateElement.color = 'gray'
    this.setState({
      [index]: newStateElement
    })
  }

  render() {
    const tracks = Object.keys(this.state)
    return (
      <div className='App'>
        <br/>
        <h1>Tracks</h1>
        <div className='tracks' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {tracks.map((track) => {
            if (this.state[track].approved) {
              return (
                <div key={track} style={{display:'grid'}}>
                  <button onClick={() => this.muteTrack(track)} style={{width:'100px', height:'100px', backgroundColor:`${this.state[track].color}`}}></button>
                  <button onClick={() => this.unmerge(track)} style={{width:'102px'}}>UNMERGE</button>
                </div>
              )
            } return true
          })}
        </div>
        <br/>
        <br/>
        <div className='transport'>
          <button onClick={this.playAll}>PLAY</button>
          <button onClick={this.pauseAll}>PAUSE</button>
          <button onClick={this.stopAll}>STOP</button>
        </div>
        <br/>
        <h1>Pool</h1>
        <div className='pool' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {tracks.map((track) => {
            if (!this.state[track].approved) {
              return (
                <div key={track} style={{display:'grid'}}>
                  <button onClick={() => this.checkPool(track)} style={{width:'100px', height:'100px', backgroundColor:`${this.state[track].color}`}}></button>
                  <button onClick={() => this.merge(track)} style={{width:'102px'}}>MERGE</button>
                </div>
              )
            } return true
          })}
        </div>
        <div className='audios'>
          {tracks.map((track) => {
            return (
              <audio className='audio-element' key={track}>
                <source src={this.state[track].audio}></source>
              </audio>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App