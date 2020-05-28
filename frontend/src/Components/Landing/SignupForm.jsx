import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import './LandingPage.css'

const SignupForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signupUser()
    }
    
    return (
        <div>
            <br/>
            <h3 className='form-title'>create your user</h3>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='signup-info'>
                    <div className='main-info'>
                        <FormControl>
                            <InputLabel required htmlFor='username'>username</InputLabel>
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
                            <InputLabel required htmlFor='email'>email</InputLabel>
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
                            <InputLabel required htmlFor='password'>password</InputLabel>
                            <Input
                                required
                                type='password'
                                name='password'
                                value={props.password}
                                placeholder='password'
                                onChange={props.handleChange}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor='location'>homebase</InputLabel>                        
                            <Input
                            type='text'
                            name='location'
                            value={props.location}
                            placeholder='your homebase'
                            onChange={props.handleChange}
                            />
                         </FormControl>
                    </div>
                    <div className='more-info'>
                        <FormControl>
                            <InputLabel htmlFor='instrument'>instrument</InputLabel>
                            <Input 
                                required
                                type='text'
                                name='instrument'
                                value={props.instrument}
                                placeholder='favorite instrument'
                                onChange={props.handleChange}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor='fav_genre'>style</InputLabel>
                            <Input 
                                required
                                type='text'
                                name='fav_genre'
                                value={props.fav_genre}
                                placeholder='favorite style'
                                onChange={props.handleChange}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor='anthem'>anthem</InputLabel>
                            <Input 
                                required
                                type='text'
                                name='anthem'
                                value={props.anthem}
                                placeholder='your anthem'
                                onChange={props.handleChange}
                            />
                        </FormControl>
                        <br/>
                    </div>
                </div>
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