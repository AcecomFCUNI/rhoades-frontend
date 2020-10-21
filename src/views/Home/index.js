import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  FormControlLabel,
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
    paddingBottom: 150,
    paddingTop: 150,
  },
  mainContent: {
    maxWidth: 800,
  },
  textSection: {},
  mainTitle: {
    fontSize: '4em',
  },
  secondaryTitle: {
    fontSize: '1.5em',
    marginTop: '1rem',
  },
  searchEmailInputWrapper: {
    display: 'flex',
    margin: '2.5em 0 1.5em 0',
  },
  searchButton: {
    color: theme.palette.white,
    fontWeight: 'bold',
    marginLeft: '1em',
    width: '10em',
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [switchDNIToCode, setSwitchDNIToCode] = useState(false);

  const handleSwitchDNIToCode = () => setSwitchDNIToCode(!switchDNIToCode);
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
              Lorem Ipsum is simply
            </Typography>
            <Typography variant="h2" className={classes.secondaryTitle}>
              Verifica si te encuentras en el padrón electoral para poder
              registrarte como personero
            </Typography>
          </div>
          <div className={classes.searchEmailInputWrapper}>
            <CustomInput
              icon={<SearchIcon />}
              spellCheck="false"
              autoFocus
              type="text"
              placeholder={
                switchDNIToCode ? 'Ingresa tu código UNI' : 'Ingresa tu DNI'
              }
              inputProps={{ 'aria-label': 'verify email' }}
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.searchButton}
              onClick={validateCredentials}
            >
              Buscar
            </Button>
          </div>
          <div>
            <FormControlLabel
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
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
