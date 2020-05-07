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
            volume: 80
        }
        console.log(body)
        let response = await axios.post('http://localhost:3001/sessions', body)
        console.log(response)
        //window.location.reload()
    }

    render() {
        return (
            <>
            <Navigation />
            <h1>Add New Session</h1>
            <div className='form'>
                <label for='session_name'>Name:</label>
                <input onChange={this.inputHandler} type='text' name='session_name'></input><br/>
                <label for='genre'>Genre:</label>
                <input onChange={this.inputHandler} type='text' name='genre'></input><br/>
                <label for='bpm'>BPM:</label>
                <input onChange={this.inputHandler} type='number' name='bpm'></input><br/>
                <label for='session_key'>Key:</label>
                <input onChange={this.inputHandler} type='text' name='session_key'></input><br/>
                <label for='chord_progression'>Chord Progression:</label>
                <input onChange={this.inputHandler} type='text' name='chord_progression'></input><br/>
                <label for='looking_for'>Looking for:</label>
                <input onChange={this.inputHandler} type='text' name='looking_for'></input><br/>
                <label for='image'>Cover Art:</label>
                <input onChange={this.fileHandler} type='file' name='image'></input><br/>
                <label for='audio'>Audio:</label>
                <input onChange={this.fileHandler} type='file' name='audio'></input><br/>
                <button onClick={this.uploadSession}>ADD</button>
            </div>
            </>
        )
    }
}

export default AddSession