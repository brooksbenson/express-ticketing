import React from 'react';
import Modal from 'react-modal';
import SearchBar from './SearchBar';
import userSelector from '../selectors/users';

Modal.setAppElement('body');

export default props => (
  <Modal
    className="add-user-modal"
    isOpen={props.isOpen}
    contentLabel="Add user modal"
    onRequestClose={props.onRequestClose}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    closeTimeoutMS={200}
  >
    <h3> Add User </h3>
    <div className="add-user-modal__close" onClick={props.onRequestClose} />
    <SearchBar
      className="add-user-modal__search"
      displayResults={!!props.searchString && !props.userPicked}
      onPick={props.onUserPick}
      onSearchChange={text => props.onSearchChange(text)}
      results={userSelector(props.users, props.searchString)}
      searchString={props.searchString}
    />
    <button className="btn btn--secondary" onClick={props.onAddUser}>
      Add User
    </button>
  </Modal>
);
