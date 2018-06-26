import React from 'react';
import moment from 'moment';

const colorUrgency = urgency => {
  switch (urgency) {
    case 'high':
      return '#ff0000';
    case 'medium':
      return '#ff7400';
    case 'low':
      return '#ffc100';
  }
};

export default props => (
  <div
    className={props.className}
    onClick={() => {
      props.history.push(`ticket/${props.ticketKey}`);
    }}
  >
    <div className={`${props.className}__top`}>
      <h3>{props.accountName}</h3>
      <button
        className="urgency"
        style={{ background: colorUrgency(props.urgency) }}
      />
    </div>
    <p className="title">{props.title}</p>
    <p className="date">{moment(props.date).format('MM-DD-YYYY [at] h:mma')}</p>
  </div>
);
