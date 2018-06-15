import React from 'react';
import ContactCard from './ContactCard';
import TicketControl from './TicketControl';
import CommentControl from './CommentControl';
import AddUserModal from './AddUserModal';
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
      addUserModalOpen: false,
      userSearchString: '',
      userToAdd: ''
    };
  }

  onUserPick = key => {
    const name = this.props.users[]

    this.setState()
  } 

  render() {
    return (
      <section>
        <div>
          <h2> {title} </h2>
          <span> {accountName} </span>
        </div>
        <AddUserModal 
          users={}
          isOpen={}
          searchString={}
          onAddUser={}
          onUserPick={}
          onSearchChange={}
          onRequestClose={} 
        />
        <ContactCard />
        <TicketControl />
        <CommentControl />
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
