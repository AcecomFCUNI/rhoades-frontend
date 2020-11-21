import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { NavBar, TopBar } from './components';

const topbarHeight = 64;
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  topBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%',
    },
  },
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'auto',
  },
  navBar: {
    width: drawerWidth,
    minWidth: drawerWidth,
  },
  content: {
    margin: `${topbarHeight}px auto`,
    padding: theme.spacing(3),
    minHeight: 400
  },
}));

const GeneralLayout = ({ roleLabel, navigationConfig, children }) => {
  const classes = useStyles();

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <NavBar
        roleLabel={roleLabel}
        navigationConfig={navigationConfig}
        className={classes.navBar}
        onMobileClose={handleNavBarMobileClose}
        openMobile={openNavBarMobile}
        onMobileOpen={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <TopBar
          className={classes.topBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

export default GeneralLayout;
