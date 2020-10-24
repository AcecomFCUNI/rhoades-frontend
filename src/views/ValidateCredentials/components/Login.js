import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, makeStyles, Hidden } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { CustomInput, GeneralAuth } from 'components';
import loginAuthenticationSvg from 'assets/images/undraw/login_authentication.svg';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  passwordInputWrapper: {
    display: 'flex',
    margin: '1.4em 0',
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
  const {
    searchParams: { code, documentType },
    data: { names, lastName, secondLastName },
  } = useSelector((state) => state.user);

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
          icon={<LockRoundedIcon />}
          onChange={(e) => setTypeOfUser(e.target.value)}
          spellCheck="false"
          autoFocus
          type="password"
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
