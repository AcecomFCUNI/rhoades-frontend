import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Typography, makeStyles, Grid } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { CustomInput } from 'components';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: '115px 150px',
  },
  mainTitle: {
    fontSize: '4em',
  },
  secondaryTitle: {
    fontSize: '2em',
    marginTop: '1rem',
  },
  subtitle: {
    fontSize: '1.2em',
    marginTop: '1rem',
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
  buttonsSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  returnHomeButton: {},
  registerButton: {
    color: theme.palette.white,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  const handleLogin = () => {
    console.log('logged');
  };

  return (
    <Grid container className={classes.mainContent}>
      <Grid item xs>
        An image
      </Grid>
      <Grid item xs>
        <div>
          <Typography variant="h1" className={classes.mainTitle}>
            ¡Bienvenido, (name) !
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
          <CustomInput
            icon={<LockRoundedIcon />}
            spellCheck="false"
            autoFocus
            type="password"
            placeholder={'Ingresa tu contraseña'}
            inputProps={{ 'aria-label': 'input password' }}
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        </div>
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
        </div>
      </Grid>
    </Grid>
  );
};
export default Login;
