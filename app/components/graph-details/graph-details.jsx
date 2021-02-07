import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { isAuthenticated } from '../../utils/authentication';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  container: {
    width: '350px',
    margin: '10px',
  },
  title: {
    textAlign: 'center',
  },
});

// Used to display the details of the graph
const GraphDetails = (props) => {
  const classes = useStyles();
  const [nodes, setNodes] = useState([]);
  const {
    graphData, viewOnly, progressMode, elements
  } = props;

  const {name, description} = graphData


  const addGraphToProgress = async () => {
    const initGraph = await addGraphToGraphProgress(graphId, getUserId());
    if (initGraph.res) {
      initProgressMode();
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
      {/* {nodes.map((node) => {
        if (node.data().label) {
          return <NodeCard nodeData={node.data()} />;
        }
        return null;
      })} */}
      <div />
    </>
  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.elements,
  showGraphDetails: state.graph.showGraphDetails,
  graphData: state.graph.graphData
})

const mapDispatchToProps = (dispatch) => ({
  updateProgressMode: () => updateProgressMode()
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetails);
