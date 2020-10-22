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
    // width: '10em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      // marginTop: '1.5em',
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

  const [switchDNIToCode, setSwitchDNIToCode] = useState(false);

  // false: student, true: teacher
  const [switchCondition, setSwitchCondition] = React.useState(false);

  const handleSwitchDNIToCode = () => setSwitchDNIToCode(!switchDNIToCode);

  const handleSwitchCondition = () => {
    setSwitchCondition(!switchCondition);
  };

  const validateCredentials = () => {
    history.push('/validate-credentials');
  };

  return (
    <React.Fragment>
      <main className={classes.mainWrapper}>
        <div className={classes.mainContent}>
          <div className={classes.textSection}>
            {/* TODO: set the title and subtitle */}
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
              type="text"
              placeholder={
                switchDNIToCode
                  ? 'Ingresa tu código UNI'
                  : 'Ingresa tu DNI, CE u otro documento'
              }
              inputProps={{ 'aria-label': 'verify email' }}
            />
            <Hidden xsDown>
              <Button
                size="large"
                variant="contained"
                color="primary"
                className={classes.searchButton}
                onClick={validateCredentials}
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
                onClick={validateCredentials}
              >
                Buscar
              </Button>
            </div>
          </Hidden>
          <div className={classes.switchesSection}>
            <FormControlLabel
              className={classes.switchDNIToCode}
              control={
                <CustomSwitch
                  checked={switchDNIToCode}
                  onChange={handleSwitchDNIToCode}
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
      </main>
    </React.Fragment>
  );
};

export default Home;
