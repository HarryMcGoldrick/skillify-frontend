import { Grid } from '@material-ui/core';
import React from 'react';
import Graph from '../../components/graph/graph';

export default function Create() {
  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        <h1>Side Panel</h1>
      </Grid>
      <Grid item xs={9}>
        <Graph />
      </Grid>
    </Grid>
  );
}
