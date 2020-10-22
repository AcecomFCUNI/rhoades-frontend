import React from 'react';

import { Typography, makeStyles, Grid, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  mainContent: {
    maxWidth: 1600,
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  authenticationSvg: {
    width: 400,
    [theme.breakpoints.down('md')]: {
      width: 350,
    },
  },
  mainTitle: {
    fontSize: '4em',
    [theme.breakpoints.down('md')]: {
      fontSize: '3.2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.8em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
    },
  },
  secondaryTitle: {
    fontSize: '1.4em',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  subtitle: {
    fontSize: '1.15em',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85em',
    },
  },
  rightSideWrapper: {
    width: '100%',
  },
}));

const GeneralAuth = ({
  mainTitle,
  secondaryTitles,
  subtitle,
  altImage,
  srcImage,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <Grid container className={classes.mainContent}>
        <Hidden smDown>
          <Grid item md={6} container justify="center" alignItems="center">
            <img
              alt={altImage}
              src={srcImage}
              className={classes.authenticationSvg}
            />
          </Grid>
        </Hidden>
        <Grid item container alignItems="center" xs={12} md={6}>
          <div className={classes.rightSideWrapper}>
            <div className={classes.textSection}>
              <Typography variant="h1" className={classes.mainTitle}>
                {mainTitle}
              </Typography>

              {secondaryTitles.map((secTitle, index) => (
                <Typography
                  key={index}
                  variant="h2"
                  className={classes.secondaryTitle}
                >
                  {secTitle}
                </Typography>
              ))}
              <Typography variant="subtitle1" className={classes.subtitle}>
                {subtitle}
              </Typography>
            </div>
            {children}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default GeneralAuth;
