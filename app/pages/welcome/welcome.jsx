import {
  Button, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
  },
  button: {
    margin: '1rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '40px',
  },
  caption: {
    marginTop: '100px',
  },
}));

const Welcome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >

        <Grid item xs={4} className={classes.caption}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create your journery
              </Typography>
            </Grid>
            <Typography variant="h4" component="h4">
              Navigate your learning
            </Typography>
          </Grid>

        </Grid>

        <Grid item xs={8}>
          <img />
        </Grid>

      </Grid>
    </div>
  );
};

export default Welcome;
