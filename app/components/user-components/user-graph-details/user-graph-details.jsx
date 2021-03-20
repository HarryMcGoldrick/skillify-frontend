import {
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 16,
  },
  img: {
    width: 200,
    height: 200,
  },
}));

function UserGraphDetails() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            Created Maps
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <img className={classes.img} />
          </Grid>
          <Grid item xs={4}>
            <img className={classes.img} />
          </Grid>
          <Grid item xs={3}>
            <img className={classes.img} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            Active Maps
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <img className={classes.img} />
          </Grid>
          <Grid item xs={4}>
            <img className={classes.img} />
          </Grid>
          <Grid item xs={3}>
            <img className={classes.img} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserGraphDetails;
