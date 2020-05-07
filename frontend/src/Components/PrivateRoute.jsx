import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'


const PrivateRoute = (props) => {
   const isUserLoggedIn = props.isUserLoggedIn
    const Component = props.component
    const otherProps = {...props}
    console.log(otherProps)
    console.log(props)
    if (isUserLoggedIn === true){
        return <Route {...otherProps} component={Component}/>
    }
    else if(isUserLoggedIn === false){
        return <Redirect to='/landing'/>
    }   
}





export default PrivateRoute