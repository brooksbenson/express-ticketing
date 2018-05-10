import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import ContactController from './ContactController';
import {
  accountBlur,
  accountPick,
  accountSearchChange,
  contactBlur,
  contactPick,
  contactSearchChange,
  descriptionChange,
  titleChange,
  urgencyChange
} from '../actions/newTicket';

export const TicketForm = props => {
  const onUrgencyChange = e => {
    const change = e.target.value;
    if (/^(low|medium|high)$/i.test(change)) {
      props.urgencyChange(change);
    }
  };

  const onTitleChange = e => {
    const change = e.target.value;
    if (title.length <= 40) {
      props.titleChange(change);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="ticket-form">
      <h2 className="heading"> Create Ticket </h2>
      <section className="ticket-form__block">
        <h3 className="heading-secondary"> Account </h3>
        <SearchBar
          className="ticket-form__search-bar"
          disabled={false}
          displayKey="name"
          onBlur={props.accountBlur}
          onPick={props.accountPick}
          onSearchChange={props.accountSearchChange}
          placeholder="Search accounts..."
          searchString={props.accountSearchString}
          results={props.accountSearchResults}
          uniqueKey={'id'}
          values={props.accounts}
        />
        <div className="ticket-form__block-row">
          <SearchBar
            className="ticket-form__search-bar"
            disabled={props.account == null}
            displayKey="name"
            onBlur={props.contactBlur}
            onPick={props.contactPick}
            onSearchChange={props.contactSearchChange}
            placeholder="Search contacts..."
            searchString={props.contactSearchString}
            results={props.contactSearchResults}
            uniqueKey={'email'}
            values={props.account ? props.account.contacts : []}
          />
          <ContactController
            contactData={props.contact}
            disabled={props.account == null}
          />
        </div>
      </section>
      <section className="ticket-form__block">
        <h3 className="heading-secondary">Triage</h3>
        <div className="ticket-form__block-row">
          <select
            className="select"
            onChange={onUrgencyChange}
            value={props.urgency || 'urgency'}
          >
            <option value="urgency" disabled>
              Urgency
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            className="input"
            name="title"
            onChange={onTitleChange}
            placeholder="Title"
            type="text"
          />
        </div>
        <textarea
          className="textarea"
          name="description"
          onChange={props.descriptionChange}
          placeholder="Description (optional)"
          value={props.description}
        />
      </section>
      <button className="btn btn--primary">Submit Ticket</button>
    </div>
  );
};

const mapStateToProps = ({ newTicket }) => ({ ...newTicket });
const mapDispatchToProps = dispatch => ({
  accountBlur: () => dispatch(accountBlur()),
  accountPick: pick => dispatch(accountPick(pick)),
  accountSearchChange: change => dispatch(accountSearchChange(change)),
  contactBlur: () => dispatch(contactBlur()),
  contactPick: pick => dispatch(contactPick(pick)),
  contactSearchChange: change => dispatch(contactSearchChange(change)),
  descriptionChange: change => dispatch(descriptionChange(change)),
  titleChange: change => dispatch(titleChange(change)),
  urgencyChange: change => dispatch(urgencyChange(change))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);
