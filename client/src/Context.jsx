import React, { Component } from "react";
import IsAuthenticaed from "./Auth/IsAuthenticated.auth";
import { ServerAddress } from "./Magic/Config.magic";
import axios from "axios";


const Context = React.createContext();

/*
const Logout = async (prevState) => {
    return {
        user: {},
        isLoaded: false
    }
}*/




export class Provider extends Component {
    state = {
        user: {},
        isLoaded: true
    }

    async componentDidMount() {
        this.setState({ isLoaded: true })
        const result = await IsAuthenticaed();
        result && this.setState({
            user: result
        })
        this.setState({ isLoaded: false })
    }

    async componentDidUpdate() {

    }

    render() {
        if (this.state.isLoaded) {
            return (
                <h1> Loading ... </h1>
            )
        }
        return (
            <Context.Provider value={{ state: this.state, setState: this.setState }}>
                { this.props.children}
            </Context.Provider >
        )
    }
}

export const Consumer = Context.Consumer