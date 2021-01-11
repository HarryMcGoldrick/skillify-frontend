import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, makeStyles, Paper, Snackbar, TextField, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { register as registerUser } from '../../services/user-service';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formInput: {
    padding: theme.spacing(1),

  },
  textField: {
    width: 350,
  },
  heading: {
    padding: theme.spacing(3),
  },
}));

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    registerUser(data.username, data.password).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        history.goBack();
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  return (
    <div>
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
              <Typography variant="h4" align="center">Register</Typography>
            </Grid>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleClose} severity="error">
                {error}
              </Alert>
            </Snackbar>
            <Grid item xs={12} className={classes.formInput}>
              <TextField name="username" label="username" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <TextField type="password" name="password" label="password" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <Button type="submit" fullWidth>Register</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterForm;
