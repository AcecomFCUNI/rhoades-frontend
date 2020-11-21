import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Hidden,
  Backdrop,
  CircularProgress,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import { GeneralAuth } from 'components';
import { sendPasswordToEmailFromUserRequest } from 'ducks';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  genderSelector: {
    marginTop: 10
  }
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, searchParams, data } = useSelector((state) => state.user);

  // destructuring
  const { names, lastName, secondLastName } = data;
  const { code, documentType } = searchParams;
  const [gender, setGender] = useState('M')

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

  const handleGeneratePassword = () =>  dispatch(sendPasswordToEmailFromUserRequest({data, gender}))

  const handleChangeGender = (event) => setGender(event.target.value)

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
          'Por favor seleccione su género a continuación:',
        ]}
        altImage="register_authentication_svg"
        srcImage={registerAuthenticationSvg}
      >
        <RadioGroup aria-label="select-gender" value={gender} onChange={handleChangeGender} row className={classes.genderSelector}>
          <FormControlLabel value="M" control={<Radio size='small' color='primary' />} label="Masculino" />
          <FormControlLabel value="F" control={<Radio size='small' color='primary' />} label="Femenino" />
        </RadioGroup>
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
