import React from 'react'


const LoginForm = (props) => {
   
    const handleSubmit = (e) => {
        e.preventDefault()
        props.loginUser()    
    }

    return (
        <>
        <div>
            <h2>Log In</h2>
            <form onSubmit ={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    value= {props.username}
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
                    type='submit' value='Submit'
                />
            </form>
        </div>
        </>
    )
}



export default LoginForm