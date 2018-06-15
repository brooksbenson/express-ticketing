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
    <button onClick={props.onRequestClose}>
      <div />
      <div />
    </button>
    <SearchBar
      displayResults={!!props.searchString}
      onPick={props.onUserPick}
      onSearchChange={e => props.onSearchChange(e.target.value)}
      results={userSelector(props.users, props.searchString)}
      searchString={props.searchString}
    />
    <button onClick={props.onAddUser}>Add User</button>
  </Modal>
);
