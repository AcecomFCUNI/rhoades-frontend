import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '3em',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5em',
    },
  },
  image: {
    maxWidth: 700,
    width: 700,
    [theme.breakpoints.down('md')]: {
      width: 500,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  returnHomeButton: {
    color: theme.palette.white,
    fontWeight: 'bold',
    marginTop: 70,
  },
}));

const GeneralError = ({ title, subtitle, altImage, srcImage }) => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <div className={classes.mainWrapper}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <img alt={altImage} src={srcImage} className={classes.image} />
      <Button
        size="large"
        variant="contained"
        color="primary"
        className={classes.returnHomeButton}
        onClick={returnToHome}
      >
        Regresar al inicio
      </Button>
    </div>
  );
};

export default GeneralError;
