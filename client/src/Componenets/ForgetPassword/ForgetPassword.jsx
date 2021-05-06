
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import REGEX from "../../Magic/Regex.magic";
import ERRORS from "../../Magic/Errors.magic";
import useStyles from "../Login/useStyles.login";
import { ServerAddress } from "../../Magic/Config.magic";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [displayedError, setDisplayedError] = useState('');
    const classes = useStyles();
    const onEmailChange = email => {
        setEmail(email);
    }

    const onSubmit = async (event, handleChangeUser) => {
        event.preventDefault()
        try {
            const response = await axios.post(ServerAddress + "api/user/forgot-password",
                { email }, { withCredentials: true });
        }
        catch (err) { }
    }
    return (
        <form name="formInput" onSubmit={(event) => onSubmit(event)} className={classes.form} style={{ fontFamily: 'cursive' }}>

            <label className={classes.formLabel}>Email</label>
            <input
                name="email"
                defaultValue=""
                className={classes.materialUIInput}
                onChange={e => onEmailChange(e.target.value)}
                required
                pattern={REGEX.R_EMAIL}
                title={ERRORS.INVALID_EMAIL}
                autoComplete="email"
            />
            <input type="submit" className={classes.btnSubmit} />
        </form>)
}