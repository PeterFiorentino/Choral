import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'


const PrivateRoute = (props) => {
    const isUserLoggedIn = props.isUserLoggedIn
    const wasInitialized = props.wasInitialized
    const Component = props.component
    const otherProps = {...props}
    
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