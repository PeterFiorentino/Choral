import React from 'react'


const FollowButton = (props) => {
    const {displayedUser, isUserLoggedIn, loggedUser, isFollowingUser, followButton} = props
    console.log(loggedUser,'follows', displayedUser.id)

    if(loggedUser == displayedUser.id){
        return <> </>
    } else if (isUserLoggedIn && !isFollowingUser){
        return(
            <button className='round-button' onClick={followButton}>follow</button>
        )
    } else if (isUserLoggedIn && isFollowingUser){
        return(
            <button className='round-button' onClick={followButton}>unfollow</button>
        )
    } else {
        return <> </>
    }
}




export default FollowButton 