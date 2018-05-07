import React from 'react';
import isEmail from 'validator/lib/isEmail';
import formatPhoneNumber from '../enhancers/format-phone-number';
import ToggleButton from './ToggleButton';
import ContactMiniForm from './ContactMiniForm';
import { addContact } from '../actions/accounts';

export default class ContactController extends React.Component {
  state = {
    email: '',
    name: '',
    number: '',
    showForm: false,
    btnContent: 'Create Contact',
    error: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { contact } = nextProps;
    return contact
      ? {
          ...prevState,
          email: contact.email,
          name: contact.name,
          number: formatPhoneNumber(contact.number),
          btnContent: 'Edit Contact'
        }
      : { ...prevState, email: '', name: '', number: '' };
  }

  openForm = e => {
    this.setState(() => ({
      showForm: true,
      btnContent: 'Cancel'
    }));
  };

  closeForm = e => {
    this.setState(() => ({
      showForm: false,
      btnContent: 'Create Contact'
    }));
  };

  handleEmailChange = e => {
    const { value } = e.target;
    this.setState(() => ({
      email: value
    }));
  };

  handleNameChange = e => {
    const { value } = e.target;
    if (/[^a-z\s]/i.test(value)) return;
    this.setState(() => ({
      name: value
    }));
  };

  handleNumberChange = e => {
    const { value } = e.target;
    if (/[^\d\s()-]/.test(value) || value.length > 14) return;
    this.setState(() => ({
      number: formatPhoneNumber(value)
    }));
  };

  handleSave = e => {
    const { name, email, number } = this.state;
    const [first = '', last = ''] = name.split(' ');
    let error;
    if (first.length < 3) error = 'Provide a valid first name';
    else if (last.length < 3) error = 'Provide a valid last name';
    else if (!isEmail(email)) error = 'Provide a valid email';
    else if (number.length != 14) error = 'Provide a valid number';

    if (error) this.setState(() => ({ error }));
    else {
      const contact = { name, email, number };
      this.props.contact
        ? this.props.editContactHandler(contact)
        : this.props.newContactHandler(contact);

      this.setState(() => ({
        error: undefined,
        showForm: false,
        btnContent: 'Edit Contact'
      }));
    }
  };

  render() {
    return (
      <div className="add-contact-controller">
        <ToggleButton
          content={this.state.btnContent}
          disabled={this.props.disabled}
          onClick={this.state.showForm ? this.closeForm : this.openForm}
        />
        {this.state.showForm && (
          <ContactMiniForm
            error={this.state.error}
            name={this.state.name}
            email={this.state.email}
            number={this.state.number}
            nameHandler={this.handleNameChange}
            emailHandler={this.handleEmailChange}
            numberHandler={this.handleNumberChange}
            saveHandler={this.handleSave}
          />
        )}
      </div>
    );
  }
}
