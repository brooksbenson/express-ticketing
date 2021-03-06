import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isNotLoggedIn, Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isNotLoggedIn ? <Component {...props} /> : <Redirect to="/tickets" />
    }
  />
);

const mapStateToProps = ({ activeUserKey }) => ({
  isNotLoggedIn: !activeUserKey
});

export default connect(mapStateToProps)(PublicRoute);
