import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles, Typography } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import * as tools from 'tools'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    minHeight: '450',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2.3em',
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5em',
      margin: '0 16px',
    },
  },
  image: {
    margin: '30px 0',
    maxWidth: 400,
    width: 400,
    [theme.breakpoints.down('lg')]: {
      width: 300,
    },
    [theme.breakpoints.down('md')]: {
      width: 350,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  returnHomeButton: {
    color: theme.palette.white,
    fontWeight: 'bold',
  },
}));

const GeneralError = ({ title, subtitle, altImage, srcImage }) => {
  const classes = useStyles();
  const history = useHistory();
  const profile = useSelector(state => state.firebase.profile)

  const returnToHome = () => {
    const currentUser = tools.getCookie(tools.USER_KEY)
    // not logged in
    if(!profile.condition) {
      // there is user saved or not on cookies
      if(!currentUser) history.push('/')
      else {
        if(currentUser.data.condition === 'student' || currentUser.data.condition === 'teacher') history.push('/validate-credentials')
        else history.push('/')
      }
    }

    // already logged in
    if(profile.condition === 'admin') history.push('/admin')
    else if(profile.condition === 'student' || profile.condition === 'teacher') history.push('/procurator')
  };

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.mainContent}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
        <img alt={altImage} src={srcImage} className={classes.image} />
        <Button
          startIcon={<HomeRoundedIcon />}
          size="large"
          variant="contained"
          color="primary"
          className={classes.returnHomeButton}
          onClick={returnToHome}
        >
          Regresar al inicio
        </Button>
      </div>
    </div>
  );
};

export default GeneralError;
