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
import Welcome from '../pages/Welcome';
import Create from '../pages/create';
import Login from '../pages/login';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/create/:id" render={({ match }) => (<Create id={match.params.id} />)} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
