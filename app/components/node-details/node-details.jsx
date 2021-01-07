import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, IconButton, makeStyles, TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { GetNodeWithId } from '../../utils/node-utils';

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
  const { cy } = props;
  const { nodeData } = props;

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
  }, [props]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <IconButton onClick={handleEdit} style={{ float: 'right' }}>
        <CreateIcon />
      </IconButton>
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
