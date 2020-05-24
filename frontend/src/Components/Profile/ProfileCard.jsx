import React from 'react'

const ProfileCard = (props) => {
    console.log(props)
    if(props.displayInfo){
        return(
            <>
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
                </div>
            </>
        )
    }
    return (
        <div className='user-card-info'>
            <p id='username'><b>{props.displayedUser.username}</b></p>
            <p id='contact'><b>{props.displayedUser.email}</b></p>
            <p className='collapse-info' onClick={props.toggleInfo}>Expand Info</p>
        </div>
    )
    
}



export default ProfileCard