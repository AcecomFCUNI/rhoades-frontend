import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

const Error = ({ children }) => {
  const classes = useStyles();

  return <main className={classes.root}>{children}</main>;
};

export default Error;
