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
    [theme.breakpoints.down('lg')]: {
      width: 320,
    },
    [theme.breakpoints.down('md')]: {
      width: 350,
    },
  },
  mainTitle: {
    fontSize: '2.8em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '2.3em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.4em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
    },
  },
  secondaryTitle: {
    marginTop: '0.6rem',
    fontSize: '1.35em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.1em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  subtitleSection: {
    marginTop: '1rem',
  },
  subtitle: {
    marginTop: '0.05rem',
    fontSize: '1.1em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.9em',
    },
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
  reverse = false,
  mainTitle,
  secondaryTitles,
  subtitles,
  altImage,
  srcImage,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <Grid container className={classes.mainContent}>
      {!reverse && <Hidden smDown>
          <Grid item md={6} container justify="center" alignItems="center">
            <img
              alt={altImage}
              src={srcImage}
              className={classes.authenticationSvg}
            />
          </Grid>
        </Hidden>}
        <Grid item container alignItems="center" xs={12} md={6}>
          <div className={classes.rightSideWrapper}>
            <div className={classes.textSection}>
              <Typography variant="h1" className={classes.mainTitle}>
                {mainTitle}
              </Typography>

              {secondaryTitles.map((secTitle, index) => (
                <Typography
                  key={`${secTitle}-${index}`}
                  variant="h2"
                  className={classes.secondaryTitle}
                >
                  {secTitle}
                </Typography>
              ))}
              <div className={classes.subtitleSection}>
                {subtitles.map((subtitle, index) => (
                  <Typography
                    key={`${subtitle}-${index}`}
                    variant="subtitle1"
                    className={classes.subtitle}
                  >
                    {subtitle}
                  </Typography>
                ))}
              </div>
            </div>
            {children}
          </div>
        </Grid>
        {reverse && <Hidden smDown>
          <Grid item md={6} container justify="center" alignItems="center">
            <img
              alt={altImage}
              src={srcImage}
              className={classes.authenticationSvg}
            />
          </Grid>
        </Hidden>}
      </Grid>
    </div>
  );
};
export default GeneralAuth;
