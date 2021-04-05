import React, { Component } from "react";
import IsAuthenticaed from "./Auth/IsAuthenticated.auth";






import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// optional configuration
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    type: 'error',
    timeout: 3000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}



const Context = React.createContext();










const reducer = (prevState, action) => {
    switch (action.type) {
        case "REMOVE": {
            if (prevState.domainOrIps.length === 1) {
                return {
                    domainOrIps: []
                }
            }
            return {
                domainOrIps: prevState.domainOrIps.filter(domOrIP => domOrIP !== action.payload)
            }
        }

        case "ADD": {
            return {
                domainOrIps: [...prevState.domainOrIps, action.payload]
            }
        }

        case "REMOVE_ALL": {
            return {
                domainOrIps: []
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
            <AlertProvider template={AlertTemplate} {...options}>

                <Context.Provider value={{ state: this.state, handleChangeUser: this.handleChangeUser }}>
                    {this.props.children}
                </Context.Provider >
            </AlertProvider>

        )
    }
}

export const Consumer = Context.Consumer