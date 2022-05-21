
import "./Sidebar.css";
import React from "react";
import { Consumer } from "../../Context";
import { Link } from "react-router-dom";

const Sidebar = ({ width, height }) => {
    const [xPosition, setX] = React.useState(-width);

    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
        } else {
            setX(-width);
        }
    };

    React.useEffect(() => {
        setX(0);
    }, []);
    return (
        <Consumer>
            {value => {
                const { user } = value.state;
                let displayedLinks = <div></div>
                if (!!user) {
                    displayedLinks = (
                        <div>
                            <div className="space"></div>
                            <Link to="/change-details" className="link">Change Details</Link>
                            <div className="space"></div>
                        </div>
                    )
                }
                else {
                    displayedLinks = (
                        <div>
                            <div className="space"></div>
                            <Link to="/login" className="link">Log in</Link>
                            <div className="space"></div>
                            <Link to="/register" className="link">Register</Link>
                            <div className="space"></div>
                        </div>
                    )
                }
                return (
                    <div style={{ position: 'fixed' }}>
                        <div
                            className="side-bar"
                            style={{
                                transform: `translatex(${xPosition}px)`,
                                width: width,
                                minHeight: height
                            }}
                        >
                            <button
                                onClick={() => toggleMenu()}
                                className="toggle-menu"
                                style={{
                                    transform: `translate(${width}px, 20vh)`
                                }}
                            ></button>
                            <div className="content">{displayedLinks}</div>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    );
};

export default Sidebar;