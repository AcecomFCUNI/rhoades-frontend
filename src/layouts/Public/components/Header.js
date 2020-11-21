import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import logoUni from 'assets/images//logos/logo_uni.svg';

const useStyles = makeStyles((theme) => ({
  headerWrapper: (props) => ({
    backgroundColor: theme.palette.primary.dark,
    height: props.height,
    display: 'flex',
    alignItems: 'center',
  }),
  logoWrapper: {
    marginLeft: '5vw',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  logoUni: {
    width: 70,
    color: theme.palette.white
  },
  logoTitleUni: {
    color: theme.palette.white,
    marginLeft: 20,
    fontSize: 20,
    lineHeight: 1.2,
    width: 100,
    fontFamily: 'Passion One',
    textTransform: 'uppercase'
  }
}));

const Header = ({ height }) => {
  const classes = useStyles({ height });

  return (
    <header className={classes.headerWrapper}>
      <a
        href="https://www.uni.edu.pe/"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.logoWrapper}
      >
        <img alt="logo_uni" src={logoUni} className={classes.logoUni} />
        <Typography variant='subtitle1' className={classes.logoTitleUni}>Universidad Nacional de Ingeniería</Typography>
      </a>
    </header>
  );
};

export default Header;
