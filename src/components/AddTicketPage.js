import React from 'react';
import { connect } from 'react-redux';
import { startAddTicket } from '../actions/tickets';
import { startAddComment } from '../actions/comments';
import {
  startSetActiveAccount,
  startUnsetActiveAccount
} from '../actions/active-account';
import {
  setActiveContact,
  unsetActiveContact
} from '../actions/active-contact';
import { startSetActiveTicket } from '../actions/active-ticket';
import SearchBar from './SearchBar';
import ContactController from './ContactController';
import accountSelector from '../selectors/accounts';
import contactSelector from '../selectors/contacts';

const defaultState = {
  accountSearchString: '',
  contactSearchString: '',
  comment: '',
  title: '',
  urgency: ''
};

export class AddTicketPage extends React.Component {
  state = { ...defaultState };

  static getDerivedStateFromProps({ activeContactKey, contacts }, prevState) {
    if (activeContactKey) {
      const { name } = contacts[activeContactKey];
      return { ...prevState, contactSearchString: name };
    }
  }

  onAccountSearchChange = text => {
    this.props.startUnsetActiveAccount();
    this.setState(() => ({
      accountSearchString: text,
      contactSearchString: ''
    }));
  };

  onAccountPick = key => {
    this.props.startSetActiveAccount(key);
    const { name } = this.props.accounts[key];
    this.setState(() => ({
      accountSearchString: name
    }));
  };

  onContactSearchChange = text => {
    this.props.unsetActiveContact();
    this.setState(() => ({
      contactSearchString: text
    }));
  };

  onContactPick = key => {
    this.props.setActiveContact(key);
  };

  onUrgencyChange = e => {
    const urgency = e.target.value;
    if (/^(low|medium|high)$/i.test(urgency)) {
      this.setState(() => ({ urgency }));
    }
  };

  onTitleChange = e => {
    const title = e.target.value;
    if (title.length <= 40) {
      this.setState(() => ({ title }));
    }
  };

  onCommentChange = e => {
    const comment = e.target.value;
    this.setState(() => ({ comment }));
  };

  onSubmit = e => {
    const { title, urgency, comment } = this.state;
    this.props.startAddTicket({ title, urgency }).then(async key => {
      await this.props.startAddComment(comment, key);
      this.props.history.push(`/ticket/${key}`);
    });
  };

  render() {
    const {
      accountSearchString,
      contactSearchString,
      urgency,
      title,
      comment
    } = this.state;
    const {
      accounts,
      contacts,
      activeAccountKey,
      activeContactKey
    } = this.props;
    return (
      <section className="content-container">
        <div className="ticket-form content-innards">
          <h2 className="heading heading--primary"> Create Ticket </h2>
          <section className="ticket-form__block">
            <h3 className="heading heading--secondary"> Account </h3>
            <SearchBar
              className="ticket-form__search-bar"
              disabled={false}
              displayResults={activeAccountKey === null && accountSearchString}
              onPick={this.onAccountPick}
              onSearchChange={this.onAccountSearchChange}
              placeholder="Search accounts..."
              searchString={accountSearchString}
              results={accountSelector(
                Object.keys(accounts).map(key => ({ ...accounts[key], key })),
                accountSearchString
              )}
            />
            <div className="ticket-form__block-row">
              <SearchBar
                className="ticket-form__search-bar"
                disabled={activeAccountKey === null}
                displayResults={
                  activeContactKey === null &&
                  activeAccountKey !== null &&
                  contactSearchString
                }
                onPick={this.onContactPick}
                onSearchChange={this.onContactSearchChange}
                placeholder="Search contacts..."
                searchString={contactSearchString}
                results={contactSelector(
                  Object.keys(contacts).map(key => ({ ...contacts[key], key })),
                  contactSearchString
                )}
              />
              <ContactController />
            </div>
          </section>
          <section className="ticket-form__block">
            <h3 className="heading heading--secondary">Triage</h3>
            <div className="ticket-form__block-row">
              <input
                className="input"
                name="title"
                onChange={this.onTitleChange}
                placeholder="Title"
                type="text"
                value={title}
              />
              <select
                className="select"
                onChange={this.onUrgencyChange}
                value={urgency || 'urgency'}
              >
                <option value="urgency" disabled>
                  Urgency
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <textarea
              className="textarea ticket-form__textarea"
              name="comment"
              onChange={this.onCommentChange}
              placeholder="Comment"
              value={comment}
            />
          </section>
          <button className="btn btn--primary" onClick={this.onSubmit}>
            Submit Ticket
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({
  accounts,
  contacts,
  activeAccountKey,
  activeContactKey
}) => ({
  accounts,
  contacts,
  activeAccountKey,
  activeContactKey
});

const mapDispatchToProps = dispatch => ({
  startSetActiveAccount: key => dispatch(startSetActiveAccount(key)),
  startUnsetActiveAccount: () => dispatch(startUnsetActiveAccount()),
  setActiveContact: key => dispatch(setActiveContact(key)),
  unsetActiveContact: () => dispatch(unsetActiveContact()),
  startSetActiveTicket: key => dispatch(startSetActiveTicket(key)),
  startAddTicket: ({ title, urgency }) =>
    dispatch(startAddTicket({ title, urgency })),
  startAddComment: (text, key) => dispatch(startAddComment(text, key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTicketPage);
