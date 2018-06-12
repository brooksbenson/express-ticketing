import React from 'react';
import { connect } from 'react-redux';
import formatPhoneNumber from '../helpers/format-number';
import { startAddContact, startUpdateContact } from '../actions/contacts';

export class ContactController extends React.Component {
  constructor(props) {
    super(props);
    const { contact } = props;
    this.state = resetState();
  }

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onNumberChange = e => {
    const number = e.target.value;
    this.setState(() => ({ number }));
  };

  onSave = e => {
    const { display, ...contact } = this.state;
    if (this.props.contact) {
      this.props.startUpdateContact(contact);
    } else {
      this.props.startAddContact(contact);
    }
    this.setState(() => ({ display: false }));
  };

  toggleDisplay = () => {
    this.setState(s => ({ display: !s.display }));
  };

  render() {
    const { activeAccountKey, contact } = this.props;
    const { display, email, name, number } = this.state;
    return (
      <div className="contact-controller">
        <button
          className="btn btn--secondary"
          disabled={!activeAccountKey}
          onClick={this.toggleDisplay}
        >
          {display ? 'Cancel' : `${contact ? 'Edit' : 'Create'} Contact`}
        </button>
        {display && (
          <div className="contact-controller__form">
            <div className="contact-controller__form-input">
              <span> Name </span>
              <input
                className="input"
                onChange={this.onNameChange}
                type="text"
                value={name}
              />
            </div>
            <div className="contact-controller__form-input">
              <span> Email </span>
              <input
                className="input"
                onChange={this.onEmailChange}
                type="text"
                value={email}
              />
            </div>
            <div className="contact-controller__form-input">
              <span> Number </span>
              <input
                className="input"
                onChange={this.onNumberChange}
                type="text"
                value={formatPhoneNumber(number)}
              />
            </div>
            <button className="btn btn--tertiary" onClick={this.onSave}>
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ contacts, activeContactKey, activeAccountKey }) => ({
  activeAccountKey,
  contact: activeContactKey ? contacts[activeContactKey] : null
});

const mapDispatchToProps = dispatch => ({
  startAddContact: contact => dispatch(startAddContact(contact)),
  startUpdateContact: update => dispatch(startUpdateContact(update))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactController);
