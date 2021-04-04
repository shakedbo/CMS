import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    inputDesign: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        borderRadius: '40px',
        backgroundColor: 'var(--azure)',
        padding: '4px 5px',
        marginBottom: '10px',
        fontSize: '14px',
        width: '75%',
        height: '2.3rem',
        margin: '0 auto',
        fontWeight: 'bold',
        outline: 'none'
    }
}))

export default function InputDomainOrIP() {
    const classes = useStyle();
    return (
        <input
            name="userName"
            defaultValue=""
            onChange={e => { }}
            className={classes.inputDesign}
            required='You must provide username'
        />
    )
}