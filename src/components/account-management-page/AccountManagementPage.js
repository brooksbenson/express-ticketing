import React from 'react';
import { connect } from 'react-redux';
import { startAddAccount } from '../../actions/accounts';

export class AccountManagementPage extends React.Component {
  state = {
    name: '',
    website: ''
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
    this.props.startAddAccount({ ...this.state }).then(() => {
      this.setState(() => ({
        name: '',
        website: ''
      }));
    });
  };

  render() {
    return (
      <section className="content-container">
        <div className="manage-accounts content-innards">
          <h2 className="heading"> Manage Accounts </h2>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary"> New Account </h3>
            <form className="manage-accounts__form">
              <div className="manage-accounts__form-row">
                <span> Name </span>
                <input
                  className="input"
                  onChange={this.onNameChange}
                  type="text"
                  value={this.state.name}
                />
              </div>
              <div className="manage-accounts__form-row">
                <span> Website </span>
                <input
                  className="input"
                  onChange={this.onWebsiteChange}
                  type="text"
                  value={this.state.website}
                />
              </div>
              <button className="btn btn--secondary" onClick={this.onSave}>
                Save
              </button>
            </form>
          </div>
          <div className="manage-accounts__block">
            <h3 className="heading heading--secondary"> Accounts </h3>
            <ul className="manage-accounts__list">
              {this.props.accounts.map(a => <li key={a.key}> {a.name} </li>)}
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountManagementPage
);
