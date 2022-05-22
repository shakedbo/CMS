import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Consumer } from "../../Context";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
        fontFamily: 'Cochin',
        '&:hover': {
            backgroundColor: 'var(--azure)',
            color: 'black',
            borderRadius: '5rem'
        }
    }
}));

export default function Navbar() {
    const classes = useStyles();

    const common = (nameOrLink) => {
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: 'black', fontFamily: 'Cochin' }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.btns}>Comm LTD</Link>
                        </Typography>
                        {nameOrLink}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    return (
        <Consumer>
            {value => {
                const { user } = value.state
                if (!user) {
                    return (
                        common(<Link to="/login" className={classes.btns}>Login</Link>)
                    );
                }
                else {
                    return (
                        common(
                            <div>
                                <Link to="/logout" className={classes.btns} style={{ display: 'inline', marginLeft: '2rem' }}>Log out</Link>
                                <h3 className={classes.btns} style={{ display: 'inline', marginLeft: '2rem' }}>Hello {user.username}</h3>
                            </div>
                        )
                    )
                }
            }}
        </Consumer>
        
    );
}