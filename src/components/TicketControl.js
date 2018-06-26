import React from 'react';

export default props => (
  <section className={props.className}>
    <div className={`${props.className}__triage`}>
      <h4
        className={`${props.className}__subheading heading heading--tertiary`}
      >
        Triage
      </h4>
      <div className={`${props.className}__combobox`}>
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
      <div className={`${props.className}__combobox`}>
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
      <button className="btn btn--secondary" onClick={props.onSave}>
        Save
      </button>
    </div>
    <div className={`${props.className}__users`}>
      <h4
        className={`${props.className}__subheading heading heading--tertiary`}
      >
        Users
      </h4>
      <div className={`${props.className}__users-main`}>
        <button className="btn btn--primary" onClick={props.openAddUserModal}>
          Add
        </button>
        <ul className={`${props.className}__user-list`}>
          {props.users.map(u => <li key={u.key}>{u.name}</li>)}
        </ul>
      </div>
    </div>
  </section>
);
