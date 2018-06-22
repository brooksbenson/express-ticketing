import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

export default class VerticalNav extends React.Component {
  state = { isOpen: false };

  onItemClick = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  onMenuStateChange = ({ isOpen }) => {
    this.setState(() => ({ isOpen }));
  };

  render() {
    return (
      <div className="header__nav header__nav--vert show-for-mobile">
        <Menu
          right
          isOpen={this.state.isOpen}
          onStateChange={this.onMenuStateChange}
        >
          <NavLink
            onClick={this.onItemClick}
            to="/tickets"
            activeClassName="active"
          >
            My Tickets
          </NavLink>
          <NavLink
            onClick={this.onItemClick}
            to="/create"
            activeClassName="active"
          >
            Create
          </NavLink>
          {this.props.isAdmin && (
            <NavLink
              onClick={this.onItemClick}
              to="/users"
              activeClassName="active"
            >
              Users
            </NavLink>
          )}
          {this.props.isAdmin && (
            <NavLink
              onClick={this.onItemClick}
              to="/accounts"
              activeClassName="active"
            >
              Accounts
            </NavLink>
          )}
          <a onClick={this.props.logout}>Logout</a>
        </Menu>
      </div>
    );
  }
}
