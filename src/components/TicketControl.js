import React from 'react';

export default props => (
  <div className={props.className}>
    <h3> Ticket Control </h3>
    <div className="container">
      <div>
        <h4> Triage </h4>
        <div className="combobox">
          <span> Urgency </span>
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
        <div className="combobox">
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
        <button className="btn btn--special" onClick={props.onSave}>
          Save
        </button>
      </div>
      <div>
        <h4> Users </h4>
        <button className="btn btn--special" onClick={props.openAddUserModal}>
          Add
        </button>
        <ul>{props.users.map(u => <li key={u.key}>{u.name}</li>)}</ul>
      </div>
    </div>
  </div>
);
