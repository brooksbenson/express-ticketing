import React from 'react';

export default props => (
  <div className={props.className}>
    <h3> Ticket Control </h3>
    <div>
      <h4> Triage </h4>
      <span> Urgency </span>
      <div>
        <select
          className="select"
          onChange={e => props.onUrgencyChange(e.target.value)}
          value={props.urgency}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <span> Status </span>
        <select
          className="select"
          onChange={e => props.onStatusChange(e.target.value)}
          value={props.status}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <button onClick={props.onSave}>Save</button>
    </div>
    <div>
      <h4> Users </h4>
      <button onClick={props.openAddUserModal}> Add </button>
      <ul>{props.users.map(u => <li key={u.key}>{u.name}</li>)}</ul>
    </div>
  </div>
);
