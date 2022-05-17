import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ServerAddress } from "../../Magic/Config.magic";
import axios from "axios";
import ERRORS from "../../Magic/Errors.magic";
import useStyles from "./useStyles.login";
import REGEX from "../../Magic/Regex.magic";
import { Consumer } from "../../Context";
import Logout from "../Logout/logout";


export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayedError, setDisplayedError] = useState('');
    const classes = useStyles();


    const onSubmit = async (event, handleChangeUser) => {
        //api/user/login
        // Preventing the default form refreshing
        event.preventDefault()
        try {
            const response = await axios.post(ServerAddress + "api/user/login",
                { email, password }, {
                withCredentials: true // Sent cookies if there are
            });
            history.push('/');
            handleChangeUser(response.data.user)
        } catch (err) {
            console.log("err = ", err)
            // To do - Take care of invalid username/ password 400 response errors
            setDisplayedError(err.response.data.error);
        }
    };

    const onPasswordChange = password => {
        setPassword(password);
    }

    const onEmailChange = email => {
        setEmail(email);
    }

    let error = <div></div>
    if (displayedError !== '') {
        error = <h1 className={classes.errorDisplay}>{displayedError}</h1>
    }

    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                if (user._id != null) {
                    return (
                        <React.Fragment>
                            <h1>You are Already in</h1>
                            <h1>Please log out before logging in to another account</h1>
                            <Logout />
                        </React.Fragment>
                    )
                }
                else {
                    return (
                        <form onSubmit={(event) => onSubmit(event, value.handleChangeUser)} className={classes.form} style={{ height: '350px', fontFamily: 'cursive' }}>
                            <label className={classes.formLabel}>Email</label>
                            <input
                                name="email"
                                defaultValue=""
                                className={classes.materialUIInput}
                                onChange={e => onEmailChange(e.target.value)}
                                required='You must provide an email'
                                pattern={REGEX.R_EMAIL}
                                title={ERRORS.INVALID_EMAIL}
                            />
                            <label className={classes.formLabel}>Password</label>
                            <input
                                name="password"
                                defaultValue=""
                                className={classes.materialUIInput}
                                onChange={e => onPasswordChange(e.target.value)}
                                required
                                pattern={REGEX.R_PASSWORD}
                                title={ERRORS.INVALID_PASSWORD}
                                type={'password'}
                            />
                            {error}
                            <Link to="/register" className={classes.linkTo}>Sign up</Link>
                            <Link to="/login/reset" className={classes.linkTo}>Forgot password?</Link>
                            <input type="submit" className={classes.btnSubmit} />
                        </form>
                    )
                }
            }}

        </Consumer>
    );
};