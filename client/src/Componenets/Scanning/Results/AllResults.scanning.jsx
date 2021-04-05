import React from "react";
import DIPResult from "./DIPResult.results";

export default function AllResults(props) {
    console.log("[+] props = ", props)
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {props.domainScans && Array.isArray(props.domainScans) && props.domainScans.map(dom => <DIPResult dip={dom}></DIPResult>)}
            {props.ipScans && Array.isArray(props.ipScans) && props.ipScans.map(ip => <DIPResult dip={ip}></DIPResult>)}
        </div>
    )
}