import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import BigButton from "./BigButton";
import Title from "../Shared/Title/Title";
import InputDomainOrIP from "./InputDomainOrIP";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
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


export default function Scanning() {
    const classes = useStyle()
    const [domainsOrIps, setDoaminsOrIps] = useState([]);
    const addInput = () => {
        console.log("add input")
    }

    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                if (user._id != null) {
                    return (
                        <form>
                            <Title name="Scan your" title="ips/domains"></Title>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-between' }}>
                                <div style={{ margin: '0 auto', justifyContent: 'center' }}>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>
                                    <InputDomainOrIP></InputDomainOrIP>

                                </div>
                                <button type="submit" className={classes.addInput} style={{ margin: '0 auto', justifyContent: 'center' }} onClick={() => addInput()} >+</button>
                            </div>
                            <BigButton text="Scan" />
                        </form>
                    )
                }
                else {
                    return (
                        <h1>In scanning</h1>
                    )
                }
            }}
        </Consumer >
    )
}