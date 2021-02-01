import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, useFirebase, useFirestore } from 'react-redux-firebase';

import { Button, Hidden, IconButton, makeStyles } from '@material-ui/core';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import { CustomInput, CustomInputPassword, GeneralAuth } from 'components'
import { USERS_NAME_COLLECTION } from 'keys';
import { showAlertSnackbar } from 'ducks';
import { LOGIN_SUCCESSFULLY, ENTER_WRONG_CREDENTIALS } from 'tools';
import adminLoginSvg from 'assets/images/undraw/admin_login.svg'

const useStyles = makeStyles(theme => ({
  inputUserPassword: {
    margin: '20px 0',
  },
  buttonsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  loginButton: {
    fontWeight: 'bold',
    marginLeft: '1em',
    width: '10em',
  },
  returnHomeButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
}))

const SignInAdmin = () => {
  const classes = useStyles()
  const history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const profile = useSelector((state) => state.firebase.profile);


  const returnToHome = () => history.push('/');

  const handleLogin = () =>
    firebase
      .login({ email: credentials.email, password: credentials.password })
      .then((creds) => 
        firestore
          .collection(USERS_NAME_COLLECTION)
          .doc(creds.user.user.uid)
          .get()
          .then(() => {
            dispatch(showAlertSnackbar(LOGIN_SUCCESSFULLY));
            history.push('/admin');
          })
      )
      .catch(() => dispatch(showAlertSnackbar(ENTER_WRONG_CREDENTIALS)));

  return (!isEmpty(profile) && profile.condition=== 'admin' ? 
    <Redirect to={`/${profile.condition}`} /> :
    <GeneralAuth  
      mainTitle='Administrador' 
      secondaryTitles={['Usted se encuentra como miembro del comité electoral']} 
      subtitles={['Por favor ingrese las credenciales de la cuenta de comité electoral']} 
      altImage='administrador-imagen' 
      srcImage={adminLoginSvg}
    >
        <div className={classes.inputUserPassword}>
          <CustomInput  
            beforeicon={
              <IconButton disabled aria-label="user-icon">
                <PersonRoundedIcon />
              </IconButton>
            }
            autoFocus
            onChange={(e) => setCredentials({
              ...credentials,
              email: e.target.value
            })}
            value={credentials.email}
            type='email'
            placeholder='Ingrese su correo electrónico'
            inputProps={{ 'aria-label': 'user-admin-input' }}
          />
          <CustomInputPassword
            onChange={(e) => 
                setCredentials({
                  ...credentials,
                password: e.target.value
              })
            }
            submitinput={handleLogin}
            value={credentials.password}
            placeholder='Ingrese su contraseña'
            inputProps={{ 'aria-label': 'password-admin-input' }}
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
  )
}

export default SignInAdmin
