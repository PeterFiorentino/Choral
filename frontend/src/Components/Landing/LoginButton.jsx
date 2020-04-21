import React from 'react'
import {useHistory} from 'react-router-dom'

const LoginButton = (props) => {
    const history = useHistory()

    const handleClick = () => {
        history.push("/profile")
    }
    return (
        <button onClick= {handleClick}>
            Log In
        </button>
    )
}


export default LoginButton