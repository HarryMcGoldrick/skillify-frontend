import {
  Avatar, Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 16,
  },
  avatar: {
    width: 200,
    height: 200,
  },
}));

function UserRewardsDetails() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h5">
          Achievements
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <img className={classes.avatar} />
        </Grid>
        <Grid item xs={4}>
          <img className={classes.avatar} />
        </Grid>
        <Grid item xs={3}>
          <img className={classes.avatar} />
        </Grid>
        <Grid item xs={4}>
          <img className={classes.avatar} />
        </Grid>
        <Grid item xs={4}>
          <img className={classes.avatar} />
        </Grid>
        <Grid item xs={3}>
          <img className={classes.avatar} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserRewardsDetails;
