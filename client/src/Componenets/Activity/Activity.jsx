import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";

export default function Activity() {
    const [scanLinks, setScanLinks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const results = await axios.get(ServerAddress + 'api/asset/get-all-user-scans')
            setScanLinks(results);
            console.log("[+] results = ", results)
        }

        fetchData()
    }, [])
    return (
        <Consumer>
            {value => {
                return (
                    <h1>In activity</h1>
                )
            }}
        </Consumer>
    )
}