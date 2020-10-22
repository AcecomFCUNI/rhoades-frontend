import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Typography,
  makeStyles,
  Grid,
  Hidden,
} from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { CustomInput } from 'components';
import authenticationSvg from 'assets/images/undraw/login-authentication.svg';

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
    width: 450,
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
  passwordInputWrapper: {
    display: 'flex',
    margin: '2em 0 2em 0',
  },
  loginButton: {
    color: theme.palette.white,
    fontWeight: 'bold',
    marginLeft: '1em',
    width: '10em',
  },
  loginButtonXs: {
    color: theme.palette.white,
  },
  buttonsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  returnHomeButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [typeOfUser, setTypeOfUser] = useState('');

  const returnToHome = () => {
    history.push('/');
  };

  const handleLogin = () => {
    if (typeOfUser === 'student')
      history.push('/student/enroll-list/faculty-third');
    else if (typeOfUser === 'teacher')
      history.push('/teacher/enroll-list-or-candidate/decan');
    else if (typeOfUser === 'admin') history.push('/admin/lists/faculty-third');
  };

  return (
    <div className={classes.mainWrapper}>
      <Grid container className={classes.mainContent}>
        <Hidden smDown>
          <Grid item md={6} container justify="center" alignItems="center">
            <img
              alt="authenticating-password"
              src={authenticationSvg}
              className={classes.authenticationSvg}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="h1" className={classes.mainTitle}>
              Sr(a). (name)
            </Typography>
            <Typography variant="h2" className={classes.secondaryTitle}>
              Te encuentras inscrito como personero para el presente proceso
              electoral
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Ingresa tu contraseña para acceder al sistema.
            </Typography>
          </div>
          <div className={classes.passwordInputWrapper}>
            {/* TODO: trim and lowercase the text */}
            <CustomInput
              icon={<LockRoundedIcon />}
              onChange={(e) => setTypeOfUser(e.target.value)}
              spellCheck="false"
              autoFocus
              type="password"
              placeholder={'Ingresa tu contraseña'}
              inputProps={{ 'aria-label': 'input password' }}
            />
          </div>
          <Hidden xsDown>
            <div className={classes.buttonsSection}>
              <Button
                className={classes.returnHomeButton}
                startIcon={<ArrowBackIosRoundedIcon />}
                size="large"
                variant="outlined"
                color="primary"
                onClick={returnToHome}
              >
                Regresar al inicio
              </Button>
              <Button
                size="large"
                endIcon={<ArrowForwardIosRoundedIcon />}
                variant="contained"
                color="primary"
                className={classes.loginButton}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </div>
          </Hidden>
          <Hidden smUp>
            <div className={classes.buttonsSection}>
              <Button
                fullWidth
                size="large"
                endIcon={<ArrowForwardIosRoundedIcon />}
                variant="contained"
                color="primary"
                className={classes.loginButtonXs}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
              <Button
                fullWidth
                className={classes.returnHomeButton}
                startIcon={<ArrowBackIosRoundedIcon />}
                size="large"
                variant="outlined"
                color="primary"
                onClick={returnToHome}
              >
                Regresar al inicio
              </Button>
            </div>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
