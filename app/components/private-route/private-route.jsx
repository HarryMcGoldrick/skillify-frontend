import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn
        ? (
          <Component id={props.match.params.id || 'empty'} {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.string,
};

PrivateRoute.defaultProps = {
  component: () => {},
  match: {},
  location: '',
};

export default PrivateRoute;
