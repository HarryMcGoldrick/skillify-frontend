import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, IconButton, makeStyles, TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from 'react-router-dom';
import { getNodeWithId } from '../../utils/graph-utils';
import { addNodeToGraphProgress, removeNodeFromGraphProgress } from '../../services/graph-service';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { getUserProgressInfo } from '../../services/user-service';
import { addNodeToCompletedNodes, removeNodeFromCompletedNodes, updateNode } from '../../redux/graph/graphActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formInput: {
    padding: theme.spacing(1),
  },
  formSubmit: {
    marginTop: '20px',
    margin: '10px',
  },
}));

const NodeDetails = (props) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {
    cy, nodeData, progressMode, viewOnly, selectedNode, completedNodes
  } = props;
  const { id: graphId } = useParams();

  const onSubmit = (data) => {
    setEditMode(false);
    props.updateNode({
      ...selectedNode,
      ...data
    })
  };

  useEffect(() => {
    const isEmptyNodeAndEditMode = !nodeData.label && !nodeData.description && !editMode && !viewOnly;
    if (isEmptyNodeAndEditMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setIsComplete(Boolean(completedNodes.includes(nodeData.id)));
  }, [props]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const addNodeToProgress = () => {
    addNodeToGraphProgress(selectedNode.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        props.addNodeToCompletedNodes(selectedNode.id);
        setIsComplete(true);
      }
    });
  };

  const removeNodeFromProgress = () => {
    removeNodeFromGraphProgress(selectedNode.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        props.removeNodeFromCompletedNodes(selectedNode.id)
        setIsComplete(false);
      }
    });
  };

  return (
    <>
      {!viewOnly && (
      <IconButton onClick={handleEdit} style={{ float: 'right' }}>
        <CreateIcon />
      </IconButton>
      )}
      {!editMode ? (
        <>
          {selectedNode.label && (
          <p>
            Name:
            {' '}
            {selectedNode.label}
          </p>
          )}
          {selectedNode.description && (
          <p>
            Description:
            {' '}
            {selectedNode.description}
          </p>
          )}
          {!isComplete && progressMode && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => addNodeToProgress()}
            >
              Complete
            </Button>
          )}
          {isComplete && progressMode && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => removeNodeFromProgress()}
            >
              Incomplete
            </Button>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedNode: state.graph.selectedNode,
  progressMode: state.graph.progressMode,
  completedNodes: state.graph.completedNodes
})

const mapDispatchToProps = (dispatch) => ({
  addNodeToCompletedNodes: (nodeId) => dispatch(addNodeToCompletedNodes(nodeId)),
  removeNodeFromCompletedNodes: (nodeId) => dispatch(removeNodeFromCompletedNodes(nodeId)),
  updateNode: (node) => dispatch(updateNode(node)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);

