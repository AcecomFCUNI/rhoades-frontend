/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Hidden,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Breadcrumbs,
  Link,
  Button,
} from '@material-ui/core';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import clsx from 'clsx';
import { showAlertSnackbar } from 'ducks';

import { useFirebase } from 'react-redux-firebase';

import { LOGOUT_WITH_ERROR } from 'tools';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },

  logoutButton: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const TopBar = ({ onOpenNavBarMobile, className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleLogout = () =>
    firebase
      .logout()
      .then(() => {
        history.push('/');
      })
      .catch(() => dispatch(showAlertSnackbar(LOGOUT_WITH_ERROR)));

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton size="small" edge="start" onClick={onOpenNavBarMobile}>
            <MenuRoundedIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <Hidden mdUp>
          <IconButton onClick={handleLogout}>
            <ExitToAppRoundedIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Salir
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
