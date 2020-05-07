import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Post.css'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             time: 0
        }
    }

    getAudioElements = () => {
        return document.getElementsByName(`session${this.props.session.id}`)
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
 
    goToSession = () => {
        window.location.href = `http://localhost:3000/session/${this.props.session.id}`
    }

    render() {
        return (
            <>
            <div className='post'>
                <img onClick={this.goToSession} className='owner' src={this.props.session.art} alt=''></img>
                <button className='control' onClick={this.preview}>PREVIEW</button>
                <ProgressBar now={this.state.time} max='45' variant='info' style={{width: '100%', height:'5rem', gridRow: '1 / 2', gridColumn:'3 / 4', alignSelf: 'center'}}></ProgressBar>
                <div className='collaborators'>
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
            </div>
            <div className='audios'>
                <audio className='audio-element' name={`session${this.props.session.id}`} volume={this.props.session.volume / 100} onTimeUpdate={this.handleTime}>
                    <source src={this.props.session.audio}></source>
                </audio>
                {this.props.session.collaborations.map((collaboration) => {
                    if (collaboration.approved) {
                        return (   
                            <audio className='audio-element' name={`session${this.props.session.id}`} volume={collaboration.volume / 100} key={collaboration.id}>
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