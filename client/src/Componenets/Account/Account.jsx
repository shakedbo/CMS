import React, { useEffect, useState } from "react";
import { Consumer } from "../../Context";
import Title from "../Shared/Title/Title"
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../Magic/Config.magic"

const useStyle = makeStyles((theme) => ({
    title: {
        textTransform: "uppercase",
        color: 'red'
    },
    recap: {
        justifyContent: 'center',
        backgroundColor: 'black',
        textAlign: 'center',
        width: '50%',
        margin: '0 auto',
        borderRadius: '1rem',
        color: 'var(--azure)',
        fontFamily: 'cursive',
        padding: '1rem 1rem 1rem 1rem'
    },

    btns: {
        width: '100%',
        marginTop: '3rem'
    },

    btn: {
        width: '50%',
        backgroundColor: 'transparent',
        outline: 'none',
        border: '1px red solid',
        color: 'red',
        fontSize: '2rem',
        fontFamily: 'cursive',
        fontWeight: 'bolder',
        cursor: 'pointer',
        textAlign: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        borderRadius: '3rem',
        '&:hover': {
            border: '3px white double',
            backgroundColor: 'red',
            color: 'white'
        }
    }
}))


export default function Account() {
    const history = useHistory()
    const classes = useStyle();
    const [isLoaded, setIsLoaded] = useState(true);
    const [greet, setGreet] = useState("");
    const [totalScans, setTotalScans] = useState(0);
    useEffect(() => {
        (async () => {
            setIsLoaded(true)
            const res = await axios.get(ServerAddress + 'api/asset/total-scans', { withCredentials: true })
            console.log('[+] res = ', res)
            setIsLoaded(false)
        })()

    }, [])
    const greeting = (name) => {
        const now = new Date();
        let partInDay = now.getHours();
        // [6:00-12:00] -> Morning
        // [12:00-18:00] -> Afternoon
        // [18:00-22:00] -> Evening
        // [22:00-6:00] -> Night
        let morning = (hour) => {
            return hour >= 6 && hour <= 11;
        }
        let afternoon = (hour) => {
            return hour >= 12 && hour <= 17;
        }
        let evening = (hour) => {
            return hour >= 18 && hour <= 21;
        }
        switch (true) {
            case morning(partInDay):
                setGreet(`Good morning ${name}`)
                break
            case afternoon(partInDay):
                setGreet(`Good afternoon ${name}`)
                break
            case evening(partInDay):
                setGreet(`Good evening ${name}`)
                break
            default:
                setGreet(`Good night ${name}`)
        }
    }

    const createdAt = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const onLogout = () => {
        history.push('/logout');
    }

    const onDelete = async (resetContext) => {
        try {
            if (window.confirm('Do you sure you want to delete your account permanately?')) {
                await axios.delete(ServerAddress + "api/user/delete", { withCredentials: true });
                resetContext();
                history.push('/register')
            }
        } catch (err) {
        }
    }

    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                const { resetContext } = value
                greeting(user.username)
                console.log("[+] user._id - ", user._id)
                if (user._id == null) {
                    return <h1>Please login</h1>
                }
                else {
                    return (
                        <div>
                            <Title title={greet} style={{ color: 'var(--purpleBlue)' }} />
                            {/* Recapping the history of this account*/}
                            <div className={classes.recap}>
                                <h1 className={classes.title}>Account recap</h1>
                                <h1>Created at: {createdAt(user.createdAt)}</h1>
                                <h1>Total scans: {totalScans}</h1>
                                <div className={classes.btns}>
                                    <button className={classes.btn} onClick={() => onDelete(resetContext)}>Delete</button>
                                    <button className={classes.btn} onClick={onLogout}>Log out</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }}
        </Consumer>
    )
}