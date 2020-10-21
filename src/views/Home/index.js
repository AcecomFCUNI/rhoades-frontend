import React, { useState } from 'react';

import {
  Paper,
  InputBase,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { CustomSwitch } from 'components';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '100px 0',
    backgroundColor: theme.palette.white,
  },
  mainContent: {
    maxWidth: 800,
  },
  textSection: {},
  mainTitle: {
    fontSize: '4em',
    color: theme.palette.black,
  },
  secondaryTitle: {
    fontSize: '1.5em',
    color: theme.palette.black,
    marginTop: '1em',
  },
  searchEmailInputWrapper: {
    display: 'flex',
    margin: '2.5em 0 1.5em 0',
  },
  searchEmailInputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  searchIcon: {
    padding: 10,
  },
  searchEmailInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '2em',
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
  const [switchDNIToCode, setSwitchDNIToCode] = useState(false);

  const handleSwitchDNIToCode = () => setSwitchDNIToCode(!switchDNIToCode);

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
            <Paper
              component="form"
              className={classes.searchEmailInputPaper}
              elevation={0}
            >
              <IconButton
                disabled
                type="submit"
                className={classes.searchIcon}
                aria-label="search-icon"
              >
                <SearchIcon />
              </IconButton>
              {/* TODO: validate the DNI, just 8 characters */}
              {/* TODO: validate the codeUNI, just 9 characters */}
              <InputBase
                spellCheck="false"
                autoFocus
                type="text"
                className={classes.searchEmailInput}
                placeholder={
                  switchDNIToCode ? 'Ingresa tu código UNI' : 'Ingresa tu DNI'
                }
                inputProps={{ 'aria-label': 'verify email' }}
              />
            </Paper>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.searchButton}
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
