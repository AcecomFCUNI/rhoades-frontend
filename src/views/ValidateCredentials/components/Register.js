import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Typography, makeStyles, Grid } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: '170px 150px',
  },
  mainTitle: {
    fontSize: '4em',
  },
  secondaryTitle: {
    fontSize: '2em',
    margin: '1rem 0',
  },
  subtitle: {
    fontSize: '1.2em',
  },
  buttonsSection: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  returnHomeButton: {},
  registerButton: {
    color: theme.palette.white,
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <Grid container className={classes.mainContent}>
      <Grid item xs></Grid>
      <Grid item xs>
        <div>
          <Typography variant="h1" className={classes.mainTitle}>
            ¡Enhorabuena!
          </Typography>
          <Typography variant="h2" className={classes.secondaryTitle}>
            Te encuentras inscrito en el padrón electoral
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Para generar tu contraseña, haz click en el siguiente botón.
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Te enviaremos la contraseña a tu correo institucional.
          </Typography>
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
          <Button
            className={classes.registerButton}
            endIcon={<LockRoundedIcon />}
            size="large"
            variant="contained"
            color="primary"
            onClick={returnToHome}
          >
            Generar contraseña
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
export default Register;
