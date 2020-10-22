import React from 'react';

import {
  Paper,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '1.9em',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.95em',
    },
  },
}));

const CustomInput = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper component="form" className={classes.inputPaper} elevation={0}>
      <IconButton
        disabled
        type="submit"
        className={classes.icon}
        aria-label="input-icon"
      >
        {props.icon}
      </IconButton>
      {/* TODO: validate the DNI, just 8 characters */}
      {/* TODO: validate the codeUNI, just 9 characters */}
      <InputBase className={classes.input} {...props} />
    </Paper>
  );
};

export default CustomInput;
