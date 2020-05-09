import React from 'react'
import axios from 'axios'
import Navigation from '../Navigation/Navigation.jsx'
import './AddSession.css'

class AddSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: props.user
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    fileHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }

    uploadSession = async () => {
        const audioData = new FormData()
        const imageData = new FormData()

        audioData.append('audio', this.state.audio)
        imageData.append('image', this.state.image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        let audioResponse = await axios.post('http://localhost:3001/upload/audio', audioData, config)
        let audioLocation = audioResponse.data.audioUrl

        let imageResponse = await axios.post('http://localhost:3001/upload/image', imageData, config)
        let imageLocation = imageResponse.data.imageUrl

        let body = {
            owner_id: this.state.loggedUser,
            session_name: this.state.session_name,
            genre: this.state.genre,
            bpm: this.state.bpm,
            session_key: this.state.session_key,
            chord_progression: this.state.chord_progression,
            looking_for: this.state.looking_for,
            audio: audioLocation,
            art: imageLocation,
            session_closed: false,
            volume: 80,
            stereo_position: 50
        }
    
        let response = await axios.post('http://localhost:3001/sessions', body)
        console.log(response)

        this.setState({
            added: true
        })
        setTimeout(() => window.location.reload(), 1500)
    }

    record = async () => {
        if (!this.state.recorder) {
            let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
            let recorder = new MediaRecorder(stream)

            recorder.start()
            recorder.addEventListener('dataavailable', (e) => {
                this.setState({
                    newSession: URL.createObjectURL(e.data),
                    audio: URL.createObjectURL(e.data)
                })
                recorder = false
                stream = false
            })

            this.setState({
                recorder: recorder,
                recording: true
            })
            
        } else if (this.state.recording) {
            const { recorder } = this.state

            recorder.stop()

            this.setState({
                recording: false
            })
        }
    }

    render() {
        return (
            <>
            <Navigation />
            <h1>Add New Session</h1>
            <div className='form' style={{width:'100%'}}>
                <label htmlFor='session_name'>Name:</label>
                <input onChange={this.inputHandler} type='text' name='session_name'></input><br/>
                <label htmlFor='genre'>Genre:</label>
                <input onChange={this.inputHandler} type='text' name='genre'></input><br/>
                <label htmlFor='bpm'>BPM:</label>
                <input onChange={this.inputHandler} type='number' name='bpm'></input><br/>
                <label htmlFor='session_key'>Key:</label>
                <input onChange={this.inputHandler} type='text' name='session_key'></input><br/>
                <label htmlFor='chord_progression'>Chord Progression:</label>
                <input onChange={this.inputHandler} type='text' name='chord_progression'></input><br/>
                <label htmlFor='looking_for'>Looking for:</label>
                <input onChange={this.inputHandler} type='text' name='looking_for'></input><br/>
                <br/>
                <button onClick={this.record}>RECORD AUDIO</button><br/>
                {this.state.newSession ? <a download href={this.state.newSession}>DOWNLOAD</a> : <></>}<br/>
                <br/>
                <label htmlFor='image'>Cover Art</label><br/>
                <input onChange={this.fileHandler} type='file' name='image'></input><br/>
                <br/>
                <label htmlFor='audio'>Audio Upload</label><br/>
                <input onChange={this.fileHandler} type='file' name='audio'></input><br/>
                <br/>
                <button onClick={this.uploadSession}>ADD SESSION</button>
                {this.state.added ? <h5>Added!</h5> : <></>}
            </div>
            </>
        )
    }
}

export default AddSession