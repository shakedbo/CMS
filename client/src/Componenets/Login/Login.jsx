import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ServerAddress } from "../Magic";
import axios from "axios";
import Cookies from "js-cookie";
import ERRORS from "../../Magic/Errors.magic";


const useStyles = makeStyles((theme) => ({
    materialUIInput: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',

        borderRadius: '4px',
        backgroundColor: 'white',
        padding: '10px 15px',
        marginBottom: '10px',
        fontSize: '14px'
    },

    btnSubmit: {
        background: '#ec5990',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        marginTop: '40px',
        padding: '20px',
        fontSize: '16px',
        fontWeight: '100',
        letterSpacing: '10px',
        display: 'block',
        appearance: 'none',
        borderRadius: '4px',
        width: '100%',
        '&:hover': {
            background: '#bf1650',
            cursor: 'pointer'
        }
    },

    formLabel: {
        lineHeight: '2',
        textAlign: 'left',
        display: 'block',
        marginBottom: '13px',
        marginTop: '20px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '200'
    },

    form: {
        maxWidth: '300px',
        height: '400px',
        margin: '0 auto',
        background: 'black'
    },

    linkTo: {
        color: 'white',
        '&:hover': {
            textDecoration: 'none'
        }
    },

    errorDisplay: {
        color: '#ED4956',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        fontWeight: 'lighter',
        textAlign: 'center'
    }
}));



export default function Login() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);
    const [isUsernameWrong, setIsUsernameWrong] = useState(false);
    const { control, handleSubmit } = useForm();
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {

        }
        setIsLoaded(false);
        fetchData();
    }, [])

    const onSubmit = async () => {
        //api/user/login
        try {
            const response = await axios.post(ServerAddress + "api/user/login",
                { username, password }, {
                withCredentials: true // Sent cookies if there are
            });
            console.log('Res = ', response);
        } catch (err) {
            // To do - Take care of invalid username/ password 400 response errors
            console.log('[-] Error: ', err)
            switch (err.response.data.error) {

                case ERRORS.ACCOUNT_NOT_EXIST:
                    setIsUsernameWrong(true);
                    break;
                case ERRORS.WRONG_PASSWORD:
                    setIsUsernameWrong(false);
                    setIsPasswordWrong(true);
                    break;
            }
            //alert(err.response.data.error);
        }
    };

    const onPasswordChange = password => {
        setPassword(password);
    }

    const onUsernameChange = username => {
        setUsername(username);
    }
    if (isLoaded === true) {
        return <h1>Loading ...</h1>
    }
    let displayError = <div></div>
    if (isUsernameWrong) {
        displayError = <h1 className={classes.errorDisplay}>{ERRORS.ACCOUNT_NOT_EXIST}</h1>
    }
    else {
        if (isPasswordWrong) {
            displayError = <h1 className={classes.errorDisplay}>{ERRORS.WRONG_PASSWORD}</h1>
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <label className={classes.formLabel}>Username</label>
            <Input
                name="userName"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onUsernameChange(e.target.value)}
            // inputProps={{ pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' }}
            />
            <label className={classes.formLabel}>Password</label>
            <Input
                name="password"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onPasswordChange(e.target.value)}
            //  inputProps={{ pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' }}
            />
            {displayError}
            <Link to="/register" className={classes.linkTo}>Sign up</Link>
            <input type="submit" className={classes.btnSubmit} />
        </form>
    );
};