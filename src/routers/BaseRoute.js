import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const BaseRoute = ({ isLoggedIn, Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = ({ activeUserKey }) => ({
  isLoggedIn: !!activeUserKey
});

export default connect(mapStateToProps)(BaseRoute);
