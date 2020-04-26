import React from 'react'
import {Link} from 'react-router-dom'
import {Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@material-ui/core/"
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
                    style = {{width:'200px'}} 
                    variant = 'persistent'
                    anchor =  'left'
                    open = {true}
                    classes={{paper: classes.drawerPaper}}
                >
                    <List>
                        <Link to= "/landing"> 
                        <ListItem button>
                            <ListItemIcon >
                                <HomeSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                       </Link>{" "}

                       <Link to= "/profile">
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleSharpIcon />
                            </ListItemIcon> 
                            <ListItemText primary={"Profile"}/>
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/collaborators">
                        <ListItem button>
                            <ListItemIcon>
                                <GroupWorkSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Collaborators"}  />
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/feed">
                        <ListItem>
                            <ListItemIcon>
                                <ListSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Feed"}  />
                        </ListItem>
                        </Link>{" "}

                        <Link to= "/landing">
                        <ListItem>
                            <ListItemIcon>
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