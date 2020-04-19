import React from 'react'
import { ProgressBar } from 'react-bootstrap'

class Post extends React.Component {
    constructor(props) {
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
    }

    preview = () => {
        let audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index ++) {
            audioElements[index].play()
        }
        if (audioElements[0].currentTime <= 45) {
            this.stop()
        }
    }

    stop = () => {
        let audioElements = this.getAudioElements()
        for (let index = 0; index < audioElements.length; index ++) {
            audioElements[index].load()
        }
    }

    render() {
        return (
            <div className='post'>
                <img className='owner' src={this.props.session.avatar}></img>
                <button onClick={() => this.preview}>PREVIEW</button>
                <button onClick={() => this.stop}>STOP</button>
                <ProgressBar now={this.state.time} max='45'></ProgressBar>
                {this.props.collaborations.map((collaboration) => {
                    if (collaboration.approved) {
                        return (
                            <img className='merged-collaborator' src={collaboration.avatar} alt='' key={collaboration.id}></img>
                        )
                    } else {
                        return (
                            <img className='unmerged-collaborator' src={collabotation.avatar} alt='' key={collaboration.id}></img>
                        )
                    }
                })}
            </div>
            <div className='audios'>
                <audio className='audio-element' volume={this.props.session.volume} onTimeUpdate={this.handleTime}>
                    <source src={this.props.session.audio}></source>
                </audio>
                {this.props.collaborations.map((collaboration) => {
                    if (collaboration.approved) {
                        return (
                            <audio className='audio-element' volume={collaboration.volume} key={collaboration.id}>
                                <source src={collaboration.audio}></source>
                            </audio>
                        )
                    }
                })}
            </div>
        )
    }
}