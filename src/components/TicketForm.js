import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import accountSelector from '../selectors/accounts';
import contactSelector from '../selectors/contacts';

export class TicketForm extends React.Component {
  state = {
    account: null,
    contact: null,
    urgency: '',
    title: '',
    description: ''
  };

  onAccountModification = modification => {
    this.setState(() => ({
      account: modification,
      contact: null
    }));
  };

  onContactModification = modification => {
    if (modification != null) this.selectUrgency.focus();
    this.setState(() => ({ contact: modification }));
  };

  onUrgencyChange = e => {
    const urgency = e.target.value;
    if (/^(low|medium|high)$/i.test(urgency)) {
      this.titleInput.focus();
      this.setState(() => ({ urgency }));
    }
  };

  onUrgencyKeypress = e => {
    if (e.key == 'Enter') {
      this.titleInput.focus();
    }
  };

  onTitleChange = e => {
    const title = e.target.value;
    if (title.length <= 40) {
      this.setState(() => ({ title }));
    }
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onTicketSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="ticket-form" onSubmit={this.onTicketSubmit}>
        <h2 className="heading"> Create Ticket </h2>
        <section className="ticket-form__block">
          <h3 className="heading-secondary"> Account </h3>
          <SearchBar
            canSearch={true}
            className="ticket-form__search-bar"
            displayResults={this.state.account}
            isFocused={this.state.account == null}
            onValueModification={this.onAccountModification}
            placeholder="Search accounts..."
            selector={accountSelector}
            uniqueValueKey={'id'}
            values={this.props.accounts}
            valueDisplayKey="name"
          />
          <div className="ticket-form__block-row">
            <SearchBar
              canSearch={this.state.account != null}
              className="ticket-form__search-bar"
              isFocused={
                this.state.account != null && this.state.contact == null
              }
              onValueModification={this.onContactModification}
              placeholder="Search contacts..."
              selector={contactSelector}
              uniqueValueKey={'email'}
              values={this.state.account ? this.state.account.contacts : []}
              valueDisplayKey="name"
            />
            <button className="btn btn--secondary">Create Contact</button>
          </div>
        </section>
        <section className="ticket-form__block">
          <h3 className="heading-secondary">Triage</h3>
          <div className="ticket-form__block-row">
            <select
              className="select"
              onChange={this.onUrgencyChange}
              onKeyPress={this.onKeyPress}
              ref={select => {
                this.selectUrgency = select;
              }}
              value={this.state.urgency || 'urgency'}
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
              onChange={this.onTitleChange}
              placeholder="Title"
              ref={input => {
                this.titleInput = input;
              }}
              type="text"
            />
          </div>
          <textarea
            className="textarea"
            name="description"
            onChange={this.onDescriptionChange}
            placeholder="Description (optional)"
            value={this.state.description}
          />
        </section>
        <button className="btn btn--primary">Submit Ticket</button>
      </form>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps)(TicketForm);
