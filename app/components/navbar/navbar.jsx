import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Typography } from '@material-ui/core';
import { getExistingSession, isAuthenticated } from '../../utils/authentication';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    position: 'relative',
    zIndex: 1400,
  },
  link: {
    marginLeft: '5rem',
  },
  linkSeperator: {
    flexGrow: 1,
  },
  seperator: {
    marginLeft: '3rem',
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const { username: profileText } = isAuthenticated() ? getExistingSession() : 'Login';

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar}>
        <Toolbar position="fixed">
          <Typography variant="h5">
            <Link href="/" color="inherit">
              Skillify
            </Link>
          </Typography>
          <span className={classes.seperator} />
          <Typography variant="h6" className={classes.link}>
            <Link href="/view" color="inherit">
              View
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.link}>
            <Link href="/create" color="inherit">
              Create
            </Link>
          </Typography>
          <span className={classes.linkSeperator} />
          <Button color="inherit" href={profileText ? `/user/${profileText}` : '/login'}>{profileText}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
