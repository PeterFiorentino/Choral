import React from 'react'

const ProfileCard = (props) => {
    if(props.displayInfo && !props.editInfo){
        return (       
            <div className='user-card-info'>
                <p id='username'><b>{props.displayedUser.username}</b></p>
                <p id='contact'><b>{props.displayedUser.email}</b></p> 

                <label className='location-info' htmlFor='location'><b>Based In</b></label>
                <p className='location-info' id='location'>{props.displayedUser.location}</p> 

                <label className='instrument-info' htmlFor='instrument'><b>Instrument</b></label>
                <p className='instrument-info' id='instrument'>{props.displayedUser.instrument}</p>

                <label className='style-info' htmlFor='style'><b>Style</b></label>
                <p className='style-info' id='style'>{props.displayedUser.fav_genre}</p>

                <label className='anthem-info' htmlFor='anthem'><b>Anthem</b></label>
                <p className='anthem-info' id='anthem'>{props.displayedUser.anthem}</p>

                <p className='collapse-info' onClick={props.toggleInfo}>Hide Info</p>

                {props.isOwner ? <button className='edit-button' onClick={props.toggleEditInfo}>edit</button> : <></>}
            </div>
        )
    } else if (props.displayInfo && props.editInfo) {
        return (
            <div className='user-card-info'>
                <p id='username'><b>{props.displayedUser.username}</b></p>
                <input type='text' id='contact' defaultValue={props.displayedUser.email} onChange={props.handleNewInfo}></input> 

                <label className='location-info' htmlFor='location'><b>Based In</b></label>
                <input type='text' className='location-info' id='location' defaultValue={props.displayedUser.location} onChange={props.handleNewInfo}></input> 

                <label className='instrument-info' htmlFor='instrument'><b>Instrument</b></label>
                <input type='text' className='instrument-info' id='instrument' defaultValue={props.displayedUser.instrument} onChange={props.handleNewInfo}></input>

                <label className='style-info' htmlFor='style'><b>Style</b></label>
                <input type='text' className='style-info' id='style' defaultValue={props.displayedUser.fav_genre} onChange={props.handleNewInfo}></input>

                <label className='anthem-info' htmlFor='anthem'><b>Anthem</b></label>
                <input type='text' className='anthem-info' id='anthem' defaultValue={props.displayedUser.anthem} onChange={props.handleNewInfo}></input>

                <p type='text' className='collapse-info' onClick={props.toggleEditInfo}>Hide Info</p>

                <button className='edit-button' onClick={props.uploadNewInfo}>change</button>
            </div>
        )
    } else {
        return (
            <div className='user-card-info'>
                <p id='username'><b>{props.displayedUser.username}</b></p>
                <p id='contact'><b>{props.displayedUser.email}</b></p>
                <p className='collapse-info' onClick={props.toggleInfo}>Expand Info</p>
            </div>
        )
    }   
}



export default ProfileCard