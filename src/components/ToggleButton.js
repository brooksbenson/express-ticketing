import React from 'react';

export default props => (
  <button
    className="btn btn--secondary"
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.content}
  </button>
);
