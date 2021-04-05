import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import BigButton from "./BigButton";
import Title from "../Shared/Title/Title";
import { makeStyles } from "@material-ui/core/styles";
import AddScan from "./AddScan";
import DomainOrIp from "./DomainOrIP";

const useStyle = makeStyles((theme) => ({

}))


export default function Scanning() {
    const classes = useStyle()
    const [domainsOrIps, setDoaminsOrIps] = useState([]);

    const allScans = (domainOrIps) => {
        if (domainOrIps.length !== 0) {
            return domainOrIps && Array.isArray(domainOrIps) && domainOrIps.map(dip => <DomainOrIp domainOrIP={dip}></DomainOrIp>)
        }
        else {
            return <div>
                <i className="fas fa-list fa-10x"></i>
                <h3 className="">You have no scans</h3>
            </div>
        }
    }


    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                const { domainOrIps } = value.state;
                if (user._id != null) {
                    return (
                        <form>
                            <Title name="Scan your" title="ips/domains"></Title>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-between' }}>
                                <div style={{ margin: '0 auto', justifyContent: 'center' }}>
                                    <AddScan></AddScan>
                                    {allScans(domainOrIps)}
                                </div>
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