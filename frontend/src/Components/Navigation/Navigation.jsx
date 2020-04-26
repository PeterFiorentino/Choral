import React from 'react'
import {Link} from 'react-router-dom'
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core/"
import {makeStyles} from "@material-ui/core/styles"
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import GroupWorkSharpIcon from '@material-ui/icons/GroupWorkSharp';
import ListSharpIcon from '@material-ui/icons/ListSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import './Navigation.css'

const useStyles = makeStyles((theme) => ({
    drawerPaper : { 
        width: 'inherit',
        
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
    
}))

const Navigation = () => {
    const classes = useStyles()
    return(
        <div className= 'navigation'>
            <nav id='links'>
                <Drawer
                    style = {{width:'180px'}} 
                    variant = 'persistent'
                    anchor =  'left'
                    open = {true}
                    classes={{paper: classes.drawerPaper}}
                >
                    <List>
                        <Link to= "/landing"> 
                        <ListItem >
                            <ListItemIcon button='true'>
                                <HomeSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                       </Link>{" "}

                       <Link to= "/profile">
                        <ListItem >
                            <ListItemIcon button='true'>
                                <AccountCircleSharpIcon />
                            </ListItemIcon> 
                            <ListItemText primary={"Profile"}/>
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/collaborators">
                        <ListItem >
                            <ListItemIcon button='true'>
                                <GroupWorkSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Collaborators"}  />
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/feed">
                        <ListItem>
                            <ListItemIcon button='true'>
                                <ListSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Feed"}  />
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/landing">
                        <ListItem>
                            <ListItemIcon button='true'>
                                <ListItemIcon>
                                    <ExitToAppSharpIcon />
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={"Log Out"} />
                        </ListItem>
                        </Link>{" "} 
                    </List>
                </Drawer>
            </nav>
        </div>
    )
}

export default Navigation