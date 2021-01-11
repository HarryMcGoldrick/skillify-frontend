import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, IconButton, Link, Menu, MenuItem, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getExistingSession, isAuthenticated, logOut } from '../../utils/authentication';

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
}));

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
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
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
          {!isAuthenticated() && (<Button color="inherit" href="/login">Login</Button>)}

          {isAuthenticated() && (
            <div>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AccountCircle />}
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
