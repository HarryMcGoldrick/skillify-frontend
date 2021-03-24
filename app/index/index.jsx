import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import 'fontsource-roboto';
import './index.css';
import { Provider, useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Collapse } from '@material-ui/core';
import {
  Welcome, Edit, Login, ViewList, Create, ViewGraph, Register, UserProfile,
} from '../pages';
import {
  PrivateRoute, Navbar, UserData, UserAchievements,
} from '../components';
import store from '../redux/store';

const App = () => (
  <>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={Collapse}
    >
      <Provider store={store}>
        <UserData />
        <UserAchievements />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/view" component={ViewList} />
          <Route exact path="/register" component={Register} />
          <Route path="/view/:id" render={({ match }) => (<ViewGraph id={match.params.id} />)} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact Route path="/create" component={Create} />
          <PrivateRoute path="/edit/:id" component={Edit} />
          <PrivateRoute path="/user/:username" component={UserProfile} />
        </Switch>
      </Provider>
    </SnackbarProvider>
  </>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
