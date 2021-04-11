import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import OrBenAbaProfile from "../../Images/orBenAbaProfile.jpg"
import ShakedBozikovskyProfile from "../../Images/ShakedBozikovskyProfile.jpg";


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
        fontFamily: 'cursive'
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
        fontFamily: 'cursive',
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
        creator: "Or Ben-Aba",
        profession: "Low level, Blockchain & Full stack",
        description:
            `Enthusiastic researcher, Clear understanding of Low Level concepts , and training in CTFs. Reversing huge softwares.
            Motivated to learn, grow and excel. Adjusting easily to new environment and eager to expand my horizons.`,
        img: OrBenAbaProfile,
        github: 'https://github.com/orbenaba',
        twitter: 'https://twitter.com/or24647603',
        linkedin: 'https://www.linkedin.com/in/or-ben-aba-6a329a1b3/'
    },
    {
        creator: "Shaked Bozikovsky",
        profession: "Full stack",
        description:
            `Proven technical skills with a diverse background. Highly motivated and a fast learner`,
        img: ShakedBozikovskyProfile,
        github: 'https://github.com/shakedbo',
        twitter: 'https://twitter.com/or24647603',
        linkedin: 'https://www.linkedin.com/in/shaked-bozikovsky-678034186'
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
                                        Content Mangement System
                                    </Typography>
                                    <Typography variant="headline" color="inherit" paragraph style={{ fontFamily: 'cursive' }}>
                                    </Typography>
                                    <Typography variant="headline" color="inherit" paragraph style={{ fontFamily: 'cursive' }}>
                                        Our CMS communicate with few microservices which run at the backend,
                                        gathering information about given IPs or Domains and displaying it at a nice GUI.
                                        The activity of each user can be viewed any time.
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
                                            <Typography variant="subheading" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <a href={author.github} target="_blank" className={classes.icon}><i class="fab fa-github fa-2x" style={{ marginRight: '1rem' }}></i></a>
                                                <a href={author.twitter} target="_blank" className={classes.icon}><i class="fab fa-twitter fa-2x" style={{ marginRight: '1rem' }}></i></a>
                                                <a href={author.linkedin} target="_blank" className={classes.icon}><i class="fab fa-linkedin fa-2x" style={{ marginRight: '1rem' }}></i></a>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <img src={author.img} style={{ width: '12rem', height: '15rem' }}></img>
                                    </Hidden>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography
                    variant="subheading"
                    align="center"
                    component="p"
                >
                    All rights are reserved to Or Ben-Aba
        </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}


export default withStyles(styles)(Home);
