import React from 'react';

export function TicketFormAccount() {
  return (
    <section className="ticket-form__block">
      <h3 className="ticket-form__heading ticket-form__heading--secondary">
        Account
      </h3>
      <input
        className="ticket-form__input ticket-form__input--accounts"
        type="text"
        name="account"
        placeholder="Search accounts..."
      />
      <input 
        className="ticket-form__input ticket-form__input--accounts"
        type="text"
        name="contact"
        placeholder="Search contacts..."
      />
    </section>
  );
}