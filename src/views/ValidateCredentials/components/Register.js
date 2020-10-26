import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Hidden,
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { GeneralAuth } from 'components';
import registerAuthenticationSvg from 'assets/images/undraw/register_authentication.svg';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordToEmailFromUserRequest } from 'ducks';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    loading,
    searchParams: { code, documentType, condition },
    data: { id, names, lastName, secondLastName },
  } = useSelector((state) => state.user);

  const getReturnToHomeButton = () => (
    <Button
      className={classes.returnHomeButton}
      startIcon={<ArrowBackIosRoundedIcon />}
      size="large"
      variant="outlined"
      color="primary"
      onClick={handleReturnToHome}
    >
      Regresar al inicio
    </Button>
  );

  const getGeneratePasswordButton = () => (
    <Button
      className={classes.registerButton}
      endIcon={<LockRoundedIcon />}
      size="large"
      variant="contained"
      color="primary"
      onClick={handleGeneratePassword}
    >
      Generar contraseña
    </Button>
  );

  const handleReturnToHome = () => history.push('/');

  const handleGeneratePassword = () => {
    const params = {
      id,
      condition,
      documentType,
      code,
    };

    dispatch(sendPasswordToEmailFromUserRequest(params, history));
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <GeneralAuth
        mainTitle={`
        Sr(a). ${lastName}`}
        secondaryTitles={[
          'Usted se encuentra inscrito en el padrón electoral.',
          'Para poder generar su contraseña, haga click en "Generar contraseña".',
        ]}
        subtitles={[
          `Usuario: ${names} ${lastName} ${secondLastName}`,
          `${documentType ? 'Código UNI' : 'DNI, CE u otros'}: ${code}`,
          'Le enviaremos su contraseña a su correo institucional (o a su correo opcional).',
        ]}
        altImage="register_authentication_svg"
        srcImage={registerAuthenticationSvg}
      >
        <Hidden mdDown>
          <div className={classes.buttonsSection}>
            {getReturnToHomeButton()}
            {getGeneratePasswordButton()}
          </div>
        </Hidden>
        <Hidden lgUp>
          <div className={classes.buttonsSection}>
            {getGeneratePasswordButton()}
            {getReturnToHomeButton()}
          </div>
        </Hidden>
      </GeneralAuth>
    </React.Fragment>
  );
};
export default Register;
