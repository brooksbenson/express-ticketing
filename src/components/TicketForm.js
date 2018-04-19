import React from 'react';
import { TicketFormAccount as AccountSection } from './TicketFormAccount';

class TicketForm extends React.Component {
  render() {
    return (
      <form className="ticket-form">
        <h2 className="ticket-form__heading"> Create Ticket </h2>
        <AccountSection />
      </form>
    );
  }
}

export default TicketForm;