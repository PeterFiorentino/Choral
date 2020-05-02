import React from 'react'

const SignupForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signupUser()
    }
    return (
        <>
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type='submit'
                    value='submit'
                />
            </form>
        </div>
        </>
    )
}


export default SignupForm