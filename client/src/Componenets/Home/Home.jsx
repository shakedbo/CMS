import React, { useState, useEffect } from "react";
import IsAuthenticaed from "../../Auth/IsAuthenticated.auth";


export default function Home() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
            const result = await IsAuthenticaed();
            result && setUser(result);
            console.log('[+] user =', user)
            setIsLoaded(false);
        })();
    }, [])

    if (isLoaded) {
        return <h1>Loaded</h1>
    }
    return (
        <h1>
            In Home !
        </h1>
    )
}