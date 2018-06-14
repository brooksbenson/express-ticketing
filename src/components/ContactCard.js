import React from 'react';

export default props => (
  <div className={props.className}>
    <h3> Contact </h3>
    <ul>
      <li>{props.name}</li>
      <li>{props.email}</li>
      <li>{props.number}</li>
    </ul>
  </div>
);
