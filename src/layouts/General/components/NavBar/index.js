import React, { Fragment, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Drawer,
  Divider,
  Paper,
  Avatar,
  Typography,
  Button,
  Hidden,
  Chip,
} from '@material-ui/core';
import clsx from 'clsx';

import { Navigation } from 'components';
// import { useFirebase } from 'react-redux-firebase';
import hirefLogo from 'assets/images/logos/logo_uni.png';
// import avatarMale from 'assets/images/male2.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    backgroundColor: theme.palette.custom.primary.main,
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
    width: 80,
    height: 80,
    backgroundColor: theme.palette.primary.light,
  },
  name: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.custom.white,
  },
  email: {
    color: theme.palette.custom.white,
    marginTop: theme.spacing(1),
  },
  role: {
    margin: theme.spacing(1.5),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.custom.white,
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
  className,
  ...rest
}) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  // const firebase = useFirebase();
  const { names, lastNames, email, commercial_name } = useSelector(
    (state) => state.firebase.profile
  );

  const handleLogout = () => {
    // firebase
    //   .logout()
    //   .then(() => {
    //     history.push('/auth/signin');
    //   })
    //   .catch((err) => alert(err.message));
    history.push('/');
  };

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar alt="Person" className={classes.avatar} />
        {names && lastNames && (
          <Typography className={classes.name} variant="h4">
            {names} {lastNames}
          </Typography>
        )}
        {commercial_name && (
          <Typography className={classes.name} variant="h4">
            {commercial_name}
          </Typography>
        )}
        <Typography className={classes.email} variant="subtitle2">
          {email}
        </Typography>
        <Chip label={roleLabel} size="small" className={classes.role} />
      </div>
      <Button
        size="small"
        style={{ marginTop: 10 }}
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
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
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <img
            alt="hirefLogo"
            src={hirefLogo}
            className={classes.logo}
            onClick={() => history.push('/')}
          />
          <Divider />
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          <img
            alt="hirefLogo"
            src={hirefLogo}
            className={classes.logo}
            onClick={() => history.push('/')}
          />
          <Divider />
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

export default NavBar;
