import React from 'react';
import { renderRoutes } from 'react-router-config';

import { makeStyles } from '@material-ui/core';

import Footer from 'layouts/Public/components/Footer';

const footerHeight = 60;

const useStyles = makeStyles(() => ({
  root: {
    height: `100vh`,
    minHeight: 700,
  },
}));

const Error = ({ route }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.root}>{renderRoutes(route.routes)}</main>
      <Footer height={footerHeight} />
    </React.Fragment>
  );
};

export default Error;
