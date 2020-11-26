import {
  Button, Grid, makeStyles, Paper, TextField,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formInput: {
    padding: theme.spacing(1),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '30vh' }}
        >
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.formInput}>
              <TextField name="username" label="username" variant="outlined" inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <TextField name="password" label="password" variant="outlined" inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth>Login</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}
