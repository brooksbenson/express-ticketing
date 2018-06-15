import React from 'react';

export default props => (
  <section className={props.className}>
    <h3> Comments </h3>
    <textarea
      onChange={e => props.onCommentChange(e.target.value)}
      value={props.comment}
    />
    <button onClick={props.onCommentSave}> Save Comment </button>
    <ul>
      {props.comments.map(c => (
        <li key={c.key}>
          <div>
            <span>{c.name}</span>
            <span>{c.date}</span>
          </div>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  </section>
);
