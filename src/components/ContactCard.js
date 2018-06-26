import React from 'react';

export default props => (
  <div className={props.className}>
    <h3 className={`${props.className}__header heading heading--tertiary`}>
      Contact
    </h3>
    <ul className={`${props.className}__info`}>
      <li>{props.name}</li>
      <li>{props.email}</li>
      <li>{props.number}</li>
    </ul>
  </div>
);

// className="ticket-page__contact-heading"
