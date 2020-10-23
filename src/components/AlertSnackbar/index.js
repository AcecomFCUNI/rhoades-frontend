import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar, Typography, makeStyles } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import { hideAlertSnackbar } from 'ducks';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  message: {
    fontWeight: 'bold',
    color: theme.palette.white,
  },
}));

const AlertSnackbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { severity, message, open, options } = useSelector(
    (state) => state.alertSnackbar
  );

  const handleCloseAlertSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideAlertSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={options.position}
      open={open}
      autoHideDuration={options.duration}
      onClose={handleCloseAlertSnackbar}
    >
      <Alert onClose={handleCloseAlertSnackbar} severity={severity}>
        <Typography variant="subtitle2" className={classes.message}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
