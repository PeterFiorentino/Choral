import React from 'react'


const ProfilePic = (props) => {
    
    if (props.loggedUser.avatar === ''){
        return (
            <img src= {`https://cdn.clipart.email/60dc0ace75203466caef979a0a5c4e24_17685-earphones-icon-cliparts-stock-vector-and-royalty-free-_450-450.jpeg`} height='300px' width= '300px'/>
        ) 
    }
    return (
        <img src={props.loggedUser.avatar} height='300px' width= '300px'></img>
    )
}






export default ProfilePic