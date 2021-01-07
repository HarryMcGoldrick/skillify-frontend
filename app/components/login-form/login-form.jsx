import {
  Button, Grid, makeStyles, Paper, TextField,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/user-service';
import { getSession } from '../../utils/authentication';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formInput: {
    padding: theme.spacing(1),
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    login(data.username, data.password).then((res) => {
      const session = getSession(res.token);
      if (session) {
        const { userId, exp: expires } = session;
        // Set a cookie to expire using the expiry time embedded in the JWT
        Cookies.set('access_token', res.token, { expires });
        localStorage.setItem('userId', userId);
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
          style={{ minHeight: '30vh' }}
        >
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.formInput}>
              <TextField name="username" label="username" variant="outlined" inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={12} className={classes.formInput}>
              <TextField type="password" name="password" label="password" variant="outlined" inputRef={register({ required: true })} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth>Login</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
