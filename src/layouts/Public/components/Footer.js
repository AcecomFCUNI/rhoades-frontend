import React from 'react';

import { Typography, makeStyles } from '@material-ui/core';

import logoAcecom from 'assets/images/logos/logo_acecom.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: '30px 200px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  sectionAcecom: {
    display: 'flex',
    alignItems: 'center',
  },
  logoAcecom: {
    width: 40,
  },
  textAcecom: {
    fontSize: 20,
    fontFamily: 'Nunito',
    fontWeight: 400,
    marginLeft: 20,
  },
  sectionExtra: {
    width: 200,
    height: 100,
  },
  urlAcecom: {
    color: theme.palette.black,
    fontWeight: 'bold',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.sectionAcecom}>
        <a
          href="https://acecom-web.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="logo_acecom"
            src={logoAcecom}
            className={classes.logoAcecom}
          />
        </a>
        <Typography variant="subtitle1" className={classes.textAcecom}>
          Powered by{' '}
          <a
            href="https://acecom-web.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.urlAcecom}
          >
            ACECOM
          </a>
        </Typography>
      </div>
      <div className={classes.sectionExtra}></div>
    </footer>
  );
};

export default Footer;
