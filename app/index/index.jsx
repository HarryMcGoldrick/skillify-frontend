import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import 'fontsource-roboto';
import './index.css';
import {
  Welcome, Edit, Login, ViewList, Create, ViewGraph,
} from '../pages';
import { PrivateRoute, Navbar } from '../components';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/view" component={ViewList} />
      <Route path="/view/:id" render={({ match }) => (<ViewGraph id={match.params.id} />)} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact Route path="/create" component={Create} />
      <PrivateRoute path="/edit/:id" component={Edit} />
    </Switch>
  </>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
