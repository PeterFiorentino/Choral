import React from 'react'

const SignupForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signupUser()
    }
    return (
        <>
        <div>
            <h3>Signup</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='email'
                    value={props.email}
                    placeholder='email'
                    onChange={props.handleChange}
                />
                <br></br>
                <input 
                    type='text'
                    name='username'
                    value={props.username}
                    placeholder='username'
                    onChange={props.handleChange}
                />
                <br></br>
                <input
                    type='password'
                    name='password'
                    value={props.password}
                    placeholder='password'
                    onChange={props.handleChange}
                />
                <br></br>
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