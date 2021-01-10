import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, IconButton, makeStyles, TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from 'react-router-dom';
import { GetNodeWithId } from '../../utils/node-utils';
import { addNodeToGraphProgress } from '../../services/graph-service';
import { getUserId } from '../../utils/authentication';

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
  const {
    cy, nodeData, isNodeComplete, isProgressMode, viewOnly,
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

  useEffect(() => {
    setCurrentNodeData(nodeData);
    const isEmptyNodeAndEditMode = !nodeData.label && !nodeData.description && !editMode && !viewOnly;
    if (isEmptyNodeAndEditMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setIsComplete(isNodeComplete);
  }, [props]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const addNodeToProgress = () => {
    const node = GetNodeWithId(cy, nodeData.id);
    addNodeToGraphProgress(nodeData.id, graphId, getUserId()).then((data) => {
      if (data.res) {
        setIsComplete(true);
        node.style('background-color', 'red');
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
