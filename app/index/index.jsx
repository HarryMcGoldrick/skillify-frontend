import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import 'fontsource-roboto';
import './index.css';
import Navbar from '../components/navbar';
import Welcome from '../pages/welcome';
import Edit from '../pages/edit';
import Login from '../pages/login';
import ViewList from '../pages/view-list';
import Create from '../pages/create';
import ViewGraph from '../pages/view-graph';
import PrivateRoute from '../components/private-route/private-route';

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
