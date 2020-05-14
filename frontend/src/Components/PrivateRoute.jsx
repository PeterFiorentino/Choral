import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'


const PrivateRoute = (props) => {
    console.log('logged in ? =>', props.isUserLoggedIn)
   const isUserLoggedIn = props.isUserLoggedIn
   const wasInitialized = props.wasInitialized
    const Component = props.component
    const otherProps = {...props}
    console.log(otherProps)
    
    // console.log(props)
    if (isUserLoggedIn && wasInitialized ){
        return <Route {...otherProps} component={Component}/>
    }
    else if(!isUserLoggedIn && wasInitialized){
        return <Redirect to='/landing'/>
    }
    else {
        return <> </>
    }   
}





export default PrivateRoute