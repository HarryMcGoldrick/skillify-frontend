import {
  Button, Grid, makeStyles, Paper, TextField, Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createNewGraph } from '../../services/graph-service';
import { getUserId } from '../../utils/authentication';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formInput: {
    padding: theme.spacing(1),
  },
  heading: {
    padding: theme.spacing(3),
  },
  textField: {
    width: 350,
  },
  submit: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

export const GraphCreateForm = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    createNewGraph(data.name, data.description, getUserId()).then((res) => {
      const { graphId } = res;
      // Navigate to edit page with the graphId returned from the API
      history.push(`/edit/${graphId}`);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '60vh' }}
      >
        <Paper className={classes.paper}>
          <Grid item xs={12} className={classes.heading}>
            <Typography variant="h4" align="center">Create your graph!</Typography>
          </Grid>
          <Grid item xs={12} className={classes.formInput}>
            <TextField name="name" label="Name" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
          </Grid>
          <Grid item xs={12} className={classes.formInput}>
            <TextField name="description" label="Description" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
          </Grid>
          <Grid item xs={12} className={classes.submit}>
            <Button type="submit" fullWidth variant="contained">Create</Button>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default GraphCreateForm;
