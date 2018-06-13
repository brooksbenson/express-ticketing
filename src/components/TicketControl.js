import React from 'react';

export default props => (
  <div>
    <h3> Ticket Control </h3>
    <div>
      <h4> Triage </h4>
      <span> Urgency </span>
      <select
        className="select"
        onChange={this.onUrgencyChange}
        value={urgency}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div>
      <h4> Users </h4>
      <button> Add </button>
      <ul>{ticketUsers.map(u => <li key={u.key}> {u.name} </li>)}</ul>
    </div>
  </div>
);
