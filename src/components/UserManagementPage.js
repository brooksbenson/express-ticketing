import React from 'react';
import { connect } from 'react-redux';
import SearchList from './reuse/SearchList';
import { auth } from '../firebase/firebase';
import { startAddUser } from '../actions/users';
import userSelector from '../selectors/users';

const stateDefaults = {
  email: '',
  password: '',
  name: '',
  admin: false
};

export class UserManagementPage extends React.Component {
  state = { ...stateDefaults };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onAdminCheckboxClick = () => {
    this.setState(({ admin }) => ({ admin: !admin }));
  };

  onSave = e => {
    e.preventDefault();
    const { admin, email, password, name } = this.state;
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.props.startAddUser({ admin, email, name }).then(() => {
        this.setState(() => ({ ...stateDefaults }));
      });
    });
  };

  render() {
    const { email, password, admin, name } = this.state;
    return (
      <section className="content-container">
        <div className="manage-users content-innards">
          <h2 className="heading"> Manage Users </h2>
          <div className="manage-users__block">
            <h3 className="heading heading--secondary">New User</h3>
            <form className="manage-users__form" onSubmit={this.onSave}>
              <div className="manage-users__form-row">
                <span> Name </span>
                <input
                  className="input"
                  onChange={this.onNameChange}
                  type="text"
                  value={name}
                />
              </div>
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
              <div className="manage-users__admin-checkbox">
                <label htmlFor="admin"> Admin </label>
                <input
                  name="admin"
                  onClick={this.onAdminCheckboxClick}
                  type="checkbox"
                  value={admin}
                />
              </div>
              <button className="btn btn--secondary">Save</button>
            </form>
          </div>
          <div className="manage-users__block">
            <h3 className="heading heading--secondary"> Users </h3>
            <SearchList
              className="manage-users__list"
              list={this.props.users}
              onClick={() => {}}
              selector={userSelector}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).map(key => ({ key, ...users[key] }))
});
const mapDispatchToProps = dispatch => ({
  startAddUser: async user => {
    await dispatch(startAddUser(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementPage);
