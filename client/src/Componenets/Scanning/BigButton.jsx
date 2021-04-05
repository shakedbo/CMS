import React from "react";
export default function BigButton(props) {
    return (
        <button
            size="large"
            type="secondary"
            style={{
                height: '10rem',
                textTransform: 'uppeercase',
                fontSize: '50px',
                width: '20rem',
                borderRadius: '40px',
                display: 'flex',
                margin: '0 auto',
                marginTop: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--azure)',
                borderColor: 'blue',
                borderWidth: '3rem',
                fontFamily: 'monospace',
                outline: 'none',
                cursor: 'pointer'
            }}
        >
            {props.text}
        </button>
    );
}