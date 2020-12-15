import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    alignItems: 'center',
    background: '#F4FAFF',
    boxShadow: 'none',
    position: 'relative',
    zIndex: 1400,
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar}>
        <Container maxWidth="md">
          <Toolbar gutters={false} position="fixed" />
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
