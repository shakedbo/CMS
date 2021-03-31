import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ServerAddress } from "../Magic";
import axios from "axios";
import useStyles from "../Login/useStyles.login";
import ERRORS from "../../Magic/Errors.magic";
import REGEX from "../../Magic/Regex.magic";

export default function Register() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [displayedError, setDisplayedError] = useState('');
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
            if (confirmPassword !== password) {
                throw "Passwords not match.";
            }
            const response = await axios.post(ServerAddress + "api/user/register",
                { username, password, email }/*, {
               // withCredentials: true // Sent cookies if there are
            }*/);
            //Clearing the form right after the Data has been added to the DB
            document.formInput.reset();
            setDisplayedError('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (typeof err.response !== 'undefined') {
                // To do - Take care of invalid username/ password 400 response errors
                if (err.response.data.error.includes('User validation failed:')) {
                    setDisplayedError(err.response.data.error.substring(('User validation failed:').length))
                }
                else {
                    setDisplayedError(err.response.data.error);
                }
            }
            else {
                setDisplayedError(err);
            }
        }
    };

    const onPasswordChange = password => {
        setPassword(password);
    }
    const onUsernameChange = username => {
        setUsername(username);
    }
    const onConfirmPasswordChange = confirm_password => {
        setConfirmPassword(confirm_password);
    }
    const onEmailChange = email => {
        setEmail(email);
    }

    if (isLoaded === true) {
        return <h1>Loading ...</h1>
    }

    let error = <div></div>

    if (displayedError !== '') {
        error = <h1 className={classes.errorDisplay}>{displayedError}</h1>
    }

    return (
        <form name="formInput" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <label className={classes.formLabel}>Username</label>
            <Input
                name="userName"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onUsernameChange(e.target.value)}
                inputProps={{
                    required: 'You must provide username',
                    pattern: REGEX.R_USERNAME,
                    title: ERRORS.INVALID_USERNAME
                }}
                autoComplete="username"
            />
            <label className={classes.formLabel}>Password</label>
            <Input
                name="password"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onPasswordChange(e.target.value)}
                inputProps={{
                    required: true,
                    pattern: REGEX.R_PASSWORD,
                    title: ERRORS.INVALID_PASSWORD
                }}
                autoComplete="password"
            />
            <label className={classes.formLabel}>Confirm Password</label>
            <Input
                name="confirm-password"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onConfirmPasswordChange(e.target.value)}
                inputProps={{
                    required: true,
                    pattern: REGEX.R_PASSWORD,
                    title: ERRORS.INVALID_PASSWORD
                }}
                autoComplete="password"
            />
            <label className={classes.formLabel}>Email</label>
            <Input
                name="email"
                control={control}
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onEmailChange(e.target.value)}
                inputProps={{
                    required: true,
                    pattern: REGEX.R_EMAIL,
                    title: ERRORS.INVALID_EMAIL
                }}
                autoComplete="email"
            />
            {error}
            <Link to="/login" className={classes.linkTo}>Already have an account? Log in</Link>
            <input type="submit" className={classes.btnSubmit} />
        </form>
    );
};