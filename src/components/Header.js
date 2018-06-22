import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import StackIcon from '../svg/stack.svg';
import { auth } from '../firebase/firebase';
import logout from '../actions/logout';

export const Header = props => (
  <header className="header">
    <div className="header__content content-container-lg">
      <div className="header__logo">
        <StackIcon height={60} width={60} />
        <h1> Express Ticketing </h1>
      </div>
      {props.isLoggedIn && (
        <nav className="header__nav">
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
      )}
    </div>
  </header>
);

const mapStateToProps = ({ activeUserKey, users }) => ({
  isLoggedIn: !!activeUserKey,
  isAdmin: !!activeUserKey && users[activeUserKey].admin
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
