import React from 'react'

// location, instrument, fav_genre, anthem
const ProfileCard = (props) => {
    console.log(props)
    if(props.displayInfo){
        return(
            <>
                <div className='user-card-info'>
                    <p id='username'><b>{props.displayedUser.username}</b></p>
                    <p id='contact'>{props.displayedUser.email}</p> 

                    <label htmlFor='location'><b>Based In</b></label>
                    <p id='location'>{props.displayedUser.location}</p> 

                    <label htmlFor='instrument'><b>Instrument</b></label>
                    <p id='instrument'>{props.displayedUser.instrument}</p>

                    <label htmlFor='genre'><b>Genre</b></label>
                    <p id='genre'>{props.displayedUser.fav_genre}</p>

                    <label htmlFor='anthem'><b>Anthem</b></label>
                    <p id='anthem'>{props.displayedUser.anthem}</p>

                    <p className='collapse-info' onClick={props.toggleInfo}>Hide Info</p>
                </div>
            </>
        )
    }
    return (
        <div className='user-card-info'>
            <p id='username'><b>{props.displayedUser.username}</b></p>
            <p id='contact'>{props.displayedUser.email}</p>
            <p className='collapse-info' onClick={props.toggleInfo}>Expand Info</p>
        </div>
    )
    
}



export default ProfileCard