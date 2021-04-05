import React from "react";
import { Consumer } from "../../Context";
import BigButton from "./BigButton";
import Title from "../Shared/Title/Title";
import { makeStyles } from "@material-ui/core/styles";
import AddScan from "./AddScan";
import DomainOrIp from "./DomainOrIP";
import { useAlert } from 'react-alert'
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";

const useStyle = makeStyles((theme) => ({

}))


export default function Scanning() {
    // const classes = useStyle()
    const alert = useAlert();

    const allScans = (domainOrIps) => {
        if (domainOrIps.length !== 0) {
            return domainOrIps && Array.isArray(domainOrIps) && domainOrIps.map(dip => <DomainOrIp domainOrIP={dip}></DomainOrIp>)
        }
        else {
            return <div>
                <h3 className="">You have no scans</h3>
            </div>
        }
    }

    const onSubmit = async (event, domainOrIps) => {
        event.preventDefault();
        if (domainOrIps.length === 0) {
            alert.show("No domains or ips provided")
        }
        else {
            try {
                const res = await axios.post(ServerAddress + "api/asset/scan", { domainOrIps }, { withCredentials: true })
                console.log("res = ", res)
            } catch (err) {

            }
        }
        //if()
    }
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                const { domainOrIps } = value.state;

                if (user._id != null) {
                    return (
                        <form onSubmit={(event) => onSubmit(event, domainOrIps)}>
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