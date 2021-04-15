import {
  Grid, ListItem, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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

function UserGraphDetails(props) {
  const classes = useStyles();
  const { graphsCreated, graphsProgressing } = props;
  const [graphCreatedList, setGraphCreatedList] = useState([]);
  const [graphProgressingList, setGraphProgressingList] = useState([]);

  useEffect(() => {
    if (graphsCreated && graphsProgressing) {
      getMultipleGraphViews(graphsCreated).then((data) => {
        if (data.graphViews) {
          setGraphCreatedList(data.graphViews);
        }
      });

      getMultipleGraphViews([...graphsProgressing.map((graph) => graph._id)]).then((data) => {
        setGraphProgressingList(data.graphViews);
      });
    }
  }, [props]);
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
          align="center"
        >
          {graphCreatedList.map((graph) => {
            if (!graph.id || !graph.name) {
              return undefined;
            }
            const { id } = graph;
            return (

              <ListItemLink key={id} href={`/view/${id}`}>
                <Grid item xs={12}>
                  <GraphCard graph={graph} />
                </Grid>
              </ListItemLink>
            );
          })}
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
          align="center"
        >
          {graphProgressingList.map((graph) => {
            if (!graph.id || !graph.name) {
              return undefined;
            }
            const { id } = graph;
            return (

              <ListItemLink key={id} href={`/view/${id}`}>
                <Grid item xs={12}>
                  <GraphCard graph={graph} />
                </Grid>
              </ListItemLink>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}

// Creates a linkable ListItem
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default UserGraphDetails;
