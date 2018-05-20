import React from 'react';
import { connect } from 'react-redux';
import { startAddAccount, stateUpdateAccount } from '../actions/accounts';

export class AccountManagementPage extends React.Component {
  state = {
    accountKey: '',
    name: '',
    website: ''
  };

  onAccountClick = account => {
    this.setState(() => ({
      ...account,
      accountKey: account.key
    }));
  };

  onCancel = () => {
    this.setState(() => ({
      accountKey: '',
      name: '',
      website: ''
    }));
  };

  onNameChange = e => {
    const change = e.target.value;
    this.setState(() => ({
      name: change
    }));
  };

  onWebsiteChange = e => {
    const change = e.target.value;
    this.setState(() => ({
      website: change
    }));
  };

  onSave = e => {
    e.preventDefault();
    const defaults = { accountKey: '', name: '', website: '' };
    if (this.state.accountKey) {
      this.props.startUpdateAccount({ ...this.state }).then(() => {
        this.setState(() => ({ ...defaults }));
      });
    } else {
      const { accountKey, ...accountData } = this.state;
      this.props.startAddAccount({ ...accountData }).then(() => {
        this.setState(() => ({ ...defaults }));
      });
    }
  };

  render() {
    const { accountKey, name, website } = this.state;
    return (
      <section className="content-container">
        <div className="manage-accounts content-innards">
          <h2 className="heading"> Accounts </h2>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary">
              {accountKey ? 'Update' : 'New'} Account
            </h3>
            <form className="manage-accounts__form" onSubmit={this.onSave}>
              <div className="manage-accounts__form-row">
                <span> Name </span>
                <input
                  className="input"
                  onChange={this.onNameChange}
                  type="text"
                  value={name}
                />
              </div>
              <div className="manage-accounts__form-row">
                <span> Website </span>
                <input
                  className="input"
                  onChange={this.onWebsiteChange}
                  type="text"
                  value={website}
                />
              </div>
              <button className="btn btn--secondary">Save</button>
              {accountKey && (
                <button className="btn btn-tertiary" onClick={this.onCancel}>
                  Cancel
                </button>
              )}
            </form>
          </div>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary"> Accounts </h3>
            <ul className="manage-accounts__list">
              {this.props.accounts.map(a => (
                <li
                  key={a.key}
                  onClick={() => {
                    this.onAccountClick(a);
                  }}
                >
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });
const mapDispatchToProps = dispatch => ({
  startAddAccount: async account => {
    await dispatch(startAddAccount(account));
  },
  startUpdateAccount: async update => {
    await dispatch(stateUpdateAccount(update));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountManagementPage
);
