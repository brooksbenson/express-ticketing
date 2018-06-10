import { startSetContacts, startUnsetContacts } from './contacts';

export const setActiveAccount = key => ({
  type: 'SET_ACTIVE_ACCOUNT',
  key
});

export const startSetActiveAccount = key => {
  return async dispatch => {
    dispatch(setActiveAccount(key));
    await dispatch(startSetContacts());
  };
};

export const unsetActiveAccount = () => ({
  type: 'UNSET_ACTIVE_ACCOUNT'
});

export const startUnsetActiveAccount = () => {
  return dispatch => {
    dispatch(startUnsetContacts());
    dispatch(unsetActiveAccount());
  };
};
