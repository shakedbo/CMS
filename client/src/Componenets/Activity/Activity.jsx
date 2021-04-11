import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";
import ResultsTable from "../Shared/Results/ResultsTable.shared";

export default function Activity() {
    const [isLoading, setIsLoading] = useState(true);
    const [scans, setScans] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const results = await axios.get(ServerAddress + 'api/asset/get-all-user-scans', { withCredentials: true })
            setScans(results.data.scans);
            console.log("[+] results = ", results.data.scans)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    return (
        <Consumer>
            {value => {
                return (
                    <ResultsTable domainScans={JSON.stringify(scans)}></ResultsTable>
                )
            }}
        </Consumer>
    )
}