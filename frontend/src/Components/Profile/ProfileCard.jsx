import React from 'react'

// location, instrument, fav_genre, anthem
const ProfileCard = (props) => {
    console.log(props)
    if(props.displayInfo){
        return(
            <>
                <div className='user-card-info'>
                    <h2 id='username'><b>{props.displayedUser.username}</b></h2>
                    <h5 id='contact'>{props.displayedUser.email}</h5> 

                    <b> <label for='location'>Based In</label></b>
                    <h5 id='location'>{props.displayedUser.location}</h5> 

                    <b> <label for='instrument'>Instrument</label></b>
                    <h5 id='instrument'> {props.displayedUser.instrument}</h5>

                    <b> <label for='genre'>Genre</label></b> 
                    <h5 id='genre'>{props.displayedUser.fav_genre}</h5>

                    <b> <label for='anthem'>Anthem</label></b> 
                    <h5 id='anthem'>{props.displayedUser.anthem}</h5>

                    <p className='collapse-info' onClick={props.toggleInfo}>Hide Info</p>
                </div>
                {/* <button className='info-button' onClick={props.toggleInfo} style={{width: 'auto'}}>Hide Info</button> */}
            </>
        )
    }
    return (
        <div className='user-card-info'>
            <h2 id='username'><b>{props.displayedUser.username}</b></h2>
            <p className='collapse-info' onClick={props.toggleInfo}>Expand Info</p>
        </div>
    )
    
}



export default ProfileCard