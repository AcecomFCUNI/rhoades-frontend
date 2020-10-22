import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, makeStyles, Hidden } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { GeneralAuth } from 'components';
import registerAuthenticationSvg from 'assets/images/undraw/register_authentication.svg';

const useStyles = makeStyles((theme) => ({
  buttonsSection: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
  },
  returnHomeButton: {
    [theme.breakpoints.down('md')]: {
      marginTop: 20,
    },
  },
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
    <GeneralAuth
      mainTitle="
¡Enhorabuena!"
      secondaryTitles={[
        'Usted se encuentra inscrito en el padrón electoral.',
        'Para poder generar su contraseña, haga click en "Generar contraseña".',
      ]}
      subtitle="Le enviaremos su contraseña a su correo institucional.
"
      altImage="register_authentication_svg"
      srcImage={registerAuthenticationSvg}
    >
      <Hidden mdDown>
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
      </Hidden>

      <Hidden lgUp>
        <div className={classes.buttonsSection}>
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
      </Hidden>
    </GeneralAuth>
  );
};
export default Register;
