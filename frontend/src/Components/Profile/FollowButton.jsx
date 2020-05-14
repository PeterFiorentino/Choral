import React from 'react'


const FollowButton = (props) => {
    const {displayedUser, isUserLoggedIn, loggedUser, isFollowingUser, followUser, unfollowUser} = props
    console.log(loggedUser,'follows', displayedUser.id)

    if(loggedUser == displayedUser.id){
        return <> </>
    } else if (isUserLoggedIn && !isFollowingUser){
        return(
            <button onClick={followUser}>Follow</button>
        )
    } else if (isUserLoggedIn && isFollowingUser){
        return(
            <button onClick={unfollowUser}>Unfollow</button>
        )
    } else {
        return <> </>
    }
}




export default FollowButton 