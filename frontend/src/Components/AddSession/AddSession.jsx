import React from 'react'
import axios from 'axios'
import Navigation from '../Navigation/Navigation.jsx'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
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

    uploadSession = async (event) => {
        event.preventDefault()

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
    
        let response = await axios.post('http://localhost:3001/api/sessions', body)

        this.setState({
            added: true
        })

        setTimeout(() => window.location.href = `http://localhost:3000/profile/${this.state.loggedUser}`, 1500)
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
            {/* <h1 className='main-title'>Choral</h1> */}
            <h3 id='new-reef'>New Reef</h3>
            <div className='form' style={{width:'100%'}}>
                <form className='form' onSubmit={this.uploadSession}>
                    <FormControl style={{width:'70%'}}>
                        <InputLabel htmlFor='session_name'>Name</InputLabel>
                        <Input required onChange={this.inputHandler} type='text' name='session_name'></Input><br/>
                    </FormControl>
                    <FormControl style={{width:'36%', marginLeft:'2%', marginRight:'2%'}}>
                        <InputLabel htmlFor='genre'>Genre</InputLabel>
                        <Input onChange={this.inputHandler} type='text' name='genre'></Input><br/>
                    </FormControl>
                    <FormControl style={{width:'10%', marginLeft:'2%', marginRight:'2%'}}>
                        <InputLabel htmlFor='bpm'>BPM</InputLabel>
                        <Input onChange={this.inputHandler} type='number' name='bpm'></Input><br/>
                    </FormControl>
                    <FormControl style={{width:'16%', marginLeft:'2%', marginRight:'2%'}}>
                        <InputLabel htmlFor='session_key'>Key</InputLabel>
                        <Input onChange={this.inputHandler} type='text' name='session_key'></Input><br/>
                    </FormControl>
                    <FormControl style={{width:'70%'}}>
                        <InputLabel htmlFor='chord_progression'>Chord Progression</InputLabel>
                        <Input onChange={this.inputHandler} type='text' name='chord_progression'></Input><br/>
                    </FormControl>
                    <FormControl style={{width:'50%'}}>
                        <InputLabel htmlFor='looking_for'>Looking for</InputLabel>
                        <Input required onChange={this.inputHandler} type='text' name='looking_for'></Input><br/>
                    </FormControl>
                    <br/>
                    <button className='round-button' type='button' onClick={this.record}>RECORD LIVE</button><br/>
                    {this.state.recording ? <h5>recording...</h5> : <><h5>{' '}</h5></>}
                    {this.state.newSession ? <><a download='newsession' href={this.state.newSession}>DOWNLOAD</a><br/></> : <></>}
                    {!this.state.newSession && !this.state.recording ? <br/> : <></>}
                    <br/>
                    <InputLabel htmlFor='audio'>Upload Audio</InputLabel>
                    <input required onChange={this.fileHandler} type='file' name='audio' accept='audio/*'></input><br/>
                    <br/>
                    <InputLabel htmlFor='image'>Cover Art</InputLabel>
                    <input required onChange={this.fileHandler} type='file' name='image' accept='image/*'></input><br/>
                    <br/>
                    <button className='round-button' type='submit'>ADD REEF</button>
                    {this.state.added ? <h5>Added!</h5> : <></>}
                </form>
            </div>
            <br/>
            </>
        )
    }
}

export default AddSession