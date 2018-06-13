import React from 'react';
import { connect } from 'react-redux';
import { startSetActiveTicket } from '../actions/active-ticket';
import { startAddUser, startUpdateUrgency } from '../actions/ticket';
import { startAddComment } from '../actions/comments';

export class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    const { key } = props.match.params;
    props.startSetActiveTicket(key);
    this.state = {
      userSearchString: '',
      urgency: props.urgency
    };
  }

  onUrgencyChange = e => {
    const urgency = e.target.value;
    this.setState(() => ({ urgency }));
    this.props.startUpdateUrgency(urgency);
  };

  render() {
    const { urgency } = this.state;
    const {
      title,
      contact,
      accountName,
      ticketUsers,
      users,
      comments
    } = this.props;
    return (
      <section>
        <div>
          <div>
            <h2> {title} </h2>
            <span> {accountName} </span>
          </div>
          <div>
            <h3> Contact </h3>
            <p> {contact.name} </p>
            <p> {contact.email} </p>
            <p> {contact.number} </p>
          </div>
        </div>

        <div />
      </section>
    );
  }
}

const mapStateToProps = ({
  activeTicketKey,
  tickets,
  contacts,
  activeContactKey,
  accounts,
  activeAccountKey,
  comments,
  users
}) => ({
  title: activeTicketKey ? tickets[activeTicketKey].title : '',
  urgency: activeTicketKey ? tickets[activeTicketKey].urgency : '',
  comments,
  contact: contacts[activeContactKey],
  accountName: activeAccountKey ? accounts[activeAccountKey].name : '',
  ticketUsers: activeTicketKey
    ? Object.keys(tickets[activeTicketKey].userKeys).map(key => ({
        ...users[key],
        key
      }))
    : [],
  users
});

const mapDispatchToProps = dispatch => ({
  startSetActiveTicket: key => dispatch(startSetActiveTicket(key)),
  startAddComment: text => dispatch(startSetComment(text)),
  startAddUser: key => dispatch(startAddUser(key)),
  startUpdateUrgency: urgency => dispatch(startUpdateUrgency(urgency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketPage);
