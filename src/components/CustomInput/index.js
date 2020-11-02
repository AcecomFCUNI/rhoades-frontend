import React from 'react';

import { Paper, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    fontFamily: 'Nunito',
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '1.4em',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.95em',
    },
  },
}));

const CustomInput = (props) => {
  const classes = useStyles();
  const { aftericon = null, beforeicon = null } = props;

  return (
    <Paper component="form" className={classes.inputPaper} elevation={0}>
      {beforeicon}
      <InputBase className={classes.input} {...props} spellCheck={false} />
      {aftericon}
    </Paper>
  );
};

export default CustomInput;
