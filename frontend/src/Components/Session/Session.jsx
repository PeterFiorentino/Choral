import React, {Component} from 'react'
import './Session.css'
import Navigation from '../Navigation/Navigation.jsx'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Slider from '@material-ui/core/Slider'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import { ProgressBar, Spinner } from 'react-bootstrap'
import { Howler, Howl } from 'howler'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedUser: props.user,
            sessionId: props.match.params.id,
            saved: false,
            playing: false,
            time: 0,
            hideInfo: false,
            collabInstrument: '',
            toggle: 'Show'
        }
    }

    async componentDidMount() {
        await this.getData()

        this.createHowls()

        setTimeout(() => this.completeState(), 500)
    }

    componentWillUnmount() {
        this.stopAll()
    }

    getData = async () => {
        let sessionResponse = await axios.get(`http://localhost:3001/api/sessions/${this.state.sessionId}`)
        let sessionData = sessionResponse.data.payload.session[0]

        let collabsResponse = await axios.get(`http://localhost:3001/api/collaborations/${this.state.sessionId}`)
        let collabsData = collabsResponse.data.payload.collabs

        this.setState({
            sessionData: sessionData,
            collabsData: collabsData,
            isOwner: (this.state.loggedUser === sessionData.owner_id)
        })
    }

    createHowls = () => {
        const {sessionData, collabsData} = this.state
    
        let howl = new Howl({
            src: sessionData.audio
        })

        let newSessionData = sessionData
        newSessionData.howl = howl
        newSessionData.howl.volume(sessionData.volume / 100)
        newSessionData.howl.stereo(sessionData.stereo_position * 2 / 100 - 1)
        newSessionData.howl._html5 = true
        
        let newCollabsData = collabsData 
        collabsData.forEach((collab, index) => {
            let howl = new Howl({
                src: collab.audio
            })
            newCollabsData[index].howl = howl
            newCollabsData[index].howl.volume(collab.volume / 100)
            newCollabsData[index].howl.stereo(collab.stereo_position * 2 / 100 - 1)
            newCollabsData[index].howl._html5 = true
        })

        this.setState({
            sessionData: newSessionData,
            collabsData: newCollabsData
        })
    }

    completeState = () => {
        const audioElement = document.getElementsByClassName('audio-element')[0]
        const { collabsData } = this.state

        let completeCollabsData = collabsData
        let poolTracks = false

        collabsData.forEach((collab, index) => {
            if (collab.approved === false) {
                completeCollabsData[index].filter = 'grayscale(100%)'
                completeCollabsData[index].howl._muted = true
                poolTracks = true
            }
        })

        this.setState({
            collabsData: completeCollabsData,
            guide: audioElement,
            duration: audioElement.duration,
            poolTracks: poolTracks
        })
    }

    getHowls = () => {
        const {sessionData, collabsData} = this.state
        let howls = []

        howls.push(sessionData.howl)
        for (let collab of collabsData) {
            howls.push(collab.howl)
        }

        return howls
    }


    playAll = () => {
        const { guide } = this.state
        const howls = this.getHowls()

        for (let howl of howls) {
            howl.play()
        }
        guide.play()
    }

    pauseAll = () => {
        const { guide } = this.state
        const howls = this.getHowls()
        
        guide.pause()
        for (let howl of howls) {
            howl.pause()
        }
    }

    stopAll = () => {
        const { guide } = this.state
        const howls = this.getHowls()
        
        guide.load()
        for (let howl of howls) {
            howl.stop()
        }

        this.setState({
            time: 0
        })
    }

    muteTrack = (index) => {
        const {collabsData} = this.state
        let collab = collabsData[index]

        if (collab.howl._muted === false) {
            collab.howl.mute(true)

            let updatedCollabs = collabsData
            updatedCollabs[index].filter = 'grayscale(100%)' 
            
            this.setState({
                collabsData: updatedCollabs
            })

        } else {
            collab.howl.mute(false)
            
            let updatedCollabs = collabsData
            updatedCollabs[index].filter = 'grayscale(0%)'

            this.setState({
                collabsData: updatedCollabs
            })
        }
    }

    checkPool = (index) => {
        const {collabsData} = this.state
    
        collabsData.forEach((collab, i) => {
            if (collab.checking === true && i !== index) {
                collab.howl.mute(true)
                
                let updatedCollabs = collabsData
                updatedCollabs[i].filter = 'grayscale(100%)'
                updatedCollabs[i].checking = false

                this.setState({
                    collabsData: updatedCollabs
                })
            }
        })

        let collab = collabsData[index]

        if (collab.howl._muted === true) {
            collab.howl.mute(false)

            let updatedCollabs = this.state.collabsData
            updatedCollabs[index].filter = 'grayscale(0%)'
            updatedCollabs[index].checking = true

            this.setState({
                collabsData: updatedCollabs
            })

        } else if (collab.howl._muted === false) {
            collab.howl.mute(true)

            let updatedCollabs = this.state.collabsData
            updatedCollabs[index].filter = 'grayscale(100%)'
            updatedCollabs[index].checking = false

            this.setState({
                collabsData: updatedCollabs
            })
        }
    }

    clearPool = async () => {
        const { sessionData } = this.state
        
        await this.saveMix()

        await axios.patch(`http://localhost:3001/api/collaborations/clear_pool/${sessionData.id}`)
        
        await this.getData()

        this.createHowls()

        this.completeState()
    }

    merge = (index) => {
        const { collabsData } = this.state
        
        this.setState({saved:false})

        let updatedCollabs = collabsData
        updatedCollabs[index].checking = false
        updatedCollabs[index].approved = true

        this.setState({
            collabsData: updatedCollabs,
            saved: false
        })

        this.completeState()
    }

    unmerge = (index) => {
        const { collabsData } = this.state
        
        this.setState({saved:false})

        collabsData[index].howl.mute(true)
        let updatedCollabs = collabsData
        updatedCollabs[index].approved = false
        updatedCollabs[index].filter = 'grayscale(100%)'
        
        this.setState({
            collabsData: updatedCollabs,
            saved: false
        })

        this.completeState()
    }

    secondsToMinutes = (seconds) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

    handleTime = () => {
        const { guide } = this.state

        let currentTime = guide.currentTime

        this.setState({
            time: currentTime
        })
    }

    changeTime = (event) => {
        const { duration, guide } = this.state

        let clickX = event.pageX + 0.5 - window.innerWidth * 0.10
        let totalX = window.innerWidth * 0.80

        let percentage = clickX / totalX
    
        const newPosition = duration * percentage

        guide.currentTime = newPosition
 
        const howls = this.getHowls()
        for (let howl of howls) {
            howl.seek(newPosition)
        }
    
        this.setState({
            time: newPosition
        })
    }

    changeVolume = (index, event) => {
        const { sessionData, collabsData } = this.state
        let currentValue = event.target.getAttribute('aria-valuenow')

        this.setState({saved: false})
        
        if (currentValue !== 'NaN' && currentValue !== null) {
            const newValue = currentValue / 100

            if (index === -1) {
            sessionData.howl.volume(newValue)
            } else {
                collabsData[index].howl.volume(newValue)
            }
        }
    }

    changePanning = (index, event) => {
        const { sessionData, collabsData } = this.state
        let currentValue = event.target.getAttribute('aria-valuenow')

        this.setState({saved: false})
        
        if (currentValue !== 'NaN' && currentValue !== null) {
            const newValue = currentValue * 2 / 100 - 1
            
            if (index === -1) {
                sessionData.howl.stereo(newValue)           
            } else {
                collabsData[index].howl.stereo(newValue)
            }
        }
    }

    saveMix = async () => {
        const { collabsData, sessionData } = this.state

        let sessionBody = {
            volume: sessionData.howl._volume * 100,
            stereo_position: ((sessionData.howl._stereo + 1) * 100) / 2
        }
        axios.patch(`http://localhost:3001/api/sessions/${sessionData.id}`, sessionBody)
        
        await collabsData.forEach((collab) => {
            let collabBody = {
                approved: collab.approved,
                volume : collab.howl._volume * 100,
                stereo_position: ((collab.howl._stereo + 1) * 100) / 2
            }
            axios.patch(`http://localhost:3001/api/collaborations/${collab.id}`, collabBody)
        })
        
        this.setState({
            saved: true
        })
    }

    fileHandler = (event) => {
        this.setState({
            selectedAudio: event.target.files[0]
        })
    }

    uploadCollab = async (event) => {
        event.preventDefault()

        const data = new FormData()
        data.append('audio', this.state.selectedAudio)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        let response = await axios.post('http://localhost:3001/upload/audio', data, config)
        
        let body = {
            session_id: this.state.sessionData.id,
            collaborator_id: this.state.loggedUser,
            audio: response.data.audioUrl,
            instrument_name: this.state.collabInstrument,
            approved: false,
            volume: 80,
            stereo_position: 50
        }
        
        await axios.post('http://localhost:3001/api/collaborations', body)
        
        this.setState({
            added: true
        })

        if (this.state.isOwner) {
            await this.saveMix()

            await this.getData()

            this.createHowls()

            this.completeState()

            setTimeout(() => this.setState({added: false}), 1500)
        }
    }

    bounce = () => {
        const { guide } = this.state

        if (guide.paused && !guide.ended) {
            let recordingstream = Howler.ctx.createMediaStreamDestination()
            const options = {
                audioBitsPerSecond: 128000,
                mimeType: 'audio/webm'
            }
            let recorder = new MediaRecorder(recordingstream.stream, options)
            
            Howler.masterGain.connect(recordingstream)
            
            recorder.start()
            
            this.playAll()
            
            recorder.addEventListener('dataavailable', (e) => {
                this.setState({
                    newBounce: URL.createObjectURL(e.data)
                })
                recorder = false
                recordingstream = false
            })
            
            this.setState({
                recorder: recorder,
                bouncing: true
            })

        } else {
            const { recorder } = this.state
            
            recorder.stop()
            
            this.pauseAll()

            this.setState({bouncing:false})
        }
    }

    record = async () => {
        const { guide } = this.state

        if (guide.paused && !guide.ended) {
            let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
            let recorder = new MediaRecorder(stream)
            
            recorder.start()
            
            this.playAll()
            
            recorder.addEventListener('dataavailable', (e) => {
                this.setState({
                    newCollab: URL.createObjectURL(e.data),
                })
                recorder = false
                stream = false
            })
            
            this.setState({
                recorder: recorder,
                recording: true
            })

        } else {
            const { recorder } = this.state
            
            recorder.stop()
            
            this.pauseAll()

            this.setState({recording:false})
        }
    }

    toggleInfo = () => {
        if (this.state.toggle === 'Show') {
            this.setState({
                hideInfo: !this.state.hideInfo,
                toggle: 'Hide'
            })
        } else {
            this.setState({
                hideInfo: !this.state.hideInfo,
                toggle: 'Show'
            })
        }
    }

    handleInstrument = (event) => {
        this.setState({
            collabInstrument: event.target.value
        })
    }

    render(){
        let specificInfo = this.state.hideInfo ? (
            <div className='specific-info'>
                <div id='genre'>
                    <label htmlFor='genre'><b>Genre</b></label>
                    <p name='genre'>{this.state.sessionData.genre}</p>
                </div>
                <p id='bpm'><b>{this.state.sessionData.bpm} BPM</b></p>
                <div id='key'>
                    <label htmlFor='key'><b>Key</b></label>
                    <p name='key'>{this.state.sessionData.session_key}</p>
                </div>
                <div id='chords'>
                    <label htmlFor='chords'><b>Chord Progression</b></label>
                    <p name='chords'>{this.state.sessionData.chord_progression}</p>
                </div>
            </div>
        ): <> </>

        return (
            <div>
                <Navigation />
                {this.state.sessionData ? 
                <div className='session'>
                    <img className='cover-art' src={this.state.sessionData.art}></img>
                    <div className='info'>
                        <h2>{this.state.sessionData.session_name}</h2>
                        <h3>by <Link to={`/profile/${this.state.sessionData.owner_id}`}><h3 id='profile-link'>{this.state.sessionData.username}</h3></Link></h3>
                        <h5 id='looking-for'>Looking for {this.state.sessionData.looking_for}</h5>
                        <div id='specific-info'>
                            {specificInfo}
                            <p onClick={this.toggleInfo}>{this.state.toggle} Info</p>
                        </div>
                    </div>
                    <div className='collaborate'>
                        <h3>Collaborate</h3>
                        <div className='collab-actions'>
                            <div className='record'>
                                <button className='round-button' onClick={this.record}>RECORD LIVE</button>
                                {this.state.recording ? <h5>recording...</h5> : <><h5>{' '}</h5></>}
                                {this.state.newCollab && !this.state.recording ? <><a download='newcollab' href={this.state.newCollab}>DOWNLOAD</a><br/><br/></> : <br/>}
                                {!this.state.newCollab && !this.state.recording ? <br/> : <></>}
                            </div>
                            <form onSubmit={this.uploadCollab}>
                                <div className='file-input'>
                                    <input required type='file' name='audio' accept='audio/*' onChange={this.fileHandler}></input>
                                </div>
                                <FormControl>
                                    <InputLabel htmlFor='instrument'>instrument</InputLabel>
                                    <Input required type='text' name='instrument' onChange={this.handleInstrument}></Input>
                                </FormControl>
                                <br/><br/>
                                <div className='upload'>
                                    <button className='round-button'>UPLOAD</button><br/>
                                    {this.state.added ? <h5>added!</h5> : <><h5>{' '}</h5><br/></>}
                                </div>
                            </form>
                        </div>
                    </div>
                    {this.state.isOwner && this.state.poolTracks ?
                    <div className='pool'>
                        <h3>Pool</h3>
                        <button className='round-button' onClick={this.clearPool}>CLEAR POOL</button>
                        <br/><br/>
                        <div className='tracks-container'>
                            {this.state.collabsData.map((collab, index) => {
                                if (collab.approved === false) {
                                    return (
                                        <div className='pool-track' key={index} style={{}}>
                                            <img className='pool-pic' onClick={() => this.checkPool(index)} src={collab.avatar} alt='' style={{filter:`${collab.filter}`}}></img>
                                            <h5 className='pool-instrument'>{collab.instrument_name}</h5>
                                            <button className='pool-button' onClick={() => this.merge(index)}>MERGE</button>
                                        </div>
                                    )
                                }
                                return true
                            })}
                        </div>
                    </div>
                    : <></>}
                    <div className='tracks'>
                        <h3>Tracks</h3>
                        {this.state.isOwner ?
                        <div className='mix-actions'>
                            <div className='save-mix'>
                                <button className='round-button' onClick={this.saveMix}>SAVE MIX</button>
                                {this.state.saved ? <h5>saved</h5> : <><h5>{' '}</h5><br/></>}
                            </div>
                            <div className='bounce'>
                                <button className='round-button' onClick={this.bounce}>BOUNCE</button><br/>
                                {this.state.bouncing ? <h5>bouncing...</h5> : <><h5>{' '}</h5></>}
                                {this.state.newBounce && !this.state.bouncing ? <><a download href={this.state.newBounce}>DOWNLOAD</a><br/><br/></> : <br/>}
                                {!this.state.newBounce && !this.state.bouncing ? <br/> : <></>}
                            </div>
                        </div>
                        : <></>}
                        <div className='tracks-container'>
                            <div className='merged-track'>
                                <p className='left-pan'>L</p>
                                <Slider defaultValue={this.state.sessionData.stereo_position} track={false} orientation='horizontal' style={{gridRow: '1 / 2', gridColumn: '2 / 3'}} onChange={(event) => this.changePanning(-1, event)}></Slider>
                                <p className='right-pan'>R</p>
                                <img className='track-pic' src={this.state.sessionData.avatar} alt=''></img>
                                <h5 className='track-instrument'>original</h5>
                                <a id='download-session-track' download href={this.state.sessionData.audio}>DOWNLOAD</a>
                                <Slider defaultValue={this.state.sessionData.volume} orientation='vertical' style={{gridRow: '2 / 3', gridColumn:'3 / 4', marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume(-1, event)}></Slider>
                                <VolumeDownIcon style={{gridRow: '3 / 4', gridColumn: '3 / 4', color:'indigo'}}/>
                            </div>
                            {this.state.collabsData.map((collab, index) => {
                                if (collab.approved === true) {
                                    return (
                                        <div className='merged-track' key={index}>
                                            <p className='left-pan'>L</p>
                                            <Slider defaultValue={collab.stereo_position} track={false} orientation='horizontal' style={{gridRow: '1 / 2', gridColumn: '2 / 3'}} onChange={(event) => this.changePanning(index, event)}></Slider>
                                            <p className='right-pan'>R</p>
                                            <img className='track-pic' onClick={() => this.muteTrack(index)} src={collab.avatar} alt='' style={{filter:`${collab.filter}`}}></img>
                                            <h5 className='track-instrument'>{collab.instrument_name}</h5>
                                            {this.state.isOwner ?
                                            <button className='track-button' onClick={() => this.unmerge(index)}>UNMERGE</button>
                                            : <></>}
                                            <Slider defaultValue={collab.volume} orientation='vertical' style={{gridRow: '2 / 3', gridColumn:'3 / 4', marginTop: '15px', height:'85px'}} onChange={(event) => this.changeVolume((index), event)}></Slider>
                                            <VolumeDownIcon style={{gridRow: '3 / 4', gridColumn: '3 / 4', color:'indigo'}}/>
                                        </div>
                                    )
                                } return true
                            })}
                        </div>
                    </div>
                    <div className='transport'>
                        <div className='progress-bar-container'>
                            <ProgressBar now={this.state.time} max={this.state.duration} style={{height:'5rem'}} variant='info' label={this.secondsToMinutes(this.state.time)} onClick={this.changeTime}></ProgressBar>
                        </div>
                        <br/>
                        <button className='round-button' onClick={this.playAll}>PLAY</button>
                        <button className='round-button' onClick={this.pauseAll}>PAUSE</button>
                        <button className='round-button' onClick={this.stopAll}>STOP</button>
                    </div>
                    <div className='audios'>
                        <audio crossOrigin='anonymous' muted={true} className='audio-element' onTimeUpdate={this.handleTime} key={-1}>
                            <source src={this.state.sessionData.audio}></source>
                        </audio>
                    </div>
                </div>
                : <Spinner animation='border' />}
            </div>
        )
    }
}

export default Session