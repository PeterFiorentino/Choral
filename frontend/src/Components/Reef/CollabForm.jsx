import React, {Component} from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import axios from 'axios'

class CollabForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploading: false,
            added: false,
            collabInstrument: '',
            collabTime: 0
        }
    }

    record = async () => {
        const guide = this.props.getGuide()

        if (guide.paused && !guide.ended) {
            let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
            let recorder = new MediaRecorder(stream)
            
            const collabTime = this.props.time
            
            recorder.start()
            
            this.props.playAll()
            
            recorder.addEventListener('dataavailable', (e) => {
                this.setState({
                    newCollab: URL.createObjectURL(e.data),
                })
                recorder = false
                stream = false
            })
            
            this.setState({
                recorder: recorder,
                recording: true,
                collabTime: collabTime
            })

        } else {
            const { recorder } = this.state
            
            recorder.stop()
            
            this.props.pauseAll()

            this.setState({
                recording:false
            })
        }
    }

    fileHandler = (event) => {
        this.setState({
            selectedAudio: event.target.files[0]
        })
    }

    handleInstrument = (event) => {
        this.setState({
            collabInstrument: event.target.value
        })
    }

    uploadCollab = async (event) => {
        event.preventDefault()

        this.setState({
            uploading: true
        })

        const data = new FormData()
        data.append('audio', this.state.selectedAudio)
  
        let response = await axios.post('/upload/audio', data)

        let body = {
            collaborator_id: this.props.loggedUser,
            reef_id: parseInt(this.props.reefId),
            reef_owner_id: this.props.reef_owner_id,
            audio: response.data.fileLocation,
            instrument_name: this.state.collabInstrument,
            approved: false,
            volume: 80,
            stereo_position: 50,
            is_deleted: false,
            starting_point: this.state.collabTime
        }

        await axios.post('/api/collaborations', body)

        this.setState({
            uploading: false,
            added: true
        })

        this.props.stopAll()

        if (this.state.isOwner) {
            await this.props.saveMix()

            await this.props.getData()

            this.props.createHowls()

            this.props.updatePool()

            setTimeout(() => this.setState({added: false}), 1500)
        }
    }

    render() {
        return (
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
                            <input required type='file' name='audio' accept='audio/*, video/mp4' onChange={this.fileHandler}></input>
                        </div>
                        <FormControl>
                            <InputLabel htmlFor='instrument'>instrument</InputLabel>
                            <Input required type='text' name='instrument' onChange={this.handleInstrument}></Input>
                        </FormControl>
                        <br/><br/>
                        <div className='upload'>
                            <button className='round-button'>UPLOAD</button><br/>
                            {this.state.uploading ? <h5 style={{padding:'0px'}}>uploading...</h5> : <></>}
                            {this.state.added ? <h5 style={{padding:'0px'}}>added!</h5> : <></>}
                            {!this.state.uploading && !this.state.added ? <><h5>{' '}</h5><br/></> : <></>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CollabForm