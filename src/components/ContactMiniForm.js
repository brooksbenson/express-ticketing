import React from 'react';

export default props => (
  <div className="contact-mini-form">
    {props.error && <i> {props.error} </i>}
    <label className="contact-mini-form__input" htmlFor="name">
      <span className="contact-mini-form__input-label"> Name </span>
      <input
        className="input"
        name="name"
        onChange={props.nameHandler}
        type="text"
        value={props.name}
      />
    </label>
    <label className="contact-mini-form__input" htmlFor="email">
      <span className="contact-mini-form__input-label"> Email </span>
      <input
        className="input"
        name="email"
        onChange={props.emailHandler}
        type="text"
        value={props.email}
      />
    </label>
    <label className="contact-mini-form__input" htmlFor="number">
      <span className="contact-mini-form__input-label"> Number </span>
      <input
        className="input"
        name="number"
        onChange={props.numberHandler}
        type="text"
        value={props.number}
      />
    </label>
    <button className="btn btn--secondary" onClick={props.saveHandler}>
      Save
    </button>
  </div>
);
