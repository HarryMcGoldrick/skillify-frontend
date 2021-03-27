import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { addGraphToGraphProgress } from '../../../services/graph-service';
import { updateProgressMode } from '../../../redux/graph/graphActions';
import { checkIsNode } from '../../../utils/node-utils';
import { NodeCard } from '../..';

const useStyles = makeStyles({
  container: {
    width: '350px',
    margin: '10px',
  },
  title: {
    textAlign: 'center',
  },
  nodeList: {
    padding: 0,
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
        <h3 className={classes.title}>
          {` ${name || ''}`}
        </h3>
        <p style={{ textOverflow: 'wrap' }}>{` ${description || ''}`}</p>
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
      <ul className={classes.nodeList}>
        {elements.map((ele, index) => {
          if (checkIsNode(ele)) {
            return <NodeCard node={ele} key={ele.data.id} />;
          }
          return null;
        })}
      </ul>
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
