import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, IconButton, Link, Menu, MenuItem, Typography,
} from '@material-ui/core';
import { AccountCircle, AddCircle, Visibility } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getExistingSession, isAuthenticated, logOut } from '../../utils/authentication';
import icon from '../../assets/icon.png';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    position: 'relative',
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
  icon: {
    width: 40,
    height: 40,
  },
  button: {
    fontSize: '1.2rem',
  },
}));

/*
  Navigation bar that is displayed at the top of every page.
  Used to navigate to the View and Create pages.
*/

export const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const open = Boolean(anchorEl);

  const { username } = isAuthenticated() ? getExistingSession() : '';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    handleClose();
    history.push(`/user/${username}`);
  };

  const handleLogout = () => {
    logOut();
    handleClose();
    // Force page to refresh
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{ paddingLeft: 200, paddingRight: 200 }}>
        <Toolbar position="fixed">
          <img src={icon} className={classes.icon} />
          <span className={classes.seperator} />

          <Typography variant="h5">
            <Link href="/" color="inherit">
              Skillify
            </Link>
          </Typography>
          <span className={classes.seperator} />
          <Typography variant="h6" className={classes.link}>
            <Link href="/view" color="inherit">
              <Button
                disableElevation
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Visibility fontSize="large" />}
              >
                {' '}
                View
                {' '}

              </Button>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.link}>
            <Link href="/create" color="inherit">
              <Button
                disableElevation
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddCircle fontSize="large" />}
              >
                {' '}
                Create
                {' '}

              </Button>
            </Link>
          </Typography>
          <span className={classes.linkSeperator} />
          {!isAuthenticated() && (<Button color="inherit" href="/login">Login</Button>)}

          {isAuthenticated() && (
            <div>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AccountCircle fontSize="large" />}
                onClick={handleMenu}
              >
                {username}
              </Button>
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
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
