import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import './Post.css'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             time: 0
        }
    }

    getAudioElements = () => {
        return document.getElementsByClassName('audio-element')
    }

    handleTime = () => {
        let audioElements = this.getAudioElements()
        this.setState({
            time: audioElements[0].currentTime
        })
        if (audioElements[0].currentTime >= 45) {
            this.preview()
        }
    }

    preview = () => {
        let audioElements = this.getAudioElements()
        if (audioElements[0].currentTime === 0) { 
            for (let index = 0; index < audioElements.length; index ++) {
                audioElements[index].play()
            }
        } else {
            for (let index = 0; index < audioElements.length; index ++) {
                audioElements[index].load()
            }
        }
    }

    render() {
        return (
            <>
            <div className='post'>
                <img className='owner' src={session.avatar} alt=''></img>
                <button className='control' onClick={this.preview}>PREVIEW</button>
                <ProgressBar now={this.state.time} max='45' variant='info' style={{width: '100%', height:'5rem', gridRow: '1 / 2', gridColumn:'3 / 4', alignSelf: 'center'}}></ProgressBar>
                {this.props.session.collaborations.map((collaboration) => {
                    if (collaboration.approved) {
                        return (
                            <img className='merged-collaborator' src={collaboration.avatar} alt='' key={collaboration.id}></img>
                        )
                    } else {
                        return (
                            <img className='unmerged-collaborator' src={collaboration.avatar} alt='' key={collaboration.id}></img>
                        )
                    }
                })}
            </div>
            <div className='audios'>
                <audio className='audio-element' volume={this.props.session.volume} onTimeUpdate={this.handleTime}>
                    <source src={this.props.session.audio}></source>
                </audio>
                {this.props.session.collaborations.map((collaboration) => {
                    if (collaboration.approved) {
                        return (   
                            <audio className='audio-element' volume={collaboration.volume} key={collaboration.id}>
                                <source src={collaboration.audio}></source>
                            </audio>
                        )
                    }
                })}
            </div>
            </>
        )
    }
}

export default Post