import React from 'react'
import {Link} from 'react-router-dom'
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core/"
import {makeStyles} from "@material-ui/core/styles"
import './Navigation.css'

const useStyles = makeStyles((theme) => ({
    drawerPaper : { width: 'inherit'},
    
}))

const Navigation = () => {
    const classes = useStyles()
    return(
        <div className= 'navigation'>
            <nav id='links'>
                <Drawer
                    style = {{width:'200px'}} 
                    variant = 'persistent'
                    anchor =  'left'
                    open = {true}
                    classes={{paper: classes.drawerPaper}}
                >
                <Link to= "/landing"> Home </Link>{" "}
                <Link to= "/profile"> Profile Page </Link>{" "}
                <Link to= "/collaborators"> Collaborators  </Link>{" "}
                <Link to= "/feed"> Feed </Link>{" "}
                <Link to= "/landing"> Log out </Link>{" "}

                </Drawer>
            </nav>
        </div>
    )
}

export default Navigation