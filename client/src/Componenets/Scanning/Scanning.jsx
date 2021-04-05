import React, { useState } from "react";
import { Consumer } from "../../Context";
import BigButton from "./BigButton";
import Title from "../Shared/Title/Title";
import { makeStyles } from "@material-ui/core/styles";
import AddScan from "./AddScan";
import DomainOrIp from "./DomainOrIP";
import { useAlert } from 'react-alert'
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";
import ReactLoading from 'react-loading';
import AllResults from "./Results/AllResults.scanning";
import DIPResult from "./Results/DIPResult.results";


const useStyle = makeStyles((theme) => ({
    loading: {
        margin: '0 auto',
        // display: 'flex',
        // justifyContent: 'center'
    }
}))


export default function Scanning() {
    const classes = useStyle()
    const alert = useAlert();
    const [scanResults, setScanResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [displayResults, setDisplayResults] = useState(false);


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

    const onSubmit = async (event, domainOrIps, dispatch) => {
        event.preventDefault();
        if (domainOrIps.length === 0) {
            alert.show("No domains or ips provided")
        }
        else {
            try {
                setIsLoading(true)
                const res = await axios.post(ServerAddress + "api/asset/scan", { domainOrIps }, { withCredentials: true })
                console.log("[+] res.data.results = ", res.data.results)
                setScanResults(res.data.results)
                setDisplayResults(true);
                // clear the context assets
                dispatch({ type: "REMOVE_ALL" })
                setIsLoading(false)
            } catch (err) {

            }
        }
    }

    if (isLoading === true) {
        return (
            <div>
                <Title name="Scan your" title="ips/domains"></Title>
                <ReactLoading color={'var(--mainBlue)'} height={'10rem'} width={'10rem'} type={'spokes'} className={classes.loading}></ReactLoading>
            </div>
        )
    }

    if (displayResults === true) {
        return (
            <div>
                <Title name="scan" title="results"></Title>
                <AllResults domainScans={scanResults.domainScans} ipScans={scanResults.ipScans}></AllResults>
            </div>
        )
    }

    return (
        <Consumer>
            {value => {
                const { user, domainOrIps, dispatch } = value.state;
                if (user._id != null) {
                    return (
                        <form onSubmit={(event) => onSubmit(event, domainOrIps, dispatch)}>
                            <Title name="Scan your" title="ips/domains"></Title>
                            <DIPResult></DIPResult>
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