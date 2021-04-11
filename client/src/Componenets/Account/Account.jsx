import React, { useEffect, useState } from "react";
import { Consumer } from "../../Context";
import Title from "../Shared/Title/Title"


export default function Account() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [greet, setGreet] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoaded(true)

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
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                greeting(user.username)
                if (user._id == null) {
                    return <h1>Please login</h1>
                }
                else {
                    return (
                        <div>
                            <Title title={greet} style={{ color: 'var(--purpleBlue)' }} />
                        </div>
                    )
                }
            }}
        </Consumer>
    )
}