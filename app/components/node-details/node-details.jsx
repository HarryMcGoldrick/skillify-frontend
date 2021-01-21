import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, IconButton, makeStyles, TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from 'react-router-dom';
import { GetNodeWithId } from '../../utils/node-utils';
import { addNodeToGraphProgress, removeNodeFromGraphProgress } from '../../services/graph-service';
import { getUserId, isAuthenticated } from '../../utils/authentication';
import { getUserProgressInfo } from '../../services/user-service';

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
  const [currentNodeData, setCurrentNodeData] = useState({});
  const [isComplete, setIsComplete] = useState({});
  const [completedNodes, setCompletedNodes] = useState([]);
  const {
    cy, nodeData, isProgressMode, viewOnly,
  } = props;
  const { id: graphId } = useParams();

  const onSubmit = (data) => {
    const node = GetNodeWithId(cy, nodeData.id);
    if (node) {
      if (data.label) {
        node.data('label', data.label);
      }
      if (data.description) {
        node.data('description', data.description);
      }
    }
    setCurrentNodeData(node.data());
    setEditMode(false);
  };

  const updateCompletedNodes = () => {
    // If user is logged in check if this graph exists in the users progress info
    if (isAuthenticated() && viewOnly) {
      const userId = getUserId();
      getUserProgressInfo(userId).then((res) => {
        const { graphs_progressing: graphs } = res;
        graphs.filter((graph) => {
          if (graph._id === graphId) {
            setCompletedNodes(graph.completedNodes);
          }
          return null;
        });
      });
    }
  };

  useEffect(() => {
    setCurrentNodeData(nodeData);
    const isEmptyNodeAndEditMode = !nodeData.label && !nodeData.description && !editMode && !viewOnly;
    if (isEmptyNodeAndEditMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setIsComplete(Boolean(completedNodes.includes(nodeData.id)));
  }, [props]);

  useEffect(() => {
    updateCompletedNodes();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const addNodeToProgress = () => {
    const node = GetNodeWithId(cy, nodeData.id);
    addNodeToGraphProgress(nodeData.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        updateCompletedNodes();
        setIsComplete(true);
        node.style('background-color', 'red');
        completedNodes.push(nodeData.id);
      }
    });
  };

  const removeItemFromArray = (array, item) => array.filter((f) => f !== item);

  const removeNodeFromProgress = () => {
    const node = GetNodeWithId(cy, nodeData.id);
    removeNodeFromGraphProgress(nodeData.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        updateCompletedNodes();
        setIsComplete(false);
        node.style('background-color', 'gray');
        removeItemFromArray(completedNodes, nodeData.id);
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
          {currentNodeData.label && (
          <p>
            Name:
            {' '}
            {currentNodeData.label}
          </p>
          )}
          {currentNodeData.description && (
          <p>
            Description:
            {' '}
            {currentNodeData.description}
          </p>
          )}
          {!isComplete && isProgressMode && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addNodeToProgress}
            >
              Complete
            </Button>
          )}
          {isComplete && isProgressMode && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={removeNodeFromProgress}
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

NodeDetails.propTypes = {
  cy: PropTypes.object.isRequired,
  nodeData: PropTypes.object.isRequired,
};

export default NodeDetails;
