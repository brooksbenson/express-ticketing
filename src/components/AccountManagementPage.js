import React from 'react';
import { connect } from 'react-redux';
import SearchList from './reuse/SearchList';
import { startAddAccount, startUpdateAccount } from '../actions/accounts';
import accountSelector from '../selectors/accounts';

const stateDefaults = {
  key: '',
  name: '',
  website: ''
};

export class AccountManagementPage extends React.Component {
  state = { ...stateDefaults };

  onAccountClick = account => {
    this.setState(() => ({ ...account }));
  };

  onCancel = () => {
    this.setState(() => ({ ...stateDefaults }));
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onWebsiteChange = e => {
    const website = e.target.value;
    this.setState(() => ({ website }));
  };

  onSave = e => {
    e.preventDefault();
    if (this.state.key) {
      this.props.startUpdateAccount({ ...this.state }).then(() => {
        this.setState(() => ({ ...stateDefaults }));
      });
    } else {
      const { key, ...accountData } = this.state;
      this.props.startAddAccount(accountData).then(() => {
        this.setState(() => ({ ...stateDefaults }));
      });
    }
  };

  onSearch = e => {
    const search = e.target.value;
    this.setState(() => ({ search }));
  };

  render() {
    const { key, name, website } = this.state;
    const { accounts } = this.props;
    return (
      <section className="content-container">
        <div className="manage-accounts content-innards">
          <h2 className="heading"> Manage Accounts </h2>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary">
              {key ? 'Update' : 'New'} Account
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
              {key && (
                <button className="btn btn-tertiary" onClick={this.onCancel}>
                  Cancel
                </button>
              )}
            </form>
          </div>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary"> Accounts </h3>
            <SearchList
              className="manage-accounts__list"
              list={accounts}
              onClick={this.onAccountClick}
              selector={accountSelector}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({
  accounts: Object.keys(accounts).map(key => ({ key, ...accounts[key] }))
});

const mapDispatchToProps = dispatch => ({
  startAddAccount: async account => {
    await dispatch(startAddAccount(account));
  },
  startUpdateAccount: async update => {
    await dispatch(startUpdateAccount(update));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountManagementPage);
