import React from 'react';
import { connect } from 'react-redux';
import { startAddContact } from '../../actions/contacts';
import formatNumber from '../../helpers/format-number';

const defaultState = {
  name: '',
  email: '',
  number: ''
};

export class ContactForm extends React.Component {
  state = { ...defaultState };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onNumberChange = e => {
    const number = e.target.value;
    this.setState(() => ({ number }));
  };

  onAddContact = () => {
    this.props.addContact({ ...this.state }, this.props.accountKey).then(() => {
      this.setState(() => ({ ...defaultState }));
      this.props.closeForm();
    });
  };

  render() {
    const { name, email, number } = this.state;
    const { className } = this.props;
    return (
      <div className={className}>
        <div>
          <span>Name</span>
          <input onChange={this.onNameChange} type="text" value={name} />
        </div>
        <div>
          <span>Email</span>
          <input onChange={this.onEmailChange} type="text" value={email} />
        </div>
        <div>
          <span>Number</span>
          <input onChange={this.onNumberChange} type="text" value={number} />
        </div>
        <button onClick={this.onAddContact}> Save Contact </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddContact: (contact, accountKey) =>
    dispatch(startAddContact({ contact, accountKey }))
});
