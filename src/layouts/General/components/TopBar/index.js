/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

// import avatarMale from 'assets/images/male2.svg';
// import { useFirebase } from 'react-redux-firebase';

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
  // const { names, lastNames } = useSelector((state) => state.firebase.profile);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const firebase = useFirebase();

  const handleLogout = () => {
    // firebase
    //   .logout()
    //   .then(() => {
    //     history.push('/auth/signin');
    //   })
    //   .catch((err) => alert(err.message));
    history.push('/');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            size="small"
            color="primary"
            edge="start"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <Avatar
          onClick={handleMenu}
          // src={avatarMale}
          className={classes.avatar}
        />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
