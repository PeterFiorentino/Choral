import React from 'react'

const ProfileCard = (props) => {
    console.log(props)
    if(props.displayInfo){
        return(
            <>
                <div className='user-card-info'>
                    <p id='username'><b>{props.displayedUser.username}</b></p>
                    <p id='contact'><b>{props.displayedUser.email}</b></p> 

                    <label id='location' htmlFor='location'><b>Based In</b></label>
                    <p id='location'>{props.displayedUser.location}</p> 

                    <label id='instrument' htmlFor='instrument'><b>Instrument</b></label>
                    <p id='instrument'>{props.displayedUser.instrument}</p>

                    <label id='genre' htmlFor='genre'><b>Genre</b></label>
                    <p id='genre'>{props.displayedUser.fav_genre}</p>

                    <label id='anthem' htmlFor='anthem'><b>Anthem</b></label>
                    <p id='anthem'>{props.displayedUser.anthem}</p>

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