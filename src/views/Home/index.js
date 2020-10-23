import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  FormControlLabel,
  Hidden,
  makeStyles,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { CustomSwitch, CustomInput } from 'components';

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
    color: theme.palette.white,
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
  switchCondition: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  // false: DNI or CE, true: UNIcode
  const [switchDniToUniCode, setSwitchDniToUniCode] = useState(false);

  // false: student, true: teacher
  const [switchCondition, setSwitchCondition] = useState(false);
  const [uniCodeInput, setUniCodeInput] = useState('');
  const [dniInput, setDniInput] = useState('');

  const handleSwitchDniToUniCode = () =>
    setSwitchDniToUniCode(!switchDniToUniCode);

  const handleSwitchCondition = () => {
    setSwitchCondition(!switchCondition);
  };

  const handleValidateCredentials = () => {
    if (switchDniToUniCode) {
      const uniCodeRegex = /^[0-9]{8}[A-Z]$/;

      const match = uniCodeRegex.test(uniCodeInput);
      if (match) {
        history.push('/validate-credentials');
      } else alert('Por favor, ingrese un código válido');
    } else {
      const dniRegex = /^[0-9]{8}$/;
      const match = dniRegex.test(dniInput);

      if (match) {
        history.push('/validate-credentials');
      } else alert('Por favor, ingrese un documento válido');
    }
  };

  const handleValidateUniCode = (event) => {
    const charactersLimit = 9;
    const uniCode = event.target.value;
    const uniCodeUpperCase = uniCode.toUpperCase();

    if (uniCodeUpperCase.length > charactersLimit)
      setUniCodeInput(uniCodeUpperCase.slice(0, charactersLimit));
    else setUniCodeInput(uniCodeUpperCase);
  };

  const handleValidateDni = (event) => {
    const charactersLimit = 8;
    const dni = event.target.value;

    if (dni.length > charactersLimit)
      setDniInput(dni.slice(0, charactersLimit));
    else setDniInput(dni);
  };

  return (
    <React.Fragment>
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
            {/* TODO: trim and lowercase the text */}
            <CustomInput
              icon={<SearchIcon />}
              spellCheck="false"
              autoFocus
              maxLength="9"
              type="text"
              placeholder={
                switchDniToUniCode
                  ? 'Ingresa tu código UNI'
                  : 'Ingresa tu DNI, CE u otro documento'
              }
              inputProps={{ 'aria-label': 'verify email' }}
              onChange={
                switchDniToUniCode ? handleValidateUniCode : handleValidateDni
              }
              value={switchDniToUniCode ? uniCodeInput : dniInput}
            />
            <Hidden xsDown>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className={classes.searchButton}
                onClick={handleValidateCredentials}
              >
                Buscar
              </Button>
            </Hidden>
          </div>

          <Hidden smUp>
            <div className={classes.searchButtonMdWrapper}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.searchButton}
                onClick={handleValidateCredentials}
              >
                Buscar
              </Button>
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
              label="Buscar por código UNI"
            />
            <FormControlLabel
              className={classes.switchCondition}
              control={
                <CustomSwitch
                  checked={switchCondition}
                  onChange={handleSwitchCondition}
                  inputProps={{ 'aria-label': 'switcher-condition' }}
                  name="switch-condition"
                />
              }
              label="Soy docente"
            />
          </div>
        </div>
        {/* {codeUNIRegex.test('20184159B') ? 'si es valido' : 'no es valido'} */}
      </main>
    </React.Fragment>
  );
};

export default Home;
