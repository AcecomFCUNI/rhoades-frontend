import React from 'react';

import { makeStyles } from '@material-ui/core';

import Footer from './components/Footer';
import Header from './components/Header';

const headerHeight = 140;
const footerHeight = 60;

const useStyles = makeStyles((theme) => ({
  appWrapper: {},
  children: {
    backgroundColor: theme.palette.white,
    height: `calc(100vh - ${headerHeight}px)`,
    minHeight: 500,
    paddingBottom: footerHeight,
  },
}));

const PublicLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.appWrapper}>
      <Header height={headerHeight} />
      <div className={classes.children}>{children}</div>
      <Footer height={footerHeight} />
    </div>
  );
};

export default PublicLayout;
