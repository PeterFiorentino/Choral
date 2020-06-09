import React, { useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import './Post.css'

const Post = (props) => {
    const [ time, setTime ] = useState(0)
    let history = useHistory()

    const getAudioElements = () => {
        return document.getElementsByName(`reef${props.reef.id}`)
    }

    const setVolumes = () => {
        let audioElements = getAudioElements()
        // audioElements.forEach((audio, index) => {
        //     if (index === 0) {
                audioElements[0].volume = props.reef.volume / 100
        //     } else {
        //         let collabIndex = index - 1
        //         audio.volume = props.session.collaborations[collabIndex].volume / 100
        //     }
        // })
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
            // for (let index = 0; index < audioElements.length; index ++) {
                audioElements[0].play()
            // }
        } else {
            // for (let index = 0; index < audioElements.length; index ++) {
                audioElements[0].load()
                setTime(0)
            // }
        }
    }
 
    const goToReef = (id) => {
        history.push(`/reef/${id}`)
    }

    const deleteReef = async () => {
        if (window.confirm('Are you sure that you want to delete this Reef?')) {
            await axios.patch(`http://localhost:3001/api/reefs/delete/${props.reef.id}`)
            window.location.reload()
        }
    }

    return (
        <>
        <div className='post'>
            <img onClick={() => goToReef(props.reef.id)} className='owner' src={props.reef.art} alt=''></img>
            <button className='round-button' id='control' onClick={preview}>PREVIEW</button>
            <div id='info-link'>
                <Link to={`/reef/${props.reef.id}`}><p className='link-content'>{`${props.reef.reef_name} `}</p></Link>
                <p className='link-content'>by </p>
                <Link to={`/profile/${props.reef.owner_id}`}><p className='link-content'>{props.reef.username}</p></Link>
                <p className='looking-for'>{' looking for ' + props.reef.looking_for}</p>
            </div>
            {props.canDelete ?
            <button className='delete-button' onClick={deleteReef}>X</button>
            : <></>}
            <ProgressBar now={time} max='45' variant='info' style={{width: '100%', height:'4em', gridRow: '2 / 3', gridColumn:'3 / 4', alignSelf: 'center'}}></ProgressBar>
            <div className='collaborators'>
                {props.reef.collaborations.map((collaboration) => {
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
            <audio className='audio-element' name={`reef${props.reef.id}`} volume={props.reef.volume / 100} onTimeUpdate={handleTime}>
                <source src={props.reef.audio}></source>
            </audio>
            {/* {props.session.collaborations.map((collaboration) => {
                if (collaboration.approved) {
                    return (   
                        <audio className='audio-element' name={`session${props.session.id}`} volume={collaboration.volume / 100} key={collaboration.id}>
                            <source src={collaboration.audio}></source>
                        </audio>
                    )
                }
                return true 
            })} */}
        </div>
        </>
    )
}

export default Post