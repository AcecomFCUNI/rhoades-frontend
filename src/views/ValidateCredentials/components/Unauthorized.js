import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import { GeneralAuth } from 'components';
import notAuthorizedInRegister from 'assets/images/undraw/not_authorized_in_register.svg';

const useStyles = makeStyles((theme) => ({
  buttonsSection: {
    marginTop: '1rem',
  },
  emailTo: {
    color: theme.palette.black,
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginTop: '1rem',
  },
}));

const Unauthorized = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <GeneralAuth
      mainTitle="
      ¡Oh, vaya!"
      secondaryTitles={[
        'Usted no se encuentra inscrito en el padrón electoral',
      ]}
      subtitle={['Si crees que es un error, por favor no dude contactarnos a:']}
      altImage="not_authorized_in_register_svg"
      srcImage={notAuthorizedInRegister}
    >
      <Typography variant="subtitle1">
        <a className={classes.emailTo} href="mailto:ceuni@uni.edu.pe">
          ceuni@uni.edu.pe
        </a>
      </Typography>

      <div className={classes.buttonsSection}>
        <Button
          fullWidth={isMobile}
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
    </GeneralAuth>
  );
};
export default Unauthorized;
