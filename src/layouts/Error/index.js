import React from 'react';
import { makeStyles } from '@material-ui/core';
import Footer from 'layouts/Public/components/Footer';

const footerHeight = 60;

const useStyles = makeStyles(() => ({
  root: {
    height: `100vh`,
    minHeight: 700,
  },
}));

const Error = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.root}>{children}</main>
      <Footer height={footerHeight} />
    </React.Fragment>
  );
};

export default Error;
