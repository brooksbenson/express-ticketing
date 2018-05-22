import React from 'react';
import { connect } from 'react-redux';
import { startAddAccount, startUpdateAccount } from '../actions/accounts';
import accountSelector from '../selectors/accounts';

export class AccountManagementPage extends React.Component {
  state = {
    accountKey: '',
    name: '',
    search: '',
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

  onSearch = e => {
    const search = e.target.value;
    this.setState(() => ({ search }));
  };

  render() {
    const { accountKey, name, search, website } = this.state;
    return (
      <section className="content-container">
        <div className="manage-accounts content-innards">
          <h2 className="heading"> Manage Accounts </h2>
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
            <input
              className="search"
              onChange={this.onSearch}
              placeholder="Search..."
              type="text"
              value={search}
            />
            <ul className="manage-accounts__list">
              {accountSelector(this.props.accounts, search).map(a => (
                <li
                  key={a.key}
                  onClick={() => {
                    this.onAccountClick(a);
                  }}
                >
                  <button>{a.name}</button>
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
    await dispatch(startUpdateAccount(update));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountManagementPage
);
