import React from 'react';
import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';
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
        <div>
          <HorizontalNav isAdmin={props.isAdmin} logout={props.logout} />
          <VerticalNav isAdmin={props.isAdmin} logout={props.logout} />
        </div>
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
