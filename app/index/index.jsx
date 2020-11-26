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
import View from '../pages/view';
import Create from '../pages/create';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/view" component={View} />
      <Route exact path="/create" component={Create} />
      <Route path="/edit/:id" render={({ match }) => (<Edit id={match.params.id} />)} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
