import React from 'react';

export function TicketFormAccount() {
  return (
    <section className="ticket-form__block">
      <h3 className="heading-secondary"> Account </h3>
      <input
        className="input"
        type="text"
        name="account"
        placeholder="Search accounts..."
      />
      <input 
        className="input"
        type="text"
        name="contact"
        placeholder="Search contacts..."
      />
    </section>
  );
}