import React from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic";
import { useHistory } from "react-router-dom"
import Title from "../Shared/Title/Title";
import BigButton from "../Scanning/BigButton";

export default function Logout() {
    const history = useHistory();
    const out = async () => {
        try {
            const res = await axios.post(ServerAddress + "api/user/logout", {}, { withCredentials: true });
            window.location.reload()
        } catch (err) {
            console.log("error ....", err.response)
        }
    }

    const stayIn = () => {
        history.push('/');
    }
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                if (user) {
                    return (
                        <div>
                            <Title name="Do you want 2" title="log out?"></Title>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <BigButton text="Yes" clickEvent={() => {
                                    out();
                                    value.handleChangeUser({});
                                }} />
                                <BigButton text="No" clickEvent={() => {
                                    stayIn();
                                }} />
                            </div>
                        </div>
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