import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  FormControlLabel,
  Hidden,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { CustomSwitch, CustomInput, Spinner } from 'components';
import { showAlertSnackbar, findUserByCodeRequest } from 'ducks';
import { isAValidCodeByRule, formatCodeToRule, ENTER_VALID_DNI_CODE, ENTER_VALID_UNI_CODE } from 'tools';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  mainContent: {
    maxWidth: 800,
    width: 800,
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  // textSection: {},
  mainTitle: {
    fontSize: '3.4em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '3em',
    },
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
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  searchEmailInputWrapper: {
    display: 'flex',
    marginTop: '2.5em',
  },
  searchButton: {
    marginLeft: '1em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  searchButtonMdWrapper: {
    marginTop: 20,
  },
  searchByCodeSwitch: {
    marginTop: 20,
  },
  switchesSection: {
    marginTop: 20,
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // false: UNIcode, true: DNI, CE
  const [switchDniToUniCode, setSwitchDniToUniCode] = useState(false);
  const [uniCodeInput, setUniCodeInput] = useState('');
  const [dniInput, setDniInput] = useState('');

  const { loading } = useSelector((state) => state.user);

  const getSearchButton = (isFullWidth) => (
    <Button
      fullWidth={isFullWidth}
      size="large"
      variant="contained"
      color="primary"
      className={classes.searchButton}
      onClick={handleValidateCredentials}
    >
      Buscar
    </Button>
  );

  const handleSwitchDniToUniCode = () =>
    setSwitchDniToUniCode(!switchDniToUniCode);

  const handleRequestValidateToApi = () => {
    const searchParams = {
      documentType: switchDniToUniCode ? 0 : 1,
      code: switchDniToUniCode ? dniInput : uniCodeInput,
    };
    dispatch(findUserByCodeRequest(searchParams, history));
    handleResetSearchValues();
  };

  const handleResetSearchValues = () => {
    setSwitchDniToUniCode(false);
    setUniCodeInput('');
    setDniInput('');
  };

  const handleValidateCredentials = () => {
    if (!switchDniToUniCode) {
      const match = isAValidCodeByRule(uniCodeInput, 'uni')

      if (match) handleRequestValidateToApi();
      else dispatch(showAlertSnackbar(ENTER_VALID_UNI_CODE));
    } else {
      const match = isAValidCodeByRule(dniInput, 'dni')

      if (match) handleRequestValidateToApi();
      else dispatch(showAlertSnackbar(ENTER_VALID_DNI_CODE));
    }
  };

  const handleValidateUniCode = (event) => setUniCodeInput(formatCodeToRule(event.target.value, 'uni', true))
  const handleValidateDni = (event) => setDniInput(formatCodeToRule(event.target.value, 'dni'))
  const handleSubmitInput = () =>  handleValidateCredentials()

  return loading ? (
    <Spinner />
  ) : (
    <main className={classes.mainWrapper}>
      <div className={classes.mainContent}>
        <div className={classes.textSection}>
          <Typography variant="h1" className={classes.mainTitle}>
            Elecciones UNI 2020
          </Typography>
          <Typography variant="h2" className={classes.secondaryTitle}>
            Verifica si te encuentras en el padrón electoral para poder
            registrarte como personero
          </Typography>
        </div>
        <div className={classes.searchEmailInputWrapper}>
          <CustomInput
            beforeicon={
              <IconButton disabled aria-label="input-icon">
                <SearchIcon />
              </IconButton>
            }
            autoFocus
            type="text"
            placeholder={
              !switchDniToUniCode
                ? 'Ingresa tu código UNI'
                : 'Ingresa tu DNI, CE u otro documento'
            }
            inputProps={{ 'aria-label': 'verify email' }}
            onChange={
              !switchDniToUniCode ? handleValidateUniCode : handleValidateDni
            }
            submitinput={handleSubmitInput}
            value={!switchDniToUniCode ? uniCodeInput : dniInput}
          />
          <Hidden xsDown>{getSearchButton(false)}</Hidden>
        </div>
        <Hidden smUp>
          <div className={classes.searchButtonMdWrapper}>
            {getSearchButton(true)}
          </div>
        </Hidden>
        <div className={classes.switchesSection}>
          <FormControlLabel
            className={classes.switchDniToUniCode}
            control={
              <CustomSwitch
                checked={switchDniToUniCode}
                onChange={handleSwitchDniToUniCode}
                inputProps={{ 'aria-label': 'switcher-dni-code' }}
                name="switch-dni-code"
              />
            }
            label="Buscar por DNI, CE u otro"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
