import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import accountSelector from '../selectors/accounts';
import contactSelector from '../selectors/contacts';

export class TicketForm extends React.Component {

  state = {
    account: null,
    contact: null
  }

  onAccountSelect = (account) => {
    this.setState(() => ({ 
      account,
      contact: null 
    }));
  };

  onContactSelect = (contact) => {
    this.setState(() => ({ contact }));
  };

  onTicketSubmit = (e) => {
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
            onValueSelect={this.onAccountSelect}
            placeholder="Search accounts..."
            selector={accountSelector}
            values={this.props.accounts}
            valueDisplayKey="name"
          />
          <SearchBar
            canSearch={this.state.account != null}
            className="ticket-form__search-bar"
            onValueSelect={this.onContactSelect}
            placeholder="Search contacts..."
            selector={contactSelector}
            values={this.state.account ? this.state.account.contacts : []}
            valueDisplayKey="name"
          />
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