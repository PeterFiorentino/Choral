import React, {Component} from 'react'
import './Reef.css'
import CollabForm from './CollabForm.jsx'
import ReefInfo from './ReefInfo.jsx'
import Slider from '@material-ui/core/Slider'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import { ProgressBar, Spinner } from 'react-bootstrap'
import { Howler, Howl } from 'howler'
import { StereoAudioRecorder } from 'recordrtc'
import axios from 'axios'

class Reef extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedUser: props.user,
            reefId: props.match.params.id,
            reefOwnerId: null,
            saved: false,
            playing: false,
            time: 0,
            timeoutIds: {}
        }
    }

    async componentDidMount() {
        await this.getData()

        this.createHowls()

        this.stopAll()

        this.updatePool()
    }

    componentWillUnmount() {
        this.stopAll()
    }

    getData = async () => {
        let reefResponse = await axios.get(`/api/reefs/${this.state.reefId}`)
        let reefData = reefResponse.data.payload.reef[0]

        let collabsResponse = await axios.get(`/api/collaborations/${this.state.reefId}`)
        let collabsData = collabsResponse.data.payload.collabs

        this.setState({
            reefData: reefData,
            collabsData: collabsData,
            isOwner: (this.state.loggedUser === reefData.owner_id),
            reefOwnerId: reefData.owner_id
        })
    }

    createHowls = () => {
        const {reefData, collabsData} = this.state
    
        let howl = new Howl({
            src: reefData.audio
        })

        let startingPoints = {}

        let newReefData = reefData
        newReefData.howl = howl
        newReefData.howl.volume(reefData.volume / 100)
        newReefData.howl.stereo(reefData.stereo_position * 2 / 100 - 1)
        newReefData.howl._html5 = true
        startingPoints[howl._src] = 0
        
        let newCollabsData = collabsData 
        collabsData.forEach((collab, index) => {
            let howl = new Howl({
                src: collab.audio
            })
            newCollabsData[index].howl = howl
            newCollabsData[index].howl.volume(collab.volume / 100)
            newCollabsData[index].howl.stereo(collab.stereo_position * 2 / 100 - 1)
            newCollabsData[index].howl._html5 = true
            startingPoints[howl._src] = collab.starting_point
        })

        this.setState({
            reefData: newReefData,
            collabsData: newCollabsData,
            startingPoints: startingPoints
        })
    }

    updatePool = () => {
        const { collabsData } = this.state

        let completeCollabsData = collabsData
        let poolTracks = false

        collabsData.forEach((collab, index) => {
            if (collab.approved === false) {
                completeCollabsData[index].filter = 'grayscale(100%)'
                completeCollabsData[index].howl._muted = true
                completeCollabsData[index].starting_point = collab.starting_point
                poolTracks = true
            }
        })

        this.setState({
            collabsData: completeCollabsData,
            poolTracks: poolTracks
        })
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
        const { reefData } = this.state
        
        await this.saveMix()

        await axios.patch(`/api/collaborations/clear_pool/${reefData.id}`)
        
        await this.getData()

        this.createHowls()

        this.updatePool()
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

        this.updatePool()
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

        this.updatePool()
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

    changeVolume = (index, event) => {
        const { reefData, collabsData } = this.state
        let currentValue = event.target.getAttribute('aria-valuenow')

        this.setState({saved: false})
        
        if (currentValue !== 'NaN' && currentValue !== null) {
            const newValue = currentValue / 100

            if (index === -1) {
                reefData.howl.volume(newValue)
            } else {
                collabsData[index].howl.volume(newValue)
            }
        }
    }

    changePanning = (index, event) => {
        const { reefData, collabsData } = this.state
        let currentValue = event.target.getAttribute('aria-valuenow')

        this.setState({saved: false})
        
        if (currentValue !== 'NaN' && currentValue !== null) {
            const newValue = currentValue * 2 / 100 - 1
            
            if (index === -1) {
                reefData.howl.stereo(newValue)           
            } else {
                collabsData[index].howl.stereo(newValue)
            }
        }
    }

    saveMix = async () => {
        const { reefData, collabsData } = this.state

        let reefBody = {
            volume: reefData.howl._volume * 100,
            stereo_position: ((reefData.howl._stereo + 1) * 100) / 2
        }
        axios.patch(`/api/reefs/${reefData.id}`, reefBody)
        
        await collabsData.forEach((collab) => {
            let collabBody = {
                approved: collab.approved,
                volume : collab.howl._volume * 100,
                stereo_position: ((collab.howl._stereo + 1) * 100) / 2
            }
            axios.patch(`/api/collaborations/${collab.id}`, collabBody)
        })
        
        this.setState({
            saved: true
        })
    }

    bounce = () => {
        const guide = this.getGuide()

        if (guide.paused && !guide.ended) {
            let recordingstream = Howler.ctx.createMediaStreamDestination()
            const options = {
                bufferSize: 1024 
            }
            let recorder = new StereoAudioRecorder(recordingstream.stream, options)
            
            Howler.masterGain.connect(recordingstream)
            
            recorder.record()
            
            this.playAll()
            
            this.setState({
                recorder: recorder,
                bouncing: true
            })

        } else if (this.state.bouncing) {
            const { recorder } = this.state
            
            recorder.stop((blob) => {
                this.setState({
                    newBounce: URL.createObjectURL(blob),
                    recorder: false,
                })
            })
            
            this.pauseAll()

            this.setState({bouncing:false})
        }
    }

    getHowls = () => {
        const { reefData, collabsData } = this.state
        let howls = []

        howls.push(reefData.howl)

        for (let collab of collabsData) {
            howls.push(collab.howl)
        }

        return howls
    }

    getGuide = () => {
        const audioElement = document.getElementsByClassName('audio-element')[0]

        return audioElement
    }

    handleTime = () => {
        const guide = this.getGuide()

        const roundedTime = Math.round(guide.currentTime)

        this.setState({
            time: roundedTime
        })
    }

    changeTime = (event) => {
        const { reefData, startingPoints } = this.state

        const guide = this.getGuide()
        const howls = this.getHowls()

        const duration = reefData.howl.duration()
        
        if (!this.state.duration) {
            this.setState({duration: duration})
        }

        let clickX = event.pageX + 0.5 - window.innerWidth * 0.10
        let totalX = window.innerWidth * 0.80

        let percentage = clickX / totalX
    
        const newPosition = Math.round(duration * percentage)
        
        guide.currentTime = newPosition
        
        if (guide.paused) {
            for (let howl of howls) {
                const startingPoint = startingPoints[howl._src]
                if (startingPoint >= newPosition) {
                    howl.seek(0)
                } else {
                    howl.seek(newPosition - startingPoint)
                }
            }
        }

        if (!guide.paused) {
            this.pauseAll()
        }

        this.setState({
            time: newPosition
        })
    }

    playAll = () => {
        const { playing, time, reefData, startingPoints, timeoutIds } = this.state
        const howls = this.getHowls()
        const guide = this.getGuide()

        if (!this.state.duration) {
            const duration = reefData.howl.duration()
            this.setState({duration: duration})
        }

        if (!guide.ended && guide.paused) {
 
            for (let howl of howls) {
                if (startingPoints[howl._src] !== 0) {
 
                const startTime = (startingPoints[howl._src] - time) * 1000

                timeoutIds[howl._src] = setTimeout(() => howl.play(), startTime)
                } else {
                    howl.play()
                }
            }

            guide.play()

            this.setState({
                timeoutIds: timeoutIds
            })
        }
    }

    pauseAll = () => {
        const { timeoutIds, startingPoints } = this.state
        const howls = this.getHowls()
        const guide = this.getGuide()
        
        guide.pause()

        const roundedTime = Math.round(guide.currentTime)

        guide.currentTime = roundedTime
        
        for (let howl of howls) {
            howl.pause()
            clearTimeout(timeoutIds[howl._src])
            const startingPoint = startingPoints[howl._src]
            if (startingPoint >= roundedTime) {
                howl.seek(0)
            } else {
                howl.seek(roundedTime - startingPoint)
            }
        }

        this.setState({
            time: roundedTime,
            timeoutIds: {}
        })
    }

    stopAll = () => {
        const { timeoutIds } = this.state
        const howls = this.getHowls()
        const guide = this.getGuide()

        guide.load()

        for (let howl of howls) {
            howl.stop()
            clearTimeout(timeoutIds[howl._src])
        }

        this.setState({
            time: 0,
            timeoutIds: {}
        })
    }

    secondsToMinutes = (seconds) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

    render(){
        return (
            <div>
                {this.state.reefData ? 
                <div className='reef'>
                    <img className='cover-art' alt='' src={this.state.reefData.art}></img>
                    <ReefInfo {...this.state.reefData}/>
                    <CollabForm {...this.state} getGuide={this.getGuide} playAll={this.playAll} pauseAll={this.pauseAll} stopAll={this.stopAll} saveMix={this.saveMix} getData={this.getData} createHowls={this.createHowls} updatePool={this.updatePool}/>
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
                                {this.state.newBounce && !this.state.bouncing ? <><a download={this.state.reefData.reef_name} href={this.state.newBounce}>DOWNLOAD</a><br/><br/></> : <br/>}
                                {!this.state.newBounce && !this.state.bouncing ? <br/> : <></>}
                            </div>
                        </div>
                        : <></>}
                        <div className='tracks-container'>
                            <div className='merged-track'>
                                <p className='left-pan'>L</p>
                                <Slider defaultValue={this.state.reefData.stereo_position} track={false} orientation='horizontal' style={{gridRow: '1 / 2', gridColumn: '2 / 3', alignSelf:'center'}} onChange={(event) => this.changePanning(-1, event)}/>
                                <p className='right-pan'>R</p>
                                <img className='track-pic' src={this.state.reefData.avatar} alt=''></img>
                                <h5 className='track-instrument'>original</h5>
                                <a id='download-reef-track' download target='_blank' rel="noopener noreferrer" href={this.state.reefData.audio}>DOWNLOAD</a>
                                <Slider defaultValue={this.state.reefData.volume} orientation='vertical' style={{gridRow: '2 / 3', gridColumn:'3 / 4', marginTop: '15px', height:'97px', justifySelf:'center'}} onChange={(event) => this.changeVolume(-1, event)}/>
                                <VolumeDownIcon style={{gridRow: '3 / 4', gridColumn: '3 / 4', color:'indigo'}}/>
                            </div>
                            {this.state.collabsData.map((collab, index) => {
                                if (collab.approved === true) {
                                    return (
                                        <div className='merged-track' key={index}>
                                            <p className='left-pan'>L</p>
                                            <Slider defaultValue={collab.stereo_position} track={false} orientation='horizontal' style={{gridRow: '1 / 2', gridColumn: '2 / 3', alignSelf:'center'}} onChange={(event) => this.changePanning(index, event)}/>
                                            <p className='right-pan'>R</p>
                                            <img className='track-pic' onClick={() => this.muteTrack(index)} src={collab.avatar} alt='' style={{filter:`${collab.filter}`}}></img>
                                            <h5 className='track-instrument'>{collab.instrument_name}</h5>
                                            {this.state.isOwner ?
                                            <button className='track-button' onClick={() => this.unmerge(index)}>UNMERGE</button>
                                            : <></>}
                                            <Slider defaultValue={collab.volume} orientation='vertical' style={{gridRow: '2 / 3', gridColumn:'3 / 4', marginTop: '15px', height:'95px', justifySelf:'center'}} onChange={(event) => this.changeVolume((index), event)}/>
                                            <VolumeDownIcon style={{gridRow: '3 / 4', gridColumn: '3 / 4', alignSelf:'end', color:'indigo', margin:'0px'}}/>
                                        </div>
                                    )
                                }   return true
                            })}
                        </div>
                    </div>
                    <div className='transport'>
                        <div className='progress-bar-container'>
                            <ProgressBar now={this.state.time} max={this.state.duration} style={{height:'5rem'}} variant='info' label={this.secondsToMinutes(this.state.time)} onClick={this.changeTime}/>
                        </div>
                        <br/>
                        <button className='round-button' onClick={this.playAll}>PLAY</button>
                        <button className='round-button' onClick={this.pauseAll}>PAUSE</button>
                        <button className='round-button' onClick={this.stopAll}>STOP</button>
                    </div>
                    <div className='audios'>
                        <audio muted={true} className='audio-element' onTimeUpdate={this.handleTime} key={-1}>
                            <source src={this.state.reefData.audio}></source>
                        </audio>
                    </div>
                </div>
                : <Spinner animation='border' />}
            </div>
        )
    }
}

export default Reef