import React from "react";
import { Consumer } from "../../Context";
import BigButton from "./BigButton";
import Title from "../Shared/Title/Title";
import InputDomainOrIP from "./InputDomainOrIP";

export default function Scanning() {
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                if (user._id != null) {
                    return (
                        <React.Fragment>
                            <Title name="Scan your" title="ips/domains"></Title>
                            <InputDomainOrIP></InputDomainOrIP>
                            <BigButton text="Scan" />
                        </React.Fragment>
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