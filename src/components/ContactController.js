import React from 'react';
import { connect } from 'react-redux';
import formatPhoneNumber from '../helpers/format-number';
import { startAddContact, startUpdateContact } from '../actions/contacts';

const ContactController = props => {
  const emailChange = e => {
    props.contactCtrlDataChange({
      ...props.contactCtrlData,
      email: e.target.value
    });
  };

  const nameChange = e => {
    props.contactCtrlDataChange({
      ...props.contactCtrlData,
      name: e.target.value
    });
  };

  const numberChange = e => {
    const number = e.target.value.replace(/[^\d]/g, '');
    props.contactCtrlDataChange({
      ...props.contactCtrlData,
      number
    });
  };

  const save = e => {
    if (props.contact) {
      const { key, ...update } = props.contactCtrlData;
      props.startUpdateContact({
        accountKey: props.account.key,
        contactKey: props.contact.key,
        update
      });
    } else {
      props.startAddContact({
        accountKey: props.account.key,
        contact: { ...props.contactCtrlData }
      });
    }
  };

  return (
    <div className="contact-controller">
      <button
        className="btn btn--secondary"
        disabled={props.account == null}
        onClick={props.toggleContactCtrl}
      >
        {props.contactCtrlOpen
          ? 'Cancel'
          : `${props.contact ? 'Edit' : 'Create'} Contact`}
      </button>
      {props.contactCtrlOpen && (
        <div className="contact-controller__form">
          <div className="contact-controller__form-input">
            <span> Name </span>
            <input
              className="input"
              onChange={nameChange}
              type="text"
              value={props.contactCtrlData.name}
            />
          </div>
          <div className="contact-controller__form-input">
            <span> Email </span>
            <input
              className="input"
              onChange={emailChange}
              type="text"
              value={props.contactCtrlData.email}
            />
          </div>
          <div className="contact-controller__form-input">
            <span> Number </span>
            <input
              className="input"
              onChange={numberChange}
              type="text"
              value={formatPhoneNumber(props.contactCtrlData.number)}
            />
          </div>
          <button className="btn btn--tertiary" onClick={save}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startAddContact: contact => dispatch(startAddContact(contact)),
  startUpdateContact: update => dispatch(startUpdateContact(update))
});
export default connect(undefined, mapDispatchToProps)(ContactController);