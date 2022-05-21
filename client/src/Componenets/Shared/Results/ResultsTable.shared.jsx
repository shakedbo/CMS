import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createRow(asset, systems) {
    return {
        asset,
        systems
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell style={{ backgroundColor: 'black', textAlign: 'center', borderWidth: '0.2rem', borderColor: 'var(--azure)', borderStyle: 'solid' }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ color: 'black', backgroundColor: 'var(--azure)' }}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ backgroundColor: 'black', fontFamily: 'cursive', color: 'var(--azure)', borderWidth: '0.2rem', borderColor: 'black', borderStyle: 'solid', fontSize: '1rem' }}>
                    {row.asset}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div" align="center" style={{ fontFamily: 'cursive' }}>
                                Systems
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead >
                                    <TableRow>
                                        <TableCell style={{ fontFamily: 'cursive' }}>Name</TableCell>
                                        <TableCell style={{ fontFamily: 'cursive' }}>Version</TableCell>
                                        <TableCell style={{ fontFamily: 'cursive' }}>Categories</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.systems.map((systemRow) => (
                                        <TableRow key={systemRow.id}>
                                            <TableCell component="th" scope="row" style={{ fontFamily: 'cursive' }}>
                                                {systemRow.name}
                                            </TableCell>
                                            <TableCell style={{ fontFamily: 'cursive' }}>{systemRow.version}</TableCell>
                                            <TableCell style={{ fontFamily: 'cursive' }}>{
                                                systemRow.categories.join(", ")
                                            }</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function ResultsTable(props) {
    // const ipScans = JSON.parse(props.ipScans);
    const ipScans = null;
    const domainScans = JSON.parse(props.domainScans);
    return (
        <TableContainer component={Paper} style={{ marginBottom: '3rem', width: '75%', margin: '0 auto' }}>
            <Table aria-label="collapsible table" style={{ borderWidth: '0.5rem', borderColor: 'var(--mainBlue)', borderStyle: 'solid' }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: 'black', borderWidth: '0.2rem', borderColor: 'var(--azure)', borderStyle: 'solid' }} />
                        <TableCell style={{ backgroundColor: 'black', fontFamily: 'cursive', borderWidth: '0.2rem', borderColor: 'var(--azure)', borderStyle: 'solid', color: 'var(--azure)', fontWeight: 'bolder', fontSize: '1.5rem' }}>Asset</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {domainScans && Array.isArray(domainScans) && domainScans.map((dom) => (
                        <Row key={dom.asset} row={createRow(dom.asset.split(',')[0], dom.systems)} />
                    ))}
                    {ipScans && Array.isArray(ipScans) && ipScans.map((ip) => (
                        <Row key={ip} row={{ name: ip, history: [] }} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
