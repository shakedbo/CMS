import React, { useState } from "react";
import { Consumer } from "../../Context";
import { makeStyles } from "@material-ui/core/styles";
import { R_IP, R_DOMAIN } from "../../Magic/Regex.magic";
import { INVALID_IPDOMAIN } from "../../Magic/Errors.magic";
import { useAlert } from 'react-alert'




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
        background: 'none',
        color: 'var(--azure)',
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
            color: 'var(--mainBlue)',
            cursor: 'pointer'
        },
        outline: 'none'
    }
}))


export default function AddScan() {
    const classes = useStyle();
    const ale = useAlert();
    const [domainOrIP, setDomainOrIP] = useState('');

    const onDomainOrIPChange = (domainOrIP) => {
        setDomainOrIP(domainOrIP);
        console.log("domainOrIP =", domainOrIP)
    }

    const onClick = async (e, dispatch) => {
        e.preventDefault()

        if (domainOrIP.match(R_DOMAIN) || domainOrIP.match(new RegExp(R_IP))) {
            dispatch({ type: "ADD", payload: domainOrIP })
            setDomainOrIP('')
        }
        else {
            ale.show('Oh look, an alert!')
        }
    }

    return (
        <Consumer>
            {value => {
                const { dispatch } = value.state;
                return (
                    <div style={{ display: 'flex' }}>
                        <input
                            value={domainOrIP}
                            name="dip"
                            onChange={e => onDomainOrIPChange(e.target.value)}
                            className={classes.inputDesign}
                            placeholder={domainOrIP}
                        />
                        <button className={classes.addInput} onClick={(e) => onClick(e, dispatch)} >+</button>
                    </div>
                )
            }}
        </Consumer>
    )
}