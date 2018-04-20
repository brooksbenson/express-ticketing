import React from 'react';

export function TicketFormTriage() {
  return (
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
  )
}