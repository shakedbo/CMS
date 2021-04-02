import React, { Component } from "react";
import IsAuthenticaed from "./Auth/IsAuthenticated.auth";


const Context = React.createContext();

/*
const Logout = async (prevState) => {
    return {
        user: {},
        isLoaded: false
    }
}*/




export class Provider extends Component {
    constructor(props) {
        super(props)
        this.handleChangeUser = this.handleChangeUser.bind(this)
    }


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


    // Cause "this" (without the this binding) is refred to the child component, we enfore the father (Context) to be "this"
    handleChangeUser(user) {
        this.setState({
            user
        })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <h1> Loading ... </h1>
            )
        }
        return (
            <Context.Provider value={{ state: this.state, handleChangeUser: this.handleChangeUser }}>
                { this.props.children}
            </Context.Provider >
        )
    }
}

export const Consumer = Context.Consumer