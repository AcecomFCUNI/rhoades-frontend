import React from 'react';

import { Typography, makeStyles } from '@material-ui/core';

import logoAcecom from 'assets/images/logos/logo_acecom.png';

const useStyles = makeStyles((theme) => ({
  footer: (props) => ({
    backgroundColor: theme.palette.custom.white,
    minHeight: props.height,
    position: 'fixed',
    width: '100%',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  }),
  sectionAcecom: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  logoAcecom: {
    width: '1.8em',
  },
  textAcecom: {
    fontSize: '1.1em',
    fontFamily: 'Nunito',
    fontWeight: 400,
    marginLeft: '1.25em',
  },
  sectionExtra: {
    width: 200,
    // height: 100,
  },
  urlAcecom: {
    color: theme.palette.black,
    fontWeight: 'bold',
  },
}));

const Footer = ({ height }) => {
  const classes = useStyles({ height });

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
      {/* <div className={classes.sectionExtra}></div> */}
    </footer>
  );
};

export default Footer;
