import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Typography, makeStyles, Grid } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: '170px 150px',
  },
  mainTitle: {
    fontSize: '4em',
  },
  secondaryTitle: {
    fontSize: '2em',
    margin: '1rem 0',
  },
  subtitle: {
    fontSize: '1.2em',
  },
  buttonsSection: {
    marginTop: '1rem',
  },
  returnHomeButton: {},
  registerButton: {
    color: theme.palette.white,
  },
  emailTo: {
    color: theme.palette.black,
    fontWeight: 'bold',
  },
}));

const Unauthorized = () => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <Grid container className={classes.mainContent}>
      <Grid item xs></Grid>
      <Grid item xs>
        <div>
          <Typography variant="h1" className={classes.mainTitle}>
            ¡Oh, vaya!
          </Typography>
          <Typography variant="h2" className={classes.secondaryTitle}>
            Al parecer no te encuentras inscrito en el padrón electoral
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Si crees que es un error, por favor contactanos a{' '}
            <a className={classes.emailTo} href="mailto:ceuni@uni.edu.pe">
              ceuni@uni.edu.pe
            </a>
            .
          </Typography>
        </div>
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
        </div>
      </Grid>
    </Grid>
  );
};
export default Unauthorized;
