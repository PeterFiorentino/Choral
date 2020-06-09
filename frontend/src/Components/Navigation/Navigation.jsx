import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import GroupWorkSharpIcon from '@material-ui/icons/GroupWorkSharp';
import ListSharpIcon from '@material-ui/icons/ListSharp';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
});

const Navigation = ({user, logOutUser, isUserLoggedIn }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
    left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };  

    if (isUserLoggedIn){ 
        return (
            <div>
            {['NAV BAR'].map((anchor) => (
                <AppBar key={anchor} style={{minHeight: '66px'}} color='inherit'>
                    <ToolBar style={{justifyContent:'space-between'}}>
                        <React.Fragment>
                            <Button id='nav-button' onClick={toggleDrawer(anchor, true)}>NAVIGATE</Button>
                            <Typography style={{position: 'absolute', left: '50%', transform: 'translate(-50%)', fontFamily:'Boogaloo', fontSize:'35px', fontWeight:'550', letterSpacing:'0.1 em', color:'#FF7B67'}}>Choral</Typography>
                            <Drawer anchor='left'
                                open={state[anchor]} 
                                onClose={toggleDrawer(anchor, false)}
                                style = {{width:'100px'}} >
                                <div
                                    className={clsx(classes.list, {
                                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                                    })}
                                    role="presentation"
                                    onClick={toggleDrawer(anchor, false)}
                                    onKeyDown={toggleDrawer(anchor, false)}
                                    >
                                    <List>
                                        <Link to={`/profile/${user}`}>
                                        <ListItem >
                                            <ListItemIcon button='true' >
                                                <AccountCircleSharpIcon />
                                            </ListItemIcon> 
                                            <ListItemText primary={"Profile"}/>
                                        </ListItem>
                                        </Link>{" "} 
                                    <Divider />
                                        <Link to= {`/add`}>
                                            <ListItem >
                                                <ListItemIcon  button='true'>
                                                    <PlaylistAddIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"New Session"} />
                                            </ListItem>
                                        </Link>{" "}
                                    <Divider />
                                        <Link to= "/collaborators">
                                        <ListItem >
                                            <ListItemIcon button='true'>
                                                <GroupWorkSharpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={"Collaborators"}  />
                                        </ListItem>
                                        </Link>{" "}
                                    <Divider />
                                        <Link to= "/feed">
                                        <ListItem>
                                            <ListItemIcon button='true'>
                                                <ListSharpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={"Feed"}  />
                                        </ListItem>
                                        </Link>{" "}
                                    <Divider />
                                        <Button style={{marginLeft:'10px'}} onClick={logOutUser}>{'Log Out'}</Button>
                                    </List>
                                    </div>
                            </Drawer>
                        </React.Fragment>
                    </ToolBar>
                </AppBar>
            ))}
            </div>
        );
    }
    return (
        <div></div>
    )
}
 
export default Navigation 