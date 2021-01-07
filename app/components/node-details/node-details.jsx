import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, makeStyles, TextField,
} from '@material-ui/core';
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
  const { register, handleSubmit, watch } = useForm();
  const {
    editMode, nodeData, cy,
  } = props;
  const { id, label, description } = nodeData;

  const onSubmit = (data) => {
    console.log(data);
    const node = GetNodeWithId(cy, id);
    if (node) {
      if (data.label) {
        node.data('label', data.label);
      }
      if (data.description) {
        node.data('description', data.description);
      }
    }
  };

  return (
    <>
      {!editMode ? (
        <>
          <p>{label}</p>
          <p>{description}</p>
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
  editMode: PropTypes.bool.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
};

NodeDetails.defaultProps = {
  label: '',
  description: '',
};

export default NodeDetails;
