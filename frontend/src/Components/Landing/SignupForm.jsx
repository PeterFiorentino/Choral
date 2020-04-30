import React from 'react'
import {useHistory} from 'react-router-dom'

const SignupForm = (props) => {
    const history = useHistory()

    const handleClick = () => {
        history.push("/profile")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signupUser()
    }
    return (
        <>
        <div>
            <h2>Signup</h2>
            <form onSubmit={props.handleSubmit}>
                <input 
                    type='text'
                    name='email'
                    value={props.email}
                    placeholder='email'
                    onChange={props.handleChange}
                />
                <input 
                    type='text'
                    name='username'
                    value={props.username}
                    placeholder='username'
                    onChange={props.handleChange}
                />
                <input
                    type='password'
                    name='password'
                    value={props.password}
                    placeholder='password'
                    onChange={props.handleChange}
                />
            </form>
        </div>
        </>
    )
}


export default SignupForm