import React from 'react'
import './Profile.css'

const FollowButton = (props) => {
    const {displayedUser, isUserLoggedIn, loggedUser, isFollowingUser, followButton} = props
    console.log(loggedUser,'follows', displayedUser.id)

    if(loggedUser == displayedUser.id){
        return <> </>
    } else if (isUserLoggedIn && !isFollowingUser){
        return(
            <button id='follow' className='round-button' onClick={followButton}>Follow</button>
        )
    } else if (isUserLoggedIn && isFollowingUser){
        return(
            <button id='unfollow' className='round-button' onClick={followButton}>Unfollow</button>
        )
    } else {
        return <> </>
    }
}




export default FollowButton 