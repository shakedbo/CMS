import React from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";

export default function Logout() {
    const out = async () => {
        try {
            const res = await axios.post(ServerAddress + "api/user/logout", {}, { withCredentials: true });

            console.log("[+] Success in log out of the account");

        } catch (err) {
            console.log("error ....", err.response)
        }
    }

    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                console.log("value.setState = ", value.setState)
                if (user._id != null) {
                    return (
                        <button onClick={
                            () => {
                                out();
                                value.setState();
                            }}> Are you sure you do want to log out?</button>
                    )
                }
                else {
                    return (
                        <h1>Log out</h1>
                    )
                }
            }}
        </Consumer>
    )
}