import React from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import selectAccounts from '../selectors/accounts';
import selectContacts from '../selectors/contacts';

export class TicketForm extends React.Component {

  state = {
    selectedAccount: null,

    contactSearchResult: [],
    contactSearchString: '',
    contactInputFocused: false,
    selectedContact: null
  };

  onAccountInputFocus = () => {
    if (this.state.selectedAccount !== null) return;
    this.setState(() => ({
      accountSearchResult: selectAccounts(
        this.props.accounts,
        this.state.accountSearchString
      ), 
      accountInputFocused: true,
      selectedAccount: null 
    }));
  };

  onAccountSearch = (e) => {
    const accountSearchString= e.target.value;
    this.setState(() => ({
      accountInputFocused: true,
      accountSearchResult: selectAccounts(
        this.props.accounts || accounts, 
        accountSearchString
      ),
      accountSearchString,
      contactInputFocused: false,
      contactSearchString: ''
    }));
  };

  onAccountSelect = (account) => {
    this.setState(() => ({
      accountInputFocused: false,
      accountSearchString: account.name,
      accountSearchResult: [],
      selectedAccount: account,
      contactInputFocused: true,
      contactSearchResult: selectContacts(account.contacts, '')
    }));
    this.contactInput.focus();
  };

  onContactInputFocus = () => {
    if (this.state.selectedAccount === null ||
        this.state.selectedContact !== null) return;

    this.setState(() => ({
      contactInputFocused: true,
      contactSearchResult: selectContacts(
        this.state.selectedAccount.contacts,
        this.state.contactSearchString
      ),
      selectedContact: null
    }));
  };

  onContactSearch = (e) => {
    if (this.state.selectedAccount === null) return;
    const contactSearchString = e.target.value;
    this.setState(() => ({
      contactInputFocused: true,
      contactSearchString,
      contactSearchResult: selectContacts(
        this.state.selectedAccount.contacts,
        contactSearchString
      )
    }));
  }

  onContactSelect = (contact) => {
    this.setState(() => ({
      selectedContact: contact,
      contactSearchString: contact.name,
      contactInputFocused: false 
    }));
  }

  render() {
    return (
      <form className="ticket-form">
        <h2 className="heading"> Create Ticket </h2>
        <section className="ticket-form__block">
          <h3 className="heading-secondary"> Account </h3>
          <input
            autoComplete="off"
            className="input"
            name="account"
            onChange={this.onAccountSearch}
            onFocus={this.onAccountInputFocus}
            placeholder="Search accounts..."
            type="text"
            value={this.state.accountSearchString}
          />
          { this.state.accountInputFocused &&
            <SearchResults
              resultsArray={this.state.accountSearchResult}
              resultsDisplayProp='name'
              onResultClick={this.onAccountSelect}
            />
          }
          <input
            autoComplete="off"
            className="input"
            name="contact"
            onFocus={this.onContactInputFocus}
            onChange={this.onContactSearch}
            placeholder="Search contacts..."
            ref={input => { this.contactInput = input }}
            type="text"
            value={this.state.contactSearchString}
          />
          { this.state.contactInputFocused &&
            <SearchResults
              resultsArray={this.state.contactSearchResult}
              resultsDisplayProp='name'
              onResultClick={this.onContactSelect}
            />
          }
        </section>
        <section className="ticket-form__block">
          <h3 className="heading-secondary">
            Triage
          </h3>
          <div className="ticket-form__block-row">
            <select 
              className="select"
              value="urgency"
            >
              <option value="urgency" disabled>Urgency</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
          <textarea
            className="textarea"
            placeholder="Description (optional)"
            name="description"
          />
        </section>
        <button className="button button--ticket-form">
          Submit Ticket
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps)(TicketForm);