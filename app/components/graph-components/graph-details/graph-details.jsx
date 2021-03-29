import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { addGraphToGraphProgress } from '../../../services/graph-service';
import { updateProgressMode } from '../../../redux/graph/graphActions';
import { checkIsNode } from '../../../utils/node-utils';
import { NodeCard, NodeList } from '../..';

const useStyles = makeStyles({
  container: {
    width: '350px',
    margin: '10px',
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
  },
  description: {
    textOverflow: 'wrap',
    margin: 16,
  },
  nodeList: {
    padding: 0,
  },
  listTitle: {
    textAlign: 'center',
    margin: 8,
  },
});

// Used to display the details of the graph
const GraphDetails = (props) => {
  const classes = useStyles();
  const { id: graphId } = useParams();
  const {
    graphData, viewOnly, progressMode, elements,
  } = props;

  const { name, description } = graphData;

  const addGraphToProgress = async () => {
    const initGraph = await addGraphToGraphProgress(graphId, getUserId());
    if (initGraph.res) {
      props.updateProgressMode(true);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Typography component="h4" variant="h4" className={classes.title}>
          {` ${name || ''}`}
        </Typography>
        <Typography component="h5" variant="h5" className={classes.description}>{` ${description || ''}`}</Typography>
        <hr />
        {viewOnly && !progressMode && isAuthenticated() && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={addGraphToProgress}
        >
          Begin tracking
        </Button>
        )}
      </div>
      {progressMode ? (
        <Typography component="h6" variant="h6" className={classes.listTitle}>
          Unlocked Nodes 🔓
        </Typography>
      ) : (
        <Typography component="h6" variant="h6" className={classes.listTitle}>
          Node List
        </Typography>
      )}
      <NodeList elements={elements} progressMode={progressMode} />
      <div />
    </>
  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.elements,
  showGraphDetails: state.graph.showGraphDetails,
  graphData: state.graph.graphData,
  progressMode: state.graph.progressMode,
});

const mapDispatchToProps = (dispatch) => ({
  updateProgressMode: (mode) => dispatch(updateProgressMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetails);
