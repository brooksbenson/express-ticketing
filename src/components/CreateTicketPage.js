import React from 'react';

class CreateTicketPage extends React.Component {
  render() {
    return (
      <section className="content-container">
        <form className="ticket-form">
          <h2 className="ticket-form__heading"> Create Ticket </h2>
          <input type="text" name="account" placeholder="Account"/>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input type="text" name="contact" placeholder="Contact"/>
          <textarea placeholder="Description (optional)"></textarea>
          <button>Save Ticket</button>
        </form>
      </section>
    )
  }
}

export default CreateTicketPage;