export const accountPick = pick => ({
  type: 'ACCOUNT_PICK',
  pick
});

export const accountSearchChange = change => ({
  type: 'ACCOUNT_SEARCH_CHANGE',
  change
});

export const contactCtrlDataChange = change => ({
  type: 'CONTACT_CTRL_DATA_CHANGE',
  change
});

export const contactPick = pick => ({
  type: 'CONTACT_PICK',
  pick
});

export const contactSearchChange = change => ({
  type: 'CONTACT_SEARCH_CHANGE',
  change
});

export const descriptionChange = change => ({
  type: 'DESCRIPTION_CHANGE',
  change
});

export const newContact = contact => ({
  type: 'NEW_CONTACT',
  contact
});

export const startNewContact = contact => {
  return dispatch => {
    Promise.resolve().then(() => {
      dispatch(newContact(contact));
    });
  };
};

export const updateContact = update => ({
  type: 'UPDATE_CONTACT',
  update
});

export const startUpdateContact = update => {
  return dispatch => {
    Promise.resolve().then(() => {
      dispatch(updateContact(update));
    });
  };
};

export const titleChange = change => ({
  type: 'TITLE_CHANGE',
  change
});

export const toggleContactCtrl = () => ({
  type: 'TOGGLE_CONTACT_CTRL'
});

export const urgencyChange = change => ({
  type: 'URGENCY_CHANGE',
  change
});
