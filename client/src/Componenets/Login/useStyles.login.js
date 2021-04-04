import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    materialUIInput: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        borderRadius: '40px',
        backgroundColor: '#f9cddd',
        padding: '4px 5px',
        marginBottom: '10px',
        fontSize: '14px',
        width: '75%',
        height: '2.3rem',
        margin: '0 auto',
        fontWeight: 'bold',
        outline: 'none',
        '&:hover': {
            background: '#ec5990'
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
        fontWeight: '200',
        marginLeft: '2rem',
        '&:hover': {
            color: '#ec5990'
        }

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
        borderRadius: '40px',
        display: 'block',
        margin: '0 auto',
        width: '50%',
        outline: 'none',
        '&:hover': {
            background: '#bf1650',
            cursor: 'pointer'
        }
    },

    form: {
        maxWidth: '300px',
        height: '550px',
        margin: '0 auto',
        background: 'black',
        borderRadius: '1rem'
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
