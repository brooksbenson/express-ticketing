import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase/firebase';
import { startAddUser, startSetUsers } from '../actions/users';

export class UserManagementPage extends React.Component {
  state = {
    email: '',
    password: '',
    search: ''
  };

  onEmailChange = e => {
    const change = e.target.value;
    this.setState(() => ({
      email: change
    }));
  };

  onPasswordChange = e => {
    const change = e.target.value;
    this.setState(() => ({
      password: change
    }));
  };

  onSave = e => {};

  onSearch = e => {
    const search = e.target.value;
    this.setState(() => ({ search }));
  };

  render() {
    const { email, password } = this.state;
    return (
      <section className="content-container">
        <div className="manage-users content-innards">
          <h2 className="heading"> Manage users </h2>
          <div className="manage-users__block">
            <h3 className="heading heading--secondary">New User</h3>
            <form className="manage-users__form" onSubmit={this.onSave}>
              <div className="manage-users__form-row">
                <span> Email </span>
                <input
                  className="input"
                  onChange={this.onEmailChange}
                  type="text"
                  value={email}
                />
              </div>
              <div className="manage-users__form-row">
                <span> Password </span>
                <input
                  className="input"
                  onChange={this.onPasswordChange}
                  type="text"
                  value={password}
                />
              </div>
              <button className="btn btn--secondary">Save</button>
            </form>
          </div>
          <div className="manage-users__block">
            <h3 className="heading heading--secondary"> Users </h3>
            <input
              className="search"
              onChange={this.onSearch}
              placeholder="Search..."
              type="text"
              value={search}
            />
            <ul className="manage-users__list">
              {userSelector(this.props.users, search).map(user => (
                <li key={user.key}> {user.email} </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
const mapDispatchToProps = dispatch => ({
  startAddUser: async user => {
    await dispatch(startAdduser(user));
  },
  startSetUsers: async () => {
    await dispatch(startSetUsers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);