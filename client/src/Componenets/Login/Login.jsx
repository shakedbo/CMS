import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { ServerAddress } from "../Magic";
import axios from "axios";
import ERRORS from "../../Magic/Errors.magic";
import useStyles from "./useStyles.login";
import REGEX from "../../Magic/Regex.magic";

export default function Login() {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            const response = await axios.post(ServerAddress + "api/user/login",
                { username, password }, {
                withCredentials: true // Sent cookies if there are
            });
            history.push('/');
        } catch (err) {
            // To do - Take care of invalid username/ password 400 response errors
            setDisplayedError(err.response.data.error);
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
    let error = <div></div>
    if (displayedError !== '') {
        error = <h1 className={classes.errorDisplay}>{displayedError}</h1>
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
                inputProps={{
                    required: 'You must provide username',
                    pattern: REGEX.R_USERNAME,
                    title: ERRORS.INVALID_USERNAME
                }}
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
            />
            {error}
            <Link to="/register" className={classes.linkTo}>Sign up</Link>
            <input type="submit" className={classes.btnSubmit} />
        </form>
    );
};