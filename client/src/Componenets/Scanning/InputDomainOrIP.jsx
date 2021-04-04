import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { R_IP, R_DOMAIN, R_IPDOMAIN } from "../../Magic/Regex.magic";
import { INVALID_IPDOMAIN } from "../../Magic/Errors.magic";

const useStyle = makeStyles((theme) => ({
    inputDesign: {
        display: 'flex',
        boxSizing: 'border-box',
        borderRadius: '40px',
        backgroundColor: 'var(--azure)',
        padding: '4px 5px',
        marginBottom: '10px',
        fontSize: '14px',
        width: '12rem',
        height: '2.3rem',
        fontWeigaht: 'bold',
        outline: 'none',
        textAlign: 'center'
    }
}))

export default function InputDomainOrIP() {
    const classes = useStyle();
    return (
        <input
            name="ip"
            defaultValue=""
            onChange={e => { }}
            className={classes.inputDesign}
            placeholder="IP/Domain address"
            required='You must provide username'
            pattern={R_IPDOMAIN}
            title={INVALID_IPDOMAIN}
        />
    )
}