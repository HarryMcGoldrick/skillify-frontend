
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
  Welcome, Edit, Login, ViewList, Create, ViewGraph, Register,
} from '../pages';
import { PrivateRoute, Navbar } from '../components';
import store from '../redux/store';
import { getUserId } from '../utils/authentication';
import UserData from '../components/user-data/user-data';


const App = () => {
  return (
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
        </Switch>
      </Provider>
    </>
  );
}


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
