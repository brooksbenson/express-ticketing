export const accountBlur = () => ({
  type: 'ACCOUNT_BLUR'
});

export const accountPick = pick => ({
  type: 'ACCOUNT_PICK',
  pick
});

export const accountSearchChange = change => ({
  type: 'ACCOUNT_SEARCH_CHANGE',
  change
});

export const contactBlur = () => ({
  type: 'CONTACT_BLUR'
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

export const titleChange = change => ({
  type: 'TITLE_CHANGE',
  change
});

export const urgencyChange = change => ({
  type: 'URGENCY_CHANGE',
  change
});
