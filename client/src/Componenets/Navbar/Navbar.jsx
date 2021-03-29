import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    btns: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: 'rgba(197, 1, 77, 0.5)',
            borderRadius: '5rem'
        }
    }
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: '#ec5990', fontFamily: 'cursive' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className="btn" className={classes.btns}>CMS</Link>
                    </Typography>
                    <Link to="/login" className={classes.btns}>Login</Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}