import React from 'react';
import { TicketFormAccount as AccountSection } from './TicketFormAccount';
import { TicketFormTriage as TriageSection } from './TicketFormTriage';

class TicketForm extends React.Component {
  render() {
    return (
      <form className="ticket-form">
        <h2 className="heading"> Create Ticket </h2>
        <AccountSection />
        <TriageSection />
        <button className="button button--ticket-form">
          Submit Ticket
        </button>
      </form>
    );
  }
}

export default TicketForm;