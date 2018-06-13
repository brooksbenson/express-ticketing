import React from 'react';
import Modal from 'react-modal';
import SearchBar from './SearchBar';
import userSelector from '../selectors/users';

Modal.setAppElement('#app');
const AddUserModal = props => <Modal className={props.className} />;
