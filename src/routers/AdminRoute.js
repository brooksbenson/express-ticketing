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

const mapStateToProps = ({ users, activeUser }) => {
  const user = users[activeUser];
  const isAdmin = user ? user.admin : false;
  return { isAdmin };
};

export default connect(mapStateToProps)(AdminRoute);
