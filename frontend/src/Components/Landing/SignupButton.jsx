import React from 'react'
import {useHistory} from 'react-router-dom'

const SignupButton = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push("/profile")
    }
    return (
        <button onClick= {handleClick}>
            Signup
        </button>
    )
}


export default SignupButton