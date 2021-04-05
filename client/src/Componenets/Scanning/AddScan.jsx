import React, { useState } from "react";
import { Consumer } from "../../Context";
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
    },

    addInput: {
        background: 'var(--mainBlue)',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        padding: '20px',
        fontSize: '16px',
        fontWeight: '100',
        letterSpacing: '10px',
        appearance: 'none',
        borderRadius: '400px',
        display: 'flex',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        height: '3rem',
        width: '3rem',
        fontSize: '3rem',
        '&:hover': {
            background: 'var(--azure)',
            cursor: 'pointer'
        },
        outline: 'none'
    }
}))


export default function AddScan() {
    const classes = useStyle();
    const [domainOrIP, setDomainOrIP] = useState('');

    const onDomainOrIPChange = (domainOrIP) => {
        setDomainOrIP(domainOrIP);
        console.log("domainOrIP =", domainOrIP)
    }

    /*const onSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD", payload: domainOrIP })
    }*/

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event: Form Submit');
    };


    return (
        <Consumer>
            {value => {
                const { dispatch } = value;
                return (
                    <form onSubmit={handleSubmit}>
                        {/*<input
                            name="ip"
                            defaultValue=""
                            onChange={e => onDomainOrIPChange(e.target.value)}
                            className={classes.inputDesign}
                            placeholder={domainOrIP}
                            required='You must provide username'
                            pattern={R_IPDOMAIN}
                            title={INVALID_IPDOMAIN}
                        />*/}
                        <input type="submit" />
                    </form>
                )
            }}
        </Consumer>
    )
}