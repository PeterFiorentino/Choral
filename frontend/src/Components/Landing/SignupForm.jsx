import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

const SignupForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signupUser()
    }
    return (
        <div>
            <br/>
            <h3>create your user</h3>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor='username'>username</InputLabel>
                    <Input 
                        required
                        type='text'
                        name='username'
                        value={props.username}
                        placeholder='username'
                        onChange={props.handleChange}
                    />
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor='email'>email</InputLabel>
                    <Input 
                        required
                        type='email'
                        name='email'
                        value={props.email}
                        placeholder='email'
                        onChange={props.handleChange}
                    />
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor='password'>password</InputLabel>
                    <Input
                        required
                        type='password'
                        name='password'
                        value={props.password}
                        placeholder='password'
                        onChange={props.handleChange}
                    />
                </FormControl>
                <br/><br/>
                <InputLabel htmlFor='avatar' style={{fontWeight:'800', color:'indigo'}}>avatar</InputLabel>
                <input
                    type='file'
                    accept='image/*'
                    name='avatar'
                    value={props.avatar}
                    placeholder='avatar'
                    onChange={props.handleFile}
                />
                <br/><br/>
                <button className='round-button' type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}


export default SignupForm