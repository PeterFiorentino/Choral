import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@material-ui/core/"
import {makeStyles} from "@material-ui/core/styles"
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import GroupWorkSharpIcon from '@material-ui/icons/GroupWorkSharp';
import ListSharpIcon from '@material-ui/icons/ListSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import './Navigation.css'

const useStyles = makeStyles((theme) => ({

    // root: {
    //     display: 'flex'
    // },

    drawerPaper : { 
        width: 'inherit',
        
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
    
}))

const Navigation = ({user, logOutUser, isUserLoggedIn}) => {
    const classes = useStyles()
    // const [mobileOpen, setMobileOpen] = useState(false);

//     const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

    if (isUserLoggedIn){
        return(
            <div className= 'navigation'>
                <nav id='links'>
                    <Drawer
                        style = {{width:'180px'}} 
                        variant = 'permanent'
                        anchor = 'left'
                        open = {true}
                        // onClose = {handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                        // ModalProps = {{
                        //     keepMounted: true
                        // }}
                    >
                        
                        <List>
    
                           <Link to={`/profile/${user.id}`}>
                            <ListItem >
                                <ListItemIcon button='true' >
                                    <AccountCircleSharpIcon />
                                </ListItemIcon> 
                                <ListItemText primary={"Profile"}/>
                            </ListItem>
                            </Link>{" "} 

                            <Link to= {`/add`}>
                                <ListItem >
                                    <ListItemIcon  button='true'>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"New Session"} />
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
    
                            <button onClick={logOutUser}>Log Out</button>
                        </List>
                    </Drawer>
                </nav>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
   
}

export default Navigation