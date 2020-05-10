import React, { useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import './Post.css'

const Post = (props) => {
    const [ time, setTime ] = useState(0)
    let history = useHistory()

    const getAudioElements = () => {
        return document.getElementsByName(`session${props.session.id}`)
    }

    const setVolumes = () => {
        let audioElements = getAudioElements()
        audioElements.forEach((audio, index) => {
            if (index === 0) {
                audio.volume = props.session.volume / 100
            } else {
                let collabIndex = index - 1
                audio.volume = props.session.collaborations[collabIndex].volume / 100
            }
        })
    }

    const handleTime = () => {
        let audioElements = getAudioElements()
        setTime(audioElements[0].currentTime)
        if (audioElements[0].currentTime >= 45) {
            preview()
        }
    }

    const preview = () => {
        let audioElements = getAudioElements()
        setVolumes()
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
 
    const goToSession = (id) => {
        history.push(`/session/${id}`)
    }

    return (
        <>
        <div className='post'>
            <img onClick={() => goToSession(props.session.id)} className='owner' src={props.session.art} alt=''></img>
            <button className='control' onClick={preview}>PREVIEW</button>
            <div id='info-link'>
                <Link to={`session/${props.session.id}`}><p className='link-content'>{`${props.session.session_name} `}</p></Link>
                <p className='link-content'>by </p>
                <Link to={`/profile/${props.session.owner_id}`}><p className='link-content'>{props.session.owner_id}</p></Link>
            </div>
            <ProgressBar now={time} max='45' variant='info' style={{width: '100%', height:'3.5rem', gridRow: '2 / 3', gridColumn:'3 / 4', alignSelf: 'center'}}></ProgressBar>
            <div className='collaborators'>
                {props.session.collaborations.map((collaboration) => {
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
            <audio className='audio-element' name={`session${props.session.id}`} volume={props.session.volume / 100} onTimeUpdate={handleTime}>
                <source src={props.session.audio}></source>
            </audio>
            {props.session.collaborations.map((collaboration) => {
                if (collaboration.approved) {
                    return (   
                        <audio className='audio-element' name={`session${props.session.id}`} volume={collaboration.volume / 100} key={collaboration.id}>
                            <source src={collaboration.audio}></source>
                        </audio>
                    )
                }
                return true 
            })}
        </div>
        </>
    )
}

export default Post