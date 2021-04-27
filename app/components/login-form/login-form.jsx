import {
  Button, Grid, makeStyles, Paper, TextField, Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/user-service';
import { getSession } from '../../utils/authentication';

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
  submit: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

/*
  LoginForm is used by users to authenticate to the system.
*/
export const LoginForm = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    // Trigger a login request to the server on form submission
    login(data.username, data.password).then((res) => {
      const session = getSession(res.token);
      // If jwt is returned then assume information is valid
      if (session) {
        const { username, exp: expires } = session;
        // Set a cookie to expire using the expiry time embedded in the JWT
        Cookies.set('access_token', res.token, { expires });
        localStorage.setItem('username', username);
        history.goBack();
      }
    });
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
              <Typography variant="h4" align="center">Login</Typography>
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <TextField name="username" label="username" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <TextField type="password" name="password" label="password" variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <Link to="/register">
                Not registed?
              </Link>
            </Grid>
            <Grid item xs={12} className={classes.submit}>
              <Button type="submit" fullWidth variant="contained">Login</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
