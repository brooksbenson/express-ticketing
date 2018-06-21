import React from 'react';
import UserIcon from '../svg/user.svg';
import KeyIcon from '../svg/key.svg';
import { auth } from '../firebase/firebase';

export default class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onLogin = e => {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password);
  };

  render() {
    return (
      <form className="login-panel">
        <h2> Login </h2>
        <div className="login-panel__input">
          <span>
            <UserIcon height={17} width={17} />
          </span>
          <input
            onChange={this.onEmailChange}
            placeholder="Email"
            type="text"
            value={this.state.email}
          />
        </div>
        <div className="login-panel__input">
          <span>
            <KeyIcon height={17} width={17} />
          </span>
          <input
            onChange={this.onPasswordChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <button className="login-panel__login-button">
            <div />
          </button>
        </div>
      </form>
    );
  }
}
