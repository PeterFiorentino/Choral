import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

const LoginForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.loginUser()
    }

    return (
        <div>
            <br/>
            <h3>enter choral</h3>
            <form onSubmit ={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor='username'>username</InputLabel>
                    <Input
                        required
                        type='text'
                        name='username'
                        value= {props.username}
                        placeholder='username'
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
                <button className='round-button' type='submit'>SUBMIT</button>
            </form>
        </div>
    )
}



export default LoginForm