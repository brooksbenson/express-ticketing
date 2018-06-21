import React from 'react';
import ContactCard from './ContactCard';
import TicketControl from './TicketControl';
import CommentControl from './CommentControl';
import AddUserModal from './AddUserModal';
import { connect } from 'react-redux';
import { startSetActiveTicket } from '../actions/active-ticket';
import {
  startAddUser,
  startUpdateUrgency,
  startCloseTicket,
  startReopenTicket
} from '../actions/ticket';
import { startAddComment } from '../actions/comments';
import separateUsers from '../helpers/separate-users';
import orderComments from '../helpers/order-comments';

export class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    const { key } = props.match.params;
    props.startSetActiveTicket(key);
    console.log(props);
    this.state = {
      urgency: props.urgency,
      status: props.status,
      addUserModalOpen: false,
      userSearchString: '',
      userToAdd: '',
      userPicked: false,
      comment: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { urgency, status } = nextProps;
    return { ...prevState, urgency, status };
  }

  onCloseModal = () => {
    this.setState(() => ({
      addUserModalOpen: false,
      userSearchString: '',
      userToAdd: '',
      userPicked: false
    }));
  };

  onUserPick = key => {
    const { name } = this.props.nonAttachedUsers.find(u => u.key === key);
    this.setState(() => ({
      userToAdd: key,
      userSearchString: name,
      userPicked: true
    }));
  };

  onUserSearchChange = text => {
    this.setState(() => ({
      userSearchString: text,
      userPicked: false
    }));
  };

  onAddUser = () => {
    const key = this.state.userToAdd;
    this.props.startAddUser(key).then(() => {
      this.onCloseModal();
    });
  };

  onUrgencyChange = urgency => {
    this.setState(() => ({ urgency }));
  };

  onStatusChange = status => {
    this.setState(() => ({ status }));
  };

  onOpenAddUserModal = () => {
    this.setState(() => ({
      addUserModalOpen: true
    }));
  };

  onTicketControlSave = () => {
    const { urgency, status } = this.state;
    const statusFunc =
      status === 'closed'
        ? this.props.startCloseTicket
        : this.props.startReopenTicket;
    Promise.all([this.props.startUpdateUrgency(urgency), statusFunc()]);
  };

  onCommentChange = comment => {
    this.setState(() => ({ comment }));
  };

  onCommentSave = () => {
    const { comment } = this.state;
    this.props.startAddComment(comment).then(() => {
      this.setState(() => ({ comment: '' }));
    });
  };

  render() {
    return (
      <section className="content-container">
        <div className="content-innards ticket-page">
          <div className="ticket-page__heading">
            <h2 className="heading heading--primary"> {this.props.title} </h2>
            <span> {this.props.accountName} </span>
          </div>
          <TicketControl
            className="ticket-page__ticket-control"
            status={this.state.status}
            urgency={this.state.urgency}
            users={this.props.attachedUsers}
            onUrgencyChange={this.onUrgencyChange}
            onStatusChange={this.onStatusChange}
            openAddUserModal={this.onOpenAddUserModal}
            onSave={this.onTicketControlSave}
          />
          <ContactCard
            className="ticket-page__contact-card"
            {...this.props.contact}
          />
          <CommentControl
            className="ticket-page__comment-control"
            comments={this.props.comments}
            comment={this.state.comment}
            onCommentChange={this.onCommentChange}
            onCommentSave={this.onCommentSave}
          />
          <AddUserModal
            users={this.props.nonAttachedUsers}
            isOpen={this.state.addUserModalOpen}
            searchString={this.state.userSearchString}
            userPicked={this.state.userPicked}
            onAddUser={this.onAddUser}
            onUserPick={this.onUserPick}
            onSearchChange={this.onUserSearchChange}
            onRequestClose={this.onCloseModal}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({
  activeTicketKey,
  tickets,
  contacts,
  accounts,
  comments,
  users
}) => {
  const usersArr = Object.keys(users).map(key => ({ ...users[key], key }));
  const ticket = tickets[activeTicketKey];
  return {
    title: ticket ? ticket.title : '',
    accountName: ticket ? accounts[ticket.accountKey].name : '',
    status: ticket ? ticket.status : '',
    urgency: ticket ? ticket.urgency : '',
    contact: ticket ? contacts[ticket.contactKey] : {},
    comments: ticket ? orderComments(comments, users) : [],
    ...separateUsers(usersArr, ticket ? ticket.userKeys : {})
  };
};

const mapDispatchToProps = dispatch => ({
  startSetActiveTicket: key => dispatch(startSetActiveTicket(key)),
  startAddComment: text => dispatch(startAddComment(text)),
  startAddUser: key => dispatch(startAddUser(key)),
  startUpdateUrgency: urgency => dispatch(startUpdateUrgency(urgency)),
  startCloseTicket: () => dispatch(startCloseTicket()),
  startReopenTicket: () => dispatch(startReopenTicket())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketPage);
