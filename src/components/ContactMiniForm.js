import React from 'react';

export default props => (
  <div className="contact-mini-form">
    <label className="contact-mini-form__input" htmlFor="name">
      <span className="contact-mini-form__input-label"> Name </span>
      <input className="input" name="name" type="text" value={props.name} />
    </label>
    <label className="contact-mini-form__input" htmlFor="email">
      <span className="contact-mini-form__input-label"> Email </span>
      <input className="input" name="email" type="text" value={props.email} />
    </label>
    <label className="contact-mini-form__input" htmlFor="number">
      <span className="contact-mini-form__input-label"> Number </span>
      <input className="input" name="number" type="text" value={props.number} />
    </label>
    <button className="btn btn--secondary">Save</button>
  </div>
);
