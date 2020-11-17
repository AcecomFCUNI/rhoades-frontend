import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  SwipeableDrawer,
  Divider,
  Paper,
  Avatar,
  Typography,
  Hidden,
  Chip,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

import { Navigation } from 'components';
// import uniLogo from 'assets/images/logos/logo_uni.png';
import { splitNamesAndGetOne } from 'tools';

import maleSvg from 'assets/images/avatars/male2.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.custom.white,
  },
  content: {
    padding: theme.spacing(2),
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.warning.light,
  },
  name: {
    marginTop: theme.spacing(1),
    color: theme.palette.custom.white,
  },
  role: {
    margin: theme.spacing(1.5),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.white,
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    marginTop: theme.spacing(2),
  },
  logo: {
    cursor: 'pointer',
    width: '80px',
    marginLeft: '10px',
  },
}));

const NavBar = ({
  roleLabel,
  navigationConfig,
  openMobile,
  onMobileClose,
  onMobileOpen,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { names, lastName, UNICode } = useSelector(
    (state) => state.firebase.profile
  );

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar alt="Person" src={maleSvg} className={classes.avatar} />
        {names && lastName && (
          <Typography className={classes.name} variant="h4">
            {splitNamesAndGetOne(names)} {lastName}
          </Typography>
        )}
        <Chip label={UNICode} size="small" className={classes.role} />
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig.map((list) => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          anchor="left"
          onClose={onMobileClose}
          onOpen={onMobileOpen}
          open={openMobile}
          variant="temporary"
        >
          <Typography
            variant="h3"
            style={{
              fontWeight: 'bolder',
              textAlign: 'center',
              color: 'white',
              padding: 10,
            }}
          >
            Elecciones UNI 2020
          </Typography>
          <Divider />
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          <Typography
            variant="h3"
            style={{
              fontWeight: 'bolder',
              textAlign: 'center',
              color: 'white',
              padding: 10,
            }}
          >
            Elecciones UNI 2020
          </Typography>
          <Divider />
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

export default NavBar;
