import {
  Grid,
  ListItem, ListItemText, makeStyles, Paper,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { getGraphViews } from '../../services/graph-service';
import GraphCard from '../graph-card/graph-card';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
  },
  paper: {
    display: 'flex',
  },
  list: {
    padding: 0,
  },
}));

// Displays a list of graphNames that link to the relevant graph
const GraphList = () => {
  const classes = useStyles();
  const [graphViews, setGraphViews] = useState([]);

  useEffect(() => {
    // Returns a list of graphIds and graphNames
    getGraphViews().then((graphs) => {
      setGraphViews(graphs);
    });
  }, []);

  // Creates a linkable ListItem
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid item xs={8}>
        <Paper elevation={3} className={classes.paper}>
          <ul className={classes.list}>
            {graphViews.map((graph) => {
              if (!graph.id || !graph.name) {
                return undefined;
              }
              const { id, name } = graph;
              return (

                <ListItemLink key={id} href={`/view/${id}`} alignItems="flex-start">
                  <Grid item xs={12}>
                    <GraphCard graph={graph} />
                  </Grid>
                </ListItemLink>
              );
            })}
          </ul>
        </Paper>
      </Grid>
      {/* <Grid item xs={3}>
        <Pagination count={10} />
      </Grid> */}
    </Grid>

  );
};

export default GraphList;
