import React from 'react';

import { makeStyles } from '@material-ui/core';
import logoUni from 'assets/images//logos/logo_uni.png';

const useStyles = makeStyles((theme) => ({
  headerWrapper: (props) => ({
    backgroundColor: theme.palette.primary.main,
    height: props.height,
    display: 'flex',
    alignItems: 'center',
  }),
  logoWrapper: {
    marginLeft: 115,
  },
}));

const Header = ({ height }) => {
  const classes = useStyles({ height });

  return (
    <header className={classes.headerWrapper}>
      <div className={classes.logoWrapper}>
        <a
          href="https://www.uni.edu.pe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt="logo_uni" src={logoUni} />
        </a>
      </div>
    </header>
  );
};

export default Header;
