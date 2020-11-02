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

const NoEmail = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <GeneralAuth
      mainTitle="¡Oh, vaya!"
      secondaryTitles={[
        'No se puede continuar con el registro.',
        'Usted no posee un correo electrónico asociado a sus datos inscritos en el padrón electoral.',
      ]}
      subtitles={['Por favor contáctese con el centro a:']}
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
export default NoEmail;
