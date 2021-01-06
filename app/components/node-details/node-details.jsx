import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, makeStyles, TextField,
} from '@material-ui/core';

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
  const { editMode, description, label } = props;

  const onSubmit = () => {

  };

  return (
    <>
      {!editMode ? (
        <>
          <p>{label}</p>
          <p>{description}</p>
        </>
      ) : (
        <form>
          <Grid item xs={12} className={classes.formInput}>
            <TextField name="Label" type="text" label="Label" inputRef={register({ required: true })} />
          </Grid>
          <Grid item xs={12} className={classes.formInput}>
            <TextField multiline type="text" name="description" label="description" inputRef={register({ required: true })} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" className={classes.formSubmit}>Cancel</Button>
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
