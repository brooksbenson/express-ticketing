import React from 'react';
import moment from 'moment';

export default props => (
  <section className={props.className}>
    <h3 className={`${props.className}__heading heading heading--tertiary`}>
      Comments
    </h3>
    <textarea
      className={`${props.className}__textarea textarea`}
      onChange={e => props.onCommentChange(e.target.value)}
      placeholder="Leave a comment..."
      value={props.comment}
    />
    <button className="btn btn--special" onClick={props.onCommentSave}>
      Save
    </button>
    <ul className={`${props.className}__list`}>
      {props.comments.map(c => (
        <li className={`${props.className}__list-item`} key={c.key}>
          <div className={`${props.className}__list-item-top`}>
            <span className="name">{c.name}</span>
            <span className="date">
              {moment(c.date).format('MM-DD-YY [at] hh:ma')}
            </span>
          </div>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  </section>
);
