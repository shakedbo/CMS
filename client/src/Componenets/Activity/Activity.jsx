import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";
import ResultsTable from "../Shared/Results/ResultsTable.shared";
import Title from "../Shared/Title/Title";


export default function Activity() {
    const [isLoading, setIsLoading] = useState(true);
    const [scans, setScans] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const results = await axios.get(ServerAddress + 'api/asset/get-all-user-scans', { withCredentials: true })
            // Removing duplicates
            let uniq = {}
            for (let res of results.data.scans) {
                uniq[res.asset] = res;
            }
            setScans(Object.values(uniq));
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
                    <div>
                        <Title name="Browse" title="activity"></Title>
                        <ResultsTable domainScans={JSON.stringify(scans)}></ResultsTable>
                    </div>
                )
            }}
        </Consumer>
    )
}