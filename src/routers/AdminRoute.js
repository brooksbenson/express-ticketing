import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ isAdmin, Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAdmin ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = ({ users, activeUserKey }) => ({
  isAdmin: activeUserKey ? users[activeUserKey].admin : false
});

export default connect(mapStateToProps)(AdminRoute);
