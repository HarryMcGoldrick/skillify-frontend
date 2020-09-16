import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import React, { Component } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    margin: "1rem",
  },
  title: {
    textAlign: "center",
    fontSize: "40px",
  },
}));

const Welcome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "60vh" }}
      >
        <Grid item xs={3}>
          <h1 className={classes.title}>Welcome! 👋</h1>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Welcome;
