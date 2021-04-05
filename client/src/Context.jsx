import React, { Component } from "react";
import IsAuthenticaed from "./Auth/IsAuthenticated.auth";


const Context = React.createContext();




const reducer = (prevState, action) => {
    switch (action.type) {
        case "REMOVE": {
            console.log("Removed")
            return {
                domainOrIps: prevState.domainOrIps.filter(domOrIP => domOrIP !== action.payload)
            }
        }
        case "ADD": {
            return {
                domainOrIps: [...prevState.domainOrIps, action.payload]
            }
        }
        default: {
            return prevState
        }
    }
}

export class Provider extends Component {
    constructor(props) {
        super(props)
        this.handleChangeUser = this.handleChangeUser.bind(this)
    }


    state = {
        user: {},
        isLoaded: true,
        domainOrIps: [],
        dispatch: (action) => this.setState(prevState => reducer(prevState, action))
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