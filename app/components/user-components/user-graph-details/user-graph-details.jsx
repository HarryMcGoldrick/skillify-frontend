import {
  Grid, ListItem, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GraphCard from '../../graph-components/graph-card/graph-card';
import { getMultipleGraphViews } from '../../../services/graph-service';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 16,
  },
  img: {
    width: 200,
    height: 200,
  },
}));

/*
  Displays the users created graphs and participating graphs using GraphCard
*/
function UserGraphDetails(props) {
  const classes = useStyles();
  const { graphsCreated, graphsProgressing } = props;
  const [graphCreatedList, setGraphCreatedList] = useState([]);
  const [graphProgressingList, setGraphProgressingList] = useState([]);

  useEffect(() => {
    if (graphsCreated && graphsProgressing) {
      // Get the graph summary data for user created graphs
      getMultipleGraphViews(graphsCreated).then((data) => {
        if (data.graphViews) {
          setGraphCreatedList(data.graphViews);
        }
      });

      // Get the graph summary data for participating graphs
      getMultipleGraphViews([...graphsProgressing.map((graph) => graph._id)]).then((data) => {
        setGraphProgressingList(data.graphViews);
      });
    }
  }, [props]);
  return (
    <Paper className={classes.paper}>
      <Grid container>
        {graphCreatedList.length > 0 && (
        <div>
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
            align="center"
          >
            {graphCreatedList.map((graph) => {
              if (!graph.id || !graph.name) {
                return undefined;
              }
              const { id } = graph;

              return (
                <ListItem alignItems="flex-start" key={graph.id}>
                  <Grid item xs={12}>
                    <GraphCard graph={graph} />
                  </Grid>
                </ListItem>
              );
            })}
          </Grid>
        </div>
        )}

        {graphProgressingList.length > 0 && (
        <div>
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
            align="center"
          >
            {graphProgressingList.map((graph) => {
              if (!graph.id || !graph.name) {
                return undefined;
              }
              const { id } = graph;
              return (
                <ListItem alignItems="flex-start" key={graph.id}>
                  <Grid item xs={12}>
                    <GraphCard graph={graph} />
                  </Grid>
                </ListItem>
              );
            })}
          </Grid>
        </div>
        )}

      </Grid>
    </Paper>
  );
}

// Creates a linkable ListItem
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default UserGraphDetails;
