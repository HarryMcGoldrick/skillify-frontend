import {
  Avatar, Chip, Grid, IconButton, makeStyles, Paper, Typography,
} from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 200,
    height: 200,
    margin: 16,
  },
  detailsTitle: {
    marginLeft: 64,
    marginTop: 16,
  },
  details: {
    marginLeft: 64,
    marginTop: 32,
  },
  hr: {
    margin: 8,
  },
}));

function UserProfileDetails() {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
        </Grid>
        <Grid item xs={12}>
          <IconButton>
            <Publish />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Chip label="Basic" variant="outlined" />
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Account information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            User Name
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Account age
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Map information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Maps Completed
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Nodes Completed
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Maps Created
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Achievement Information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Achievements Completed
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Badges Earned
          </Typography>
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserProfileDetails;
