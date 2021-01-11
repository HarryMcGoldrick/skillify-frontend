import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/authentication';
import NodeCard from '../node-card/node-card';

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
    graphName, graphDescription, viewOnly, addGraphToProgress, progressMode, cy,
  } = props;

  useEffect(() => {
    if (cy) {
      if (cy.nodes()) {
        const nodesInMap = cy.nodes().values();
        const nodeArray = Array.from(nodesInMap);
        setNodes(nodeArray);
        console.log(nodeArray);
      }
    }
  }, [props]);

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.title}>
          {` ${graphName || ''}`}
        </h3>
        <p style={{ textOverflow: 'wrap' }}>{` ${graphDescription || ''}`}</p>
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

GraphDetails.propTypes = {
  graphName: PropTypes.string,
  graphDescription: PropTypes.string,
  viewOnly: PropTypes.bool.isRequired,
};

GraphDetails.defaultProps = {
  graphName: '',
  graphDescription: '',
};

export default GraphDetails;
