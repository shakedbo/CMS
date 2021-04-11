import React from "react";
import "./Title.css";

export default function Title({ name, title, style }) {
    return (
        <div className="row" style={{ justifyContent: 'center', display: 'flex' }}>
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-capitalize font-weight-bold">
                    {name} <strong className="text-blue" style={style}>{title}</strong>
                </h1>
            </div>
        </div>
    );
}
