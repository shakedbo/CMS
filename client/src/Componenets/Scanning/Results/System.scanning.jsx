import React from "react";
/**
 * 
 * @param {Structured as followed bellow:
 *                  categories:  Array of strings
 *                  name:        -------------
 *                  version:     -------------
 *                  _id:         -------------
 * } props.sys // the system itself 
 */


export default function System(props) {
    return (
        <div>
            <h1>Name: {props.sys.name}</h1>
            <h1>Version: {props.sys.version}</h1>
            <h1> Categories: </h1>
            {props.sys.categories.map(cate => <h1>{cate}</h1>)}
        </div>
    )
}