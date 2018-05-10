import React from 'react';
import ToggleButton from './ToggleButton';
import ContactMiniForm from './ContactMiniForm';
import formatPhoneNumber from '../enhancers/format-phone-number';
import validateContact from '../enhancers/validate-contact';

export default class ContactController extends React.Component {
  state = {
    contact: {
      new: true,
      email: '',
      name: '',
      number: ''
    },
    showForm: false,
    btnContent: 'Create Contact',
    error: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { contactData } = nextProps;
    if (contactData) {
      const btnContent = 'Edit Contact';
      const contact = {
        ...contactData,
        new: false,
        number: formatPhoneNumber(contactData.number)
      };
      return { ...prevState, btnContent, contact };
    } else {
      const btnContent = 'Create Contact';
      const contact = { new: true, name: '', email: '', number: '' };
      return { ...prevState, btnContent, contact };
    }
  }

  openForm = e => {
    this.setState(() => ({
      showForm: true,
      btnContent: 'Cancel'
    }));
  };

  closeForm = e => {
    this.setState(({ contact }) => ({
      showForm: false,
      btnContent: contact.new ? 'Create Contact' : 'Edit Contact'
    }));
  };

  handleEmailChange = e => {
    const email = e.target.value;
    this.setState(({ contact }) => ({
      contact: { ...contact, email }
    }));
  };

  handleNameChange = e => {
    const name = e.target.value;
    if (/[^a-z\s]/i.test(name)) return;
    this.setState(({ contact }) => ({
      contact: { ...contact, name }
    }));
  };

  handleNumberChange = e => {
    const number = e.target.value;
    if (/[^\d\s()-]/.test(number) || number.length > 14) return;
    this.setState(({ contact }) => ({
      contact: { ...contact, number: formatPhoneNumber(number) }
    }));
  };

  handleSave = e => {
    const { ...contact } = this.state.contact;
    const error = validateContact(contact);
    if (error) this.setState(() => ({ error }));
    else {
      this.state.contact.new
        ? this.props.newContactHandler(contact)
        : this.props.editContactHandler(contact);
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
            name={this.state.contact.name}
            email={this.state.contact.email}
            number={this.state.contact.number}
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
