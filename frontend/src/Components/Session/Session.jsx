import React, {Component} from 'react'
import './Session.css'
import Navigation from '../Navigation/Navigation.jsx'
import Slider from '@material-ui/core/Slider'
import { ProgressBar, Spinner } from 'react-bootstrap'
import axios from 'axios'


class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedUser: props.user,
            sessionId: props.match.params.id,
            saved: false,
        }
    }

    async componentDidMount() {
        let response = await axios.get(`http://localhost:3001/api/sessions/${this.state.sessionId}`)
        let sessionData = response.data.payload.session[0]
        let response2 = await axios.get(`http://localhost:3001/api/collaborations/${this.state.sessionId}`)
        let collabsData = response2.data.payload.collabs
        this.setState({
            sessionData: sessionData,
            collabsData: collabsData
        })
        this.stopAll()
        setTimeout(() => this.completeState(), 1000)
        console.log(this.props)
    }

    getAudioElements = () => {
        return document.getElementsByClassName('audio-element')
    }

    completeState = () => {
        const audioElements = this.getAudioElements()
        let completeSessionData = this.state.sessionData
        completeSessionData.time = audioElements[0].currentTime
        completeSessionData.duration = audioElements[0].duration
        // completeSessionData.color = colors[0]
        this.setState({
            sessionData: completeSessionData
        })
        let completeCollabsData = this.state.collabsData
        for (let index = 0; index < completeCollabsData.length; index++) {
            let audioIndex = index + 1
            if (completeCollabsData[index].approved === false) {
                // newStateElement.color = 'gray'
                audioElements[audioIndex].muted = true
            }
        }
        this.setState({
            collabsData: completeCollabsData
        })
    }

    playAll = () => {
        const audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index ++) {
            audioElements[index].play()
        }
    }

    pauseAll = () => {
        const audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index ++) {
            audioElements[index].pause()
        }
    }

    stopAll = () => {
        const audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index ++) {
            audioElements[index].load()
        }
    }

    muteTrack = (index) => {
        const audioIndex = index + 1
        const audioElements = this.getAudioElements()
        // const collabsData = this.state.collabsData
        // const collabIndex = audioIndex - 1
        if (audioElements[audioIndex].muted === false) {
            audioElements[audioIndex].muted = true
            // let updatedCollabs = collabsData
            // updatedCollabs[collabIndex].color = 'gray' 
            // this.setState({
            //     collabsData: updatedCollabs
            // })
        } else {
            audioElements[audioIndex].muted = false
            // let updatedCollabs = collabsData
            // updatedCollabs[collabIndex].color = colors[audioIndex]
            // this.setState({
            //     collabsData: updatedCollabs
            // })
        }
    }

    checkPool = (index) => {
        const audioElements = this.getAudioElements()
        const collabIndex = index
        for (let i = 0; i < this.state.collabsData.length; i++) {
            if (this.state.collabsData[i].checking === true && i !== collabIndex) {
                const audioIndex = i + 1
                audioElements[audioIndex].muted = true
                let updatedCollabs = this.state.collabsData
                // updatedCollabs.color = 'gray'
                updatedCollabs[i].checking = false
                this.setState({
                    collabsData: updatedCollabs
                })
            }
        }
        const audioIndex = index + 1
        if (audioElements[audioIndex].muted === true) {
            audioElements[audioIndex].muted = false
            let updatedCollabs = this.state.collabsData
            // updatedCollabs[collabIndex].color = colors[audioIndex]
            updatedCollabs[collabIndex].checking = true
            this.setState({
                collabsData: updatedCollabs
            })
        } else if (audioElements[audioIndex].muted === false) {
            audioElements[audioIndex].muted = true
            let updatedCollabs = this.state.collabsData
            // updatedCollabs.color = 'gray'
            updatedCollabs[collabIndex].checking = false
            this.setState({
                collabsData: updatedCollabs
            })
        }
    }

    merge = (index) => {
        let updatedCollabs = this.state.collabsData
        updatedCollabs[index].checking = false
        updatedCollabs[index].approved = true
        this.setState({
            collabsData: updatedCollabs,
            saved: false
        })
    }

    unmerge = (index) => {
        const audioElements = this.getAudioElements()
        const audioIndex = index + 1
        audioElements[audioIndex].muted = true
        let updatedCollabs = this.state.collabsData
        updatedCollabs[index].approved = false
        // updatedCollabs[index].color = 'gray'
        this.setState({
            collabsData: updatedCollabs,
            saved: false
        })
    }

    secondsToMinutes = (seconds) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

    handleTime = () => {
        let audioElements = this.getAudioElements()
        let updatedSession = this.state.sessionData
        updatedSession.time = audioElements[0].currentTime
        this.setState({
            sessionData: updatedSession
        })
    }

    changeTime = async (event) => {
        let clickX = event.pageX + 1 - window.innerWidth * 0.1
        let totalX = window.innerWidth * 0.8
        let percentage = clickX / totalX
        const audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index++) {
            audioElements[index].currentTime = audioElements[0].duration * percentage
        }
        let updatedSession = this.state.sessionData
        updatedSession.time = updatedSession.duration * percentage
        this.setState({
            sessionData: updatedSession
        })
    }

    changeVolume = (index, event) => {
        const audioIndex = index + 1
        let currentValue = event.target.getAttribute('aria-valuenow')
        if (currentValue !== 'NaN' && currentValue !== null) {
            const audioElements = this.getAudioElements()
            audioElements[audioIndex].volume = currentValue / 100
        }
    }

    saveMix = () => {
        const { collabsData } = this.state
        for (let collab of collabsData) {
            axios.patch(`http://localhost:3001/collaborations/${collab.id}`, { approved: collab.approved })
        }
        this.setState({
            saved: true
        })
    }

    fileHandler = (event) => {
        this.setState({
            selectedAudio: event.target.files[0]
        })
    }

    uploadCollab = async () => {
        const data = new FormData()
        data.append('audio', this.state.selectedAudio)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let response = await axios.post('http://localhost:3001/upload', data, config)
        let location = response.data.audioUrl
        let body = {
            session_id: this.state.sessionData.id,
            collaborator_id: this.state.loggedUser,
            audio: location,
            comment: '',
            approved: false,
            volume: 80
        }
        let response2 = await axios.post('http://localhost:3001/collaborations', body)
        window.location.reload()
    }

    render(){
        return(
            <div>
                <Navigation />
                {this.state.sessionData ? 
                <div className='session'>
                    <h1>Session</h1>
                    <br/>
                    <h1>Info</h1>
                    <div className='info'>
                        <h3>Name: {this.state.sessionData.session_name}</h3>
                        <h3>Genre: {this.state.sessionData.genre}</h3>
                        <h3>Bpm: {this.state.sessionData.bpm}</h3>
                        <h3>Key: {this.state.sessionData.bpm}</h3>
                        <h3>Chord Progression: {this.state.sessionData.chord_progression}</h3>
                        <h3>Looking for: {this.state.sessionData.looking_for}</h3>
                    </div>
                    <br/>
                    <h1>Tracks</h1>
                    <button onClick={this.saveMix}>SAVE MIX</button>
                    {this.state.saved ? <h5>saved!</h5> : <></>}
                    <button onClick={this.uploadCollab}>NEW COLLAB</button>
                    <input type='file' name='audio' onChange={this.fileHandler}></input>
                    <br/>
                    <div className='tracks' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        <div style={{display:'grid', gridTemplateColumns: '110px 10px'}}>
                            <img src={this.state.sessionData.avatar} alt='' style={{borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px'}}></img>
                            <Slider orientation='vertical' style={{marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume(0, event)}></Slider>
                        </div>
                        {this.state.collabsData.map((collab, index) => {
                            if (collab.approved === true) {
                            return (
                                <div key={index} style={{display:'grid', gridTemplateColumns:'110px 10px', gridTemplateRows:'110px 30px'}}>
                                    <img onClick={() => this.muteTrack(index)} src={collab.avatar} alt='' style={{gridColumn:'1 / 2', borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px'}}></img>
                                    <button onClick={() => this.unmerge(index)} style={{gridColumn:'1 / 2', borderRadius:'10px'}}>UNMERGE</button>
                                    <Slider orientation='vertical' style={{gridRow: '1 / 2', gridColumn:'2 / 2', marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume((index), event)}></Slider>
                                </div>
                            )
                            } return true
                        })}
                    </div>
                    <br/>
                    <div className='transport'>
                        <div style={{paddingLeft:'10%', width:'90%'}}>
                            <ProgressBar now={this.state.sessionData.time} max={this.state.sessionData.duration} style={{height:'80px', fontSize:'20px'}} variant='info' label={this.secondsToMinutes(this.state.sessionData.time)} onClick={this.changeTime}></ProgressBar>
                        </div>
                        <br/>
                        <button onClick={this.playAll}>PLAY</button>
                        <button onClick={this.pauseAll}>PAUSE</button>
                        <button onClick={this.stopAll}>STOP</button>
                    </div>
                    <br/>
                    <h1>Pool</h1>
                    <div className='pool' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        {this.state.collabsData.map((collab, index) => {
                            if (collab.approved === false) {
                                return (
                                    <div key={index} style={{display:'grid', gridTemplateRows:'110px 30px'}}>
                                        <img onClick={() => this.checkPool(index)} src={collab.avatar} alt='' style={{borderRadius:'50px', borderColor:'white', width:'100px', height:'100px', margin:'5px'}}></img>
                                        <button onClick={() => this.merge(index)} style={{borderRadius: '10px'}}>MERGE</button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className='audios'>
                        <audio className='audio-element' onTimeUpdate={this.handleTime} key={-1}>
                            <source src={this.state.sessionData.audio}></source>
                        </audio>
                        {this.state.collabsData.map((collab, index) => {
                            return (
                                <audio className='audio-element' onTimeUpdate={this.handleTime} key={index}>
                                    <source src={collab.audio}></source>
                                </audio>
                            )
                        })}
                    </div>
                </div>
                : <Spinner animation='border' />}
            </div>
        )
    }
}

export default Session