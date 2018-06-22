import React from 'react';
import { NavLink } from 'react-router-dom';

export default props => (
  <nav className="header__nav header__nav--horz show-for-desktop">
    <NavLink to="/tickets" activeClassName="active">
      My Tickets
    </NavLink>
    <NavLink to="/create" activeClassName="active">
      Create
    </NavLink>
    {props.isAdmin && (
      <NavLink to="/users" activeClassName="active">
        Users
      </NavLink>
    )}
    {props.isAdmin && (
      <NavLink to="/accounts" activeClassName="active">
        Accounts
      </NavLink>
    )}
    <a onClick={props.logout}>Logout</a>
  </nav>
);
