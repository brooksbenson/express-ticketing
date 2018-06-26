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
import formatNumber from '../helpers/format-number';

export class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urgency: '',
      status: '',
      accountName: '',
      contact: {
        name: '',
        email: '',
        number: ''
      },
      comments: [],
      attachedUsers: [],
      nonAttachedUsers: [],
      addUserModalOpen: false,
      userSearchString: '',
      userToAdd: '',
      userPicked: false,
      comment: ''
    };
  }

  componentDidMount() {
    const { key } = this.props.match.params;
    this.props.startSetActiveTicket(key).then(payload => {
      this.setState(() => ({
        title: payload.title,
        urgency: payload.urgency,
        status: payload.status,
        accountName: payload.accountName,
        contact: payload.contact,
        comments: payload.comments,
        ...separateUsers(this.props.users, payload.userKeys)
      }));
    });
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
      <section className="content-container-md">
        <div className="content-innards ticket-page">
          <div className="ticket-page__heading-block">
            <div className="ticket-page__heading">
              <h2 className="ticket-page__heading-main heading heading--primary">
                {this.state.title}
              </h2>
              <span className="ticket-page__heading-account">
                {this.state.accountName}
              </span>
            </div>
            <ContactCard
              className="ticket-page__contact-heading"
              {...this.state.contact}
            />
          </div>
          <TicketControl
            className="ticket-page__ticket-control"
            status={this.state.status}
            urgency={this.state.urgency}
            users={this.state.attachedUsers}
            onUrgencyChange={this.onUrgencyChange}
            onStatusChange={this.onStatusChange}
            openAddUserModal={this.onOpenAddUserModal}
            onSave={this.onTicketControlSave}
          />
          <CommentControl
            className="ticket-page__comment-control"
            comments={this.state.comments}
            comment={this.state.comment}
            onCommentChange={this.onCommentChange}
            onCommentSave={this.onCommentSave}
          />
          <AddUserModal
            users={this.state.nonAttachedUsers}
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

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).map(key => ({ key, ...users[key] }))
});

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
