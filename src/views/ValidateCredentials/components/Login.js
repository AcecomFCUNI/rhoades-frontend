import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';

import { Button, Hidden, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';

import { CustomInput, CustomTooltip, GeneralAuth } from 'components';
import { USERS_NAME_COLLECTION } from 'keys';
import { showAlertSnackbar } from 'ducks';
import { LOGIN_SUCCESSFULLY, LOGIN_WITH_WRONG_PASSWORD } from 'tools';

import loginAuthenticationSvg from 'assets/images/undraw/login_authentication.svg';

const useStyles = makeStyles((theme) => ({
  passwordInputWrapper: {
    display: 'flex',
    margin: '1.4em 0',
  },
  loginButton: {
    fontWeight: 'bold',
    marginLeft: '1em',
    width: '10em',
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
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const {
    searchParams: { code, documentType },
    data: { id, mail, names, lastName, secondLastName },
  } = useSelector((state) => state.user);

  const returnToHome = () => history.push('/');

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () =>
    firebase
      .login({ email: mail, password: passwordInput })
      .then(() => {
        firestore
          .collection(USERS_NAME_COLLECTION)
          .doc(id)
          .get()
          .then((doc) => {
            dispatch(showAlertSnackbar(LOGIN_SUCCESSFULLY));
            history.push(`/${doc.data().type.trim()}`);
          });
      })
      .catch(() => dispatch(showAlertSnackbar(LOGIN_WITH_WRONG_PASSWORD)));

  return (
    <GeneralAuth
      mainTitle={`Sr(a). ${lastName}`}
      secondaryTitles={[
        'Usted se encuentra inscrito como personero para el presente proceso electoral.',
      ]}
      subtitles={[
        `Usuario: ${names} ${lastName} ${secondLastName}`,
        `${documentType ? 'Código UNI' : 'DNI, CE u otros'}: ${code}`,
        'Por favor, ingrese su contraseña para acceder al sistema.',
      ]}
      altImage="login_authentication_svg"
      srcImage={loginAuthenticationSvg}
    >
      <div className={classes.passwordInputWrapper}>
        <CustomInput
          beforeicon={
            <IconButton disabled aria-label="password-icon">
              <LockRoundedIcon />
            </IconButton>
          }
          aftericon={
            <CustomTooltip
              placement="left"
              title={
                !showPassword ? 'Mostrar contraseña' : 'Ocultar contraseña'
              }
            >
              <IconButton
                className={classes.icon}
                aria-label="show-hide-icon"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </IconButton>
            </CustomTooltip>
          }
          onChange={(e) => setPasswordInput(e.target.value)}
          value={passwordInput}
          spellCheck="false"
          autoFocus
          type={showPassword ? 'text' : 'password'}
          placeholder={'Ingrese su contraseña'}
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
    </GeneralAuth>
  );
};
export default Login;
