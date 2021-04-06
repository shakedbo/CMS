import React, { useState, useEffect } from "react";
import { Consumer } from "../../Context";
import Blog from "./Blog";

export default function Home() {
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                if (user._id != null) {
                    return (
                        <div>
                            <Blog></Blog>
                        </div>
                    )
                }
                else {
                    return (
                        <h1>In home</h1>
                    )
                }
            }}
        </Consumer >
    )
}