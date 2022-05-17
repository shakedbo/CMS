import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import communicationPic from "../../Images/communicationPic.jpg"



const styles = (theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },

    mainFeaturedPost: {
        backgroundColor: 'black',
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
        fontFamily: 'Cochin'
    },
    mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up("md")]: {
            paddingRight: 0
        },
        backgroundColor: 'black'
    },
    mainGrid: {
        marginTop: theme.spacing.unit * 3
    },
    cardGrid: {
    },
    card: {
        display: "flex",
        marginBottom: "1rem",
        backgroundColor: 'black',
        fontFamily: 'Cochin',
        color: 'var(--azure)'
    },
    cardDetails: {
        flex: 2
    },

    footer: {
        backgroundColor: 'black',
        padding: `${theme.spacing.unit * 2}px 0`,
        color: 'var(--azure)',
        fontWeight: 'lighter',
        fontFamily: 'monospace'
    },
    icon: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--azure)',
        padding: '12px 16px',
        fontSize: '16px',
        cursor: 'pointer',
        outline: 'none'
    }
});

const Authors = [
    {
        creator: "COMMUNICATION_LTD",
        profession: "Communication solutions",
        description:
            `We specialize in matching the perfect communication plan to our clients`,
            img: communicationPic,
    }
];


function Home(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.layout} style={{ marginTop: '2rem' }}>
                <main>
                    {/* Main featured post */}
                    <Paper className={classes.mainFeaturedPost}>
                        <Grid container>
                            <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography variant="display2" color="inherit" gutterBottom style={{ fontSize: '1.5rem' }}>
                                        COMMUNICATION_LTD
                                    </Typography>
                                    <Typography variant="headline" color="inherit" paragraph style={{ fontFamily: 'cursive' }}>
                                    </Typography>
                                    <Typography variant="headline" color="inherit" paragraph style={{ fontFamily: 'cursive' }}>
                                        Connects people
                                   </Typography>
                                </div>
                                
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* End main featured post */}
                    {/* Sub featured posts */}
                    <Grid container spacing={40} className={classes.cardGrid}>
                        {Authors.map((author) => (
                            <Grid item key={author.name} xs={24} md={12}>
                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography variant="headline" style={{ fontSize: '1.2rem' }}>
                                                {author.creator}
                                            </Typography>
                                            <Typography variant="subheading" paragraph>
                                                {author.profession}
                                            </Typography>
                                            <Typography variant="subheading" paragraph>
                                                {author.description}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <img src={author.img} style={{ width: '20rem', height: '15rem' }}></img>
                                    </Hidden>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
            {/* Footer */}
            <footer className={classes.footer}>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}


export default withStyles(styles)(Home);
