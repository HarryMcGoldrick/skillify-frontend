import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { addGraphToGraphProgress, updateGraphPrivacy } from '../../../services/graph-service';
import { updateProgressMode } from '../../../redux/graph/graphActions';
import { NodeList, PrivacyToggle } from '../..';

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
  privacyToggle: {
    marginLeft: 16,
  },
  button: {
    margin: 16,
  },
});

/*
  Used to display the details of the current graph.
  Depending on current mode shows, all nodes or unlocked nodes in a list.
*/
const GraphDetails = (props) => {
  const classes = useStyles();
  const { id: graphId } = useParams();
  const {
    graphData, viewOnly, progressMode, elements,
  } = props;

  const { name, description } = graphData;

  // Update the graph mode in server
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
          fullWidth
        >
          Begin tracking
        </Button>
        )}
      </div>
      {!viewOnly && isAuthenticated() && (
        <div className={classes.privacyToggle}>
          <PrivacyToggle id={graphId} updatePrivacy={updateGraphPrivacy} initialStatus={graphData.private} />
        </div>
      )}
      {progressMode ? (
        <Typography component="h5" variant="h5" className={classes.listTitle}>
          Unlocked Nodes 🔓
        </Typography>
      ) : (
        <Typography component="h4" variant="h4" className={classes.listTitle}>
          Node List
        </Typography>
      )}
      <NodeList elements={elements} progressMode={progressMode} />
      <div />
    </>
  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.present.elements,
  showGraphDetails: state.graph.present.showGraphDetails,
  graphData: state.graph.present.graphData,
  progressMode: state.graph.present.progressMode,
});

const mapDispatchToProps = (dispatch) => ({
  updateProgressMode: (mode) => dispatch(updateProgressMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetails);
