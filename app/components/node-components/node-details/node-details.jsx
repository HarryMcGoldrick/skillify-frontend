import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, IconButton, makeStyles, TextField, Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNodeToGraphProgress, removeNodeFromGraphProgress } from '../../../services/graph-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';
import { addNodeToCompletedNodes, removeNodeFromCompletedNodes, updateNode } from '../../../redux/graph/graphActions';
import { NodeApperance, NodeList, NodeObjectives } from '../..';
import lockedNode from '../../../assets/lockedNode.png';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: 8,
  },
  subtitle: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  formInput: {
    padding: theme.spacing(1),
  },
  formSubmit: {
    marginTop: 20,
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 8,
  },
}));

/*
  Contains the information about the selected node including objectives, apperance and completion.
*/
const NodeDetails = (props) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {
    nodeData, progressMode, viewOnly, selectedNode, completedNodes,
  } = props;
  const { id: graphId } = useParams();

  // Update the current node information after form submission
  const onSubmit = (data) => {
    setEditMode(false);
    props.updateNode({
      data: {
        ...selectedNode,
        ...data,
      },
    });
  };

  // Set current node status
  useEffect(() => {
    const isEmptyNodeAndEditMode = !nodeData.label && !nodeData.description && !editMode && !viewOnly;
    if (isEmptyNodeAndEditMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setIsComplete(Boolean(completedNodes.includes(nodeData.id)));
  }, [props]);

  // Update if the user is editing node information
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  // Add node to progress, effectively completing it
  const addNodeToProgress = () => {
    addNodeToGraphProgress(selectedNode.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        props.addNodeToCompletedNodes(selectedNode.id);
        setIsComplete(true);
      }
    });
  };

  // Remove node from progress, effectively uncompleteing it
  const removeNodeFromProgress = () => {
    removeNodeFromGraphProgress(selectedNode.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        props.removeNodeFromCompletedNodes(selectedNode.id);
        setIsComplete(false);
      }
    });
  };

  return (
    <>
      {!(progressMode && nodeData.classes && nodeData.classes === 'locked') ? (
        <>
          {!viewOnly && (
          <IconButton onClick={handleEdit} style={{ float: 'right' }}>
            <CreateIcon />
          </IconButton>
          )}
          {!editMode ? (
            <>
              {selectedNode.label && (
              <Typography variant="h4" component="h4" className={classes.title}>
                {selectedNode.label}
              </Typography>
              )}
              {selectedNode.description && (
              <Typography variant="h5" component="h5">
                {selectedNode.description}
              </Typography>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} className={classes.formInput}>
                <TextField name="label" type="text" label="label" inputRef={register} />
              </Grid>
              <Grid item xs={12} className={classes.formInput}>
                <TextField multiline type="text" name="description" label="description" inputRef={register} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" className={classes.formSubmit}>Comfirm</Button>
              </Grid>
            </form>
          )}
          {isAuthenticated() && (
            <div>
              <Typography variant="h5" component="h5" className={classes.subtitle}>
                Objectives
              </Typography>
              <NodeObjectives nodeData={nodeData} />
              <br />
              <hr />
            </div>
          )}
          {isAuthenticated() && !viewOnly && (
          <div>
            <Typography variant="h5" component="h5" className={classes.subtitle}>
              Appearance
            </Typography>
            <NodeApperance />
          </div>
          )}
          {props.connectedNodes.length > 0 && (
          <div>
            <Typography variant="h5" component="h5" className={classes.subtitle}>
              Connected Nodes
            </Typography>
            <NodeList elements={props.connectedNodes} progressMode={progressMode} isNodeData />
          </div>
          )}
          {progressMode && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={isComplete ? () => removeNodeFromProgress() : () => addNodeToProgress()}
          >
            {isComplete ? 'Incomplete' : 'Complete'}
          </Button>
          )}
        </>
      ) : (
        <>
          <img src={lockedNode} style={{ width: 250, height: 250 }} />
          {progressMode && !isComplete && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={() => addNodeToProgress()}
          >
            Complete Anyways?
          </Button>
          )}
        </>
      )}

    </>

  );
};

const mapStateToProps = (state) => ({
  selectedNode: state.graph.present.selectedNode,
  progressMode: state.graph.present.progressMode,
  completedNodes: state.graph.present.completedNodes,
  connectedNodes: state.graph.present.connectedNodes,
});

const mapDispatchToProps = (dispatch) => ({
  addNodeToCompletedNodes: (nodeId) => dispatch(addNodeToCompletedNodes(nodeId)),
  removeNodeFromCompletedNodes: (nodeId) => dispatch(removeNodeFromCompletedNodes(nodeId)),
  updateNode: (node) => dispatch(updateNode(node)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);
