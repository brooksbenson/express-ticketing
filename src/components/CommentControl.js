import React from 'react';
import moment from 'moment';

export default props => (
  <section className={props.className}>
    <h3> Comments </h3>
    <textarea
      className="textarea"
      onChange={e => props.onCommentChange(e.target.value)}
      placeholder="Leave a comment..."
      value={props.comment}
    />
    <button className="btn btn--primary" onClick={props.onCommentSave}>
      Save
    </button>
    <ul>
      {props.comments.map(c => (
        <li key={c.key}>
          <div>
            <span className="name">{c.name}</span>
            <span className="date">
              {moment(c.date).format('MM-DD-YY [at] h:ma')}
            </span>
          </div>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  </section>
);
