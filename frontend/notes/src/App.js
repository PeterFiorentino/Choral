import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import trackArray from './assets/tracks.js'
import colors from './assets/colors.js'
import Slider from '@material-ui/core/Slider'
import { ProgressBar } from 'react-bootstrap'

class App extends React.Component {
  state = {
    ...trackArray
  }

  componentDidMount() {
    this.stopAll()
    setTimeout(() => this.completeState(), 500)
  }

  completeState = () => {
    const tracks = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    let newStateElement = tracks[0]
    newStateElement.time = audioElements[0].currentTime
    newStateElement.duration = audioElements[0].duration
    newStateElement.color = colors[0]
    this.setState({
      0: newStateElement
    })
    for (let track in tracks) {
      if (tracks[track].approved === 'yes') {
        let newStateElement = tracks[track]
        newStateElement.color = colors[track]
        this.setState({
          [track]: newStateElement
        })
      } else if (tracks[track].approved === 'no') {
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
    newStateElement.approved = 'yes'
    this.setState({
      [index]: newStateElement
    })
  }

  unmerge = (index) => {
    const audioElements = document.getElementsByClassName('audio-element')
    audioElements[index].muted = true
    let newStateElement = this.state[index]
    newStateElement.approved = 'no'
    newStateElement.color = 'gray'
    this.setState({
      [index]: newStateElement
    })
  }

  secondsToMinutes = (seconds) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

  handleTime = () => {
    let audioElements = document.getElementsByClassName('audio-element')
    let newStateElement = this.state[0]
    newStateElement.time = audioElements[0].currentTime
    this.setState({
      0: newStateElement
    })
   }

  changeTime = async (event) => {
    let clickX = event.pageX + 1 - window.innerWidth * 0.1
    let totalX = window.innerWidth * 0.8
    let percentage = clickX / totalX
    const audioElements = document.getElementsByClassName('audio-element')
    for (let index = 0; index < audioElements.length; index ++) {
      audioElements[index].currentTime = audioElements[0].duration * percentage
    }
    let newStateElement = this.state[0]
    newStateElement.time = newStateElement.duration * percentage
    this.setState({
      0: newStateElement
    })
  }

  changeVolume = (index, event) => {
    let currentValue = event.target.getAttribute('aria-valuenow')
    if (currentValue !== 'NaN' && currentValue !== null) {
      const audioElements = document.getElementsByClassName('audio-element')
      audioElements[index].volume = currentValue / 100
    }
  }

  render() {
    const tracks = Object.keys(this.state)
    return (
      <div className='App'>
        <br/>
        <h1>Tracks</h1>
        <div className='tracks' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <div style={{display:'grid', gridTemplateColumns: '110px 10px'}}>
            <button onClick={() => this.muteTrack('0')} style={{borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px', backgroundColor:`${this.state[0].color}`}}></button>
            <Slider orientation='vertical' style={{marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume(0, event)}></Slider>
          </div>
          {tracks.map((track) => {
            if (this.state[track].approved === 'yes') {
              return (
                <div key={track} style={{display:'grid', gridTemplateColumns:'110px 10px', gridTemplateRows:'110px 30px'}}>
                  <button onClick={() => this.muteTrack(track)} style={{gridColumn:'1 / 2', borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px', backgroundColor:`${this.state[track].color}`}}></button>
                  <button onClick={() => this.unmerge(track)} style={{gridColumn:'1 / 2', borderRadius:'10px'}}>UNMERGE</button>
                  <Slider orientation='vertical' style={{gridRow: '1 / 2', gridColumn:'2 / 2', marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume(track, event)}></Slider>
                </div>
              )
            } return true
          })}
        </div>
        <br/>
        <div className='transport'>
          <div style={{paddingLeft:'10%', width:'90%'}}>
            <ProgressBar now={this.state[0].time} max={this.state[0].duration} style={{height:'80px', fontSize:'20px'}} variant='info' label={this.secondsToMinutes(this.state[0].time)} onClick={this.changeTime}></ProgressBar>
          </div>
          <br/>
          <button onClick={this.playAll}>PLAY</button>
          <button onClick={this.pauseAll}>PAUSE</button>
          <button onClick={this.stopAll}>STOP</button>
        </div>
        <br/>
        <h1>Pool</h1>
        <div className='pool' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {tracks.map((track) => {
            if (this.state[track].approved === 'no') {
              return (
                <div key={track} style={{display:'grid', gridTemplateRows:'110px 30px'}}>
                  <button onClick={() => this.checkPool(track)} style={{borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px', backgroundColor:`${this.state[track].color}`}}></button>
                  <button onClick={() => this.merge(track)} style={{borderRadius: '10px'}}>MERGE</button>
                </div>
              )
            } return true
          })}
        </div>
        <div className='audios'>
          {tracks.map((track) => {
            return (
              <audio className='audio-element' onTimeUpdate={this.handleTime} key={track}>
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