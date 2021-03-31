import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    materialUIInput: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',

        borderRadius: '4px',
        backgroundColor: 'white',
        padding: '10px 15px',
        marginBottom: '10px',
        fontSize: '14px'
    },

    btnSubmit: {
        background: '#ec5990',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        marginTop: '40px',
        padding: '20px',
        fontSize: '16px',
        fontWeight: '100',
        letterSpacing: '10px',
        appearance: 'none',
        borderRadius: '4px',
        display: 'block',
        margin: '0 auto',
        width: '50%',
        '&:hover': {
            background: '#bf1650',
            cursor: 'pointer'
        }
    },

    formLabel: {
        lineHeight: '2',
        textAlign: 'left',
        display: 'block',
        marginBottom: '13px',
        marginTop: '20px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '200'
    },

    form: {
        maxWidth: '300px',
        height: '600px',
        margin: '0 auto',
        background: 'black',
    },

    linkTo: {
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        '&:hover': {
            textDecoration: 'none'
        }
    },

    errorDisplay: {
        color: '#ED4956',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        fontWeight: 'lighter',
        textAlign: 'center'
    }
}));
