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
import {
  Welcome, Edit, Login, ViewList, Create, ViewGraph, Register, UserProfile,
} from '../pages';
import { PrivateRoute, Navbar, UserData } from '../components';
import store from '../redux/store';

const App = () => (
  <>
    <Provider store={store}>
      <UserData />
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
  </>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
